import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserDetail } from '../modals/user.modal';
import { usersDB } from './mocks/data-mocks';
import { PrivilegesService } from './privileges.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: UserDetail;

  constructor(private usersService: UsersService, private privilegeService: PrivilegesService) { }

  logout() {
    localStorage.removeItem("user")
  }
  getDemoUsers()
  {
    return this.usersService.getAllDemoUsers();
  }
  login(email: string, pwd: string): Observable<UserDetail> {

    let userTable = usersDB;

    let loaclUserTB : any = localStorage.getItem("usersTable");
    loaclUserTB = JSON.parse(loaclUserTB);
    
    if(loaclUserTB)
      userTable = loaclUserTB;

    let index = userTable.findIndex(user =>
      user.email.trim().toLowerCase() === email.trim().toLowerCase()
      && user.password.trim().toLowerCase() === pwd.trim().toLowerCase())

    if (index < 0)
      return throwError(() => Error("Email or Pasword is wrong"));

    this.currentUser = this.usersService.convertModalToDetail(userTable[index])

    this.currentUser.allPrivileges = []
    let allPrivileges =this.privilegeService.getAllPrivileges();

    allPrivileges.forEach(elt => {
      if (elt.userID == this.currentUser.id)
        this.currentUser.allPrivileges.push(elt)
      }
    )

    
    return of(this.currentUser)
  }


  isAuthenticated(): boolean {
    let $valueUser: any = localStorage.getItem("user");
    this.currentUser = JSON.parse($valueUser);

    if (this.currentUser)
      return true
    else
      return false
  }



  getFirstMenu()
  {
    let firstMenu = this.currentUser.allPrivileges.find(p => p.canRead == true)
    if (firstMenu == undefined)
      return "";

    return firstMenu.moduleName.toLowerCase()
  }


  setCurrentUser(user: UserDetail) {

    user.allPrivileges = []
    let allPrivileges =this.privilegeService.getAllPrivileges();
    allPrivileges.forEach(elt => {
      if (elt.userID == user.id)
        user.allPrivileges.push(elt)
      }
    )

    localStorage.setItem("user", JSON.stringify(user))

    this.currentUser = user
    
  }

  getCurrentUser()
  {
    let $valueUser: any = localStorage.getItem("user");
    let user = JSON.parse($valueUser);

    if (user)
      return user;
    else
      this.currentUser;

  }


  canCreate(nameMenu: string): boolean {
    if (this.currentUser == null)
      return false;

    let privilege = this.currentUser.allPrivileges.find(p => p.moduleName.toLowerCase() == nameMenu.toLowerCase())

    if (privilege == undefined)
      return false;

    return privilege.canCreate;
  }

  canRead(nameMenu: string): boolean {
    if (this.currentUser == null)
      return false;

    let privilege = this.currentUser.allPrivileges.find(p => p.moduleName.toLowerCase() == nameMenu.toLowerCase())
    if (privilege == undefined)
      return false;

    return privilege.canRead;
  }


  canUpdate(nameMenu: string): boolean {
    if (this.currentUser == null)
      return false;

    let privilege = this.currentUser.allPrivileges.find(p => p.moduleName.toLowerCase() == nameMenu.toLowerCase())
    if (privilege == undefined)
      return false;

    return privilege.canUpdate;
  }

  canDelete(nameMenu: string): boolean {
    if (this.currentUser == null)
      return false;

    let privilege = this.currentUser.allPrivileges.find(p => p.moduleName.toLowerCase() == nameMenu.toLowerCase())
    if (privilege == undefined)
      return false;

    return privilege.canDelete;
  }

}

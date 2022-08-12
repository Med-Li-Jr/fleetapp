import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserCreate, UserDetail, UserModal, UserRead, UserUpdate } from '../modals/user.modal';
import { LayoutBLLService } from './layoutBLL.service';
import { usersDB } from './mocks/data-mocks';
import { PrivilegesService } from './privileges.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private bllService: LayoutBLLService,
    private privilegesService: PrivilegesService) { }

    convertModalToRead(user: UserModal): UserRead {
    return {
      id: user.id,
      fullname: user.fullname,
      roleName: user.roleName,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
      phone: user.phone,
      imageUrl: user.imageUrl,
    }
  }


  convertModalToDetail(user: UserModal): UserDetail {
    return {
      id: user.id,
      fullname: user.fullname,
      roleName: user.roleName,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      imageUrl: user.imageUrl,
      allPrivileges: this.privilegesService.getAllPrivilegesByUserID(user.id)
    }
  }
  convertCreateToModal(user: UserCreate, id: number): UserModal {
    return {
      id: id,
      fullname: user.fullname,
      roleName: user.roleName,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      imageUrl: ""
    }
  }

  convertUpdateToModal(user: UserUpdate): UserModal {
    return {
      id: user.id,
      fullname: user.fullname,
      roleName: user.roleName,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      imageUrl: "",
    }
  }

  getAllUsers(): Observable<UserRead[]> {

    this.updateTB()
    
    return of(usersTB)
  }

  getAllUsersByRole(roleName: string): Observable<UserRead[]> {

    this.updateTB()
    
    let allUsers: UserRead[] = []
    for (let i = 0; i < usersTB.length; i++) {
      if(usersTB[i].roleName.trim().toLowerCase() === roleName.trim().toLowerCase())
        allUsers.push(this.convertModalToRead(usersTB[i]))
    }

    return of(allUsers)
  }

  getUserById(id: number, roleName: string): Observable<UserDetail> {

    this.updateTB()
    let index = -1;
    index = usersTB.findIndex(user => user.id === id)
    if(index < 0)
      return throwError( () => Error("User does not exist"));

    // if(roleName.length > 0 && usersTB[index].roleName.trim().toLowerCase() != roleName)
    //     return throwError( () => Error("User does not exist"));

    return of(this.convertModalToDetail(usersTB[index]));
  }

  getAllDemoUsers(): UserDetail[] {

    this.updateTB()
    let allUsers: UserDetail[] = []
    
    if(usersTB.length ==0)
    {
      for (let i = 0; i < usersDB.length; i++) {
        allUsers.push(this.convertModalToDetail(usersDB[i]))
      }   
    }
    else
    {
      for (let i = 0; i < usersTB.length; i++) {
        allUsers.push(this.convertModalToDetail(usersTB[i]))
      }  
    }

    return allUsers
  }
  userById(id: number): UserRead {

    this.updateTB()


    let index = usersTB.findIndex(user => user.id === id)
    if (index < 0)
    return this.bllService.defaultUser();

    return usersTB[index];
  }

  addUser(user: UserCreate, imageUser: string): Observable<string> {

    this.updateTB()

    let message = this.bllService.validateUser(user, 0);

    if (message.length > 0) {
      return throwError( () => Error(message));
    }

    let newId = (this.bllService.getLastIdFromData(usersTB) + 1)

    let newUser = this.convertCreateToModal(user, newId)

    newUser.imageUrl = imageUser ?? "assets/img/avatars/1.png"
    usersTB.push(newUser)

    let privilege = user.allPrivileges;
    for(let i = 0; i < privilege.length; i++)
    {
      privilege[i].userID = newId;
      if (user.isSuperAdmin == true)
      {
        privilege[i].canCreate = true;
        privilege[i].canRead = true;
        privilege[i].canUpdate = true;
        privilege[i].canDelete = true;
      }
      message += "\n " + this.privilegesService.addPrivilege(privilege[i])
    }
    if(message.length > 0 && message.includes("error"))
      return throwError( () => Error(message));

    this.updateTable()
    message = message.length == 0 ? "Add success" : message
    return of(message)

  }

  updateUser(id: Number, user: UserUpdate, imageUser: string): Observable<string> {

    this.updateTB()

    let index = usersTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError( () => Error("User does not exist"));

    let message = this.bllService.validateUser(user, user.id);

    if (message.length > 0) {
      return throwError( () => Error(message));
    }


    let privilege = user.allPrivileges;
    for(let i = 0; i < privilege.length; i++)
    {
      if (user.isSuperAdmin == true)
      {
        privilege[i].canCreate = true;
        privilege[i].canRead = true;
        privilege[i].canUpdate = true;
        privilege[i].canDelete = true;
      }
      message += "\n " + this.privilegesService.updatePrivilege(privilege[i].id, privilege[i])
    }
    if(message.length > 0 && message.includes("error"))
      return throwError( () => Error(message));
  
    let userUpdate = this.convertUpdateToModal(user)
    userUpdate.imageUrl = imageUser
    usersTB[index] = userUpdate
  
    this.updateTable()
    
    message = message.length == 0 ? "Update success" : message
    return of(message)
  }

  deleteUser(id: number): Observable<string> {

    this.updateTB()

    let index = usersTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError( () => Error("User does not exist"));


    let privilege = this.privilegesService.getAllPrivilegesByUserID(usersTB[index].id);
    for(let i = 0; i < privilege.length; i++)
    {
      this.privilegesService.deletePrivilege(privilege[i].id)
    }
    usersTB.splice(index, 1);
    this.updateTable()
    return of("Delete success");
  }
  updateTable()
  {
    localStorage.setItem("usersTable", JSON.stringify(usersTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("usersTable");
    loaclTB = JSON.parse(loaclTB);
    if (loaclTB)
      usersTB = loaclTB;
  }

}

//validate userRole before create and update user

/* USERS DB */
export let usersTB: UserModal[] = []


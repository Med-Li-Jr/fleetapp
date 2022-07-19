import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { LoginService } from '../../../services/login.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser: UserDetail = {
    id: 0,
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    imageUrl: "",
    roleName: "",
    isSuperAdmin: false,
    allPrivileges: []
  };

  constructor(
    private helperService: MyhelperService,
    private userService: UsersService,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.helperService.setLocationMenu("Users", "Profil")
    this.helperService.setIsLoading(true);

    this.userService.getUserById(this.loginService.currentUser.id, "")
      .subscribe(
        resp => {
          this.loginService.setCurrentUser(resp)
          this.currentUser = resp
          this.helperService.setIsLoading(false);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }

}

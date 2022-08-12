import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyhelperService } from '../../services/myhelper.service';
import { LoginService } from '../../services/login.service';
import { UserDetail } from '../../modals/user.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser = {
    email: "",
    password: "",
  }
  firstMenu: string = "";
  showNextTime: boolean = false;

  allAdminUsers: UserDetail[] = []
  allDriverUsers: UserDetail[] = []
  allEmployeeUsers: UserDetail[] = []
  constructor(private helperService: MyhelperService,
    private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    if (this.loginService.isAuthenticated()) {

      this.firstMenu = this.loginService.getFirstMenu();
      if (this.firstMenu.length > 0)
        this.router.navigate([this.firstMenu]);
      else
        this.helperService.showErrorToast("Error : user does not have any read privilege")
    }
    this.getDemoUsers()
  }

  getDemoUsers() {
    let allUsers = this.loginService.getDemoUsers();
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].roleName.trim().toLowerCase() === "driver")
        this.allDriverUsers.push(allUsers[i])
      else if (allUsers[i].roleName.trim().toLowerCase() === "employee")
        this.allEmployeeUsers.push(allUsers[i])
      else
        this.allAdminUsers.push(allUsers[i])
    }
  }

  connectDemoUser(email: string, password: string) {
    this.loginUser.email = email;
    this.loginUser.password = password;
    this.onSubmit();
  }

  btnContinue() {

    localStorage.setItem("nextTime", "false");
    if (this.firstMenu.length > 0)
      this.router.navigate([this.firstMenu]);
    else
      this.helperService.showErrorToast("Error : user does not have any read privilege")
  }
  onSubmit() {

    this.helperService.setIsLoading(true)
    this.loginService.login(this.loginUser.email, this.loginUser.password)
      .subscribe(
        resp => {
          this.helperService.configData()

          this.loginService.setCurrentUser(resp)

          let nextTime: any = localStorage.getItem("nextTime");

          if (nextTime)
            this.showNextTime = nextTime;
          else
            this.showNextTime = true;

          this.firstMenu = this.loginService.getFirstMenu();

          
          if (this.firstMenu.length == 0)
            this.helperService.showErrorToast("Error : user does not dd have any read privilege");

          else if (this.showNextTime == true)
            (<HTMLElement>document.getElementById("btnbackDropModal"))?.click();

          else
            this.router.navigate([this.firstMenu]);


        },
        error => {

          this.helperService.showErrorToast(error)
        }
      );
  }


}

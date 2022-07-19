import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

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
    private route: ActivatedRoute, private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {

    this.helperService.setLocationMenu("Users", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(id, "")
      .subscribe(
        resp => {
          this.helperService.setIsLoading(false);
          this.currentUser = resp
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.userService.deleteUser(this.currentUser.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['users/']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdate } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  srcImage: any;

  currentUser: UserUpdate = {
    id: 0,
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    roleName: "",
    imageUser: null,
    isSuperAdmin: false,
    allPrivileges: []
  }

  constructor(private helperService: MyhelperService, private userService: UsersService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.helperService.setLocationMenu("Users", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(id, "")
      .subscribe(user => {

        this.currentUser.id = user.id;
        this.currentUser.fullname = user.fullname;
        this.currentUser.email = user.email;
        this.currentUser.password = user.password;
        this.currentUser.phone = user.phone;
        this.currentUser.address = user.address;
        this.currentUser.roleName = user.roleName;
        this.currentUser.isSuperAdmin = user.isSuperAdmin;
        this.currentUser.allPrivileges = user.allPrivileges;

        this.srcImage = user.imageUrl;

        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
      });
  }
  
  onFileSelected(event: any) {

    this.currentUser.imageUser = <File>event.target.files[0];

    const file = <File>event.target.files[0]
    const reader = new FileReader();
    reader.onload = e => this.srcImage = reader.result;

    reader.readAsDataURL(file);

  }

  onSubmit() {

    this.helperService.setIsLoading(true);

    this.userService.updateUser(this.currentUser.id, this.currentUser, this.srcImage)
      .subscribe(
        resp => {
          
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['users/' + this.currentUser.id]);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

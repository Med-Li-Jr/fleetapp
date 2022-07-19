import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreate } from '../../../modals/user.modal';
import { ALLMODULES, MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  srcImage: any;

  currentUser: UserCreate = {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    imageUser: null,
    roleName: "",
    isSuperAdmin: false,
    allPrivileges: []
  }

  constructor(private helperService: MyhelperService, private userService: UsersService, 
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Users", "Add")
  }

  initForm() {

    this.currentUser = {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      imageUser: null,
      roleName: "",
      isSuperAdmin: false,
      allPrivileges: []
    }

    ALLMODULES.forEach(element => {
      this.currentUser.allPrivileges.push(
        {
          userID: 0,
          moduleName: element,
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false
        }
      )
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
    this.userService.addUser(this.currentUser, this.srcImage)
      .subscribe(
        resp => {
          if(resp.includes("success") == false){
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['users']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreate } from '../../../modals/user.modal';
import { ALLMODULES, MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent implements OnInit {

  srcImage: any;

  currentDriver: UserCreate = {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    imageUser: null,
    roleName: "driver",
    isSuperAdmin: false,
    allPrivileges: []
  }

  constructor(private helperService: MyhelperService, 
    private driversService: UsersService, 
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Drivers", "Add")
  }

  initForm() {

    this.currentDriver = {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      imageUser: null,
      roleName: "driver",
      isSuperAdmin: false,
      allPrivileges: []
    }

    ALLMODULES.forEach(element => {
      this.currentDriver.allPrivileges.push(
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
    this.currentDriver.imageUser = <File>event.target.files[0];

    const file = <File>event.target.files[0]
    const reader = new FileReader();
    reader.onload = e => this.srcImage = reader.result;

    reader.readAsDataURL(file);

  }

  onSubmit() {

    this.helperService.setIsLoading(true);
    this.driversService.addUser(this.currentDriver, this.srcImage)
      .subscribe(
        resp => {
          if(resp.includes("success") == false){
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['drivers']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }
}

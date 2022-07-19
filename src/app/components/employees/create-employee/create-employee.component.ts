import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreate } from '../../../modals/user.modal';
import { ALLMODULES, MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  srcImage: any;

  currentEmployee: UserCreate = {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    imageUser: null,
    roleName: "employee",
    isSuperAdmin: false,
    allPrivileges: []
  }

  constructor(private helperService: MyhelperService, 
    private employeesService: UsersService, 
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Employees", "Add")
  }

  initForm() {

    this.currentEmployee = {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      imageUser: null,
      roleName: "employee",
      isSuperAdmin: false,
      allPrivileges: []
    }

    ALLMODULES.forEach(element => {
      this.currentEmployee.allPrivileges.push(
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
    this.currentEmployee.imageUser = <File>event.target.files[0];

    const file = <File>event.target.files[0]
    const reader = new FileReader();
    reader.onload = e => this.srcImage = reader.result;

    reader.readAsDataURL(file);

  }

  onSubmit() {
    this.helperService.setIsLoading(true);

    this.employeesService.addUser(this.currentEmployee, this.srcImage)
      .subscribe(
        resp => {
          if(resp.includes("success") == false){
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['employees']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }
}

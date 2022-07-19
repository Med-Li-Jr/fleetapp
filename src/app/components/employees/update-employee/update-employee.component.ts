import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdate } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  srcImage: any;

  currentEmployee: UserUpdate = {
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

  constructor(private helperService: MyhelperService, 
    private employeesService: UsersService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.helperService.setLocationMenu("Employees", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeesService.getUserById(id, "employee")
      .subscribe(user => {

        this.currentEmployee.id = user.id;
        this.currentEmployee.fullname = user.fullname;
        this.currentEmployee.email = user.email;
        this.currentEmployee.password = user.password;
        this.currentEmployee.phone = user.phone;
        this.currentEmployee.address = user.address;
        this.currentEmployee.roleName = user.roleName;
        this.currentEmployee.isSuperAdmin = user.isSuperAdmin;
        this.currentEmployee.allPrivileges = user.allPrivileges;

        this.srcImage = user.imageUrl;

        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
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
    this.employeesService.updateUser(this.currentEmployee.id, this.currentEmployee, this.srcImage)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['employees/' + this.currentEmployee.id]);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  srcImage: any;
  currentEmployee: UserDetail = {
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
    private employeesService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {

    this.helperService.setLocationMenu("Employees", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeesService.getUserById(id, "employee")
      .subscribe(
        resp => {
          if(resp.roleName.trim().toLowerCase() === "superadmin")
            this.router.navigate(['users/', resp.id]);
          else if(resp.roleName.trim().toLowerCase() === "driver")
            this.router.navigate(['drivers/', resp.id]);
          else {
            this.helperService.setIsLoading(false);
            this.currentEmployee = resp
  
            this.srcImage = resp.imageUrl;  
          }
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.employeesService.deleteUser(this.currentEmployee.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['employees/']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

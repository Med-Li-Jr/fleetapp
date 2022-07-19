import { Component, OnInit } from '@angular/core';
import { UserRead } from '../../modals/user.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: UserRead[] = [];
  
  constructor(private helperService: MyhelperService, private employeesService: UsersService) { }


  ngOnInit(): void {
    this.onGetAllUser();
  }

  onGetAllUser()  {
    this.helperService.setLocationMenu("Employees", "Dashboard")
    this.helperService.setIsLoading(true);

    this.employeesService.getAllUsersByRole("employee")
    .subscribe(      
      resp => {
        this.employees = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}

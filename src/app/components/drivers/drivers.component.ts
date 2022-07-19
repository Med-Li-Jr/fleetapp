import { Component, OnInit } from '@angular/core';
import { UserRead } from '../../modals/user.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  drivers: UserRead[] = [];
  
  constructor(private helperService: MyhelperService, private driversService: UsersService) { }


  ngOnInit(): void {
    this.onGetAllUser();
  }

  onGetAllUser()  {
    this.helperService.setLocationMenu("Drivers", "Dashboard")
    this.helperService.setIsLoading(true);

    this.driversService.getAllUsersByRole("driver")
    .subscribe(      
      resp => {
        this.drivers = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}

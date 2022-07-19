import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-detail-driver',
  templateUrl: './detail-driver.component.html',
  styleUrls: ['./detail-driver.component.css']
})
export class DetailDriverComponent implements OnInit {

  srcImage: any;
  currentDriver: UserDetail = {
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
    private driversService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getDriver();
  }

  getDriver(): void {

    this.helperService.setLocationMenu("Drivers", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.driversService.getUserById(id, "driver")
      .subscribe(
        resp => {
          if(resp.roleName.trim().toLowerCase() === "superadmin")
            this.router.navigate(['users/', resp.id]);
          else if(resp.roleName.trim().toLowerCase() === "employee")
            this.router.navigate(['employees/', resp.id]);
          else {
            this.helperService.setIsLoading(false);
            this.currentDriver = resp
  
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

    this.driversService.deleteUser(this.currentDriver.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['drivers/']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

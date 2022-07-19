import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdate } from '../../../modals/user.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnInit {
  srcImage: any;

  currentDriver: UserUpdate = {
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
    private driversService: UsersService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getDriver();
  }

  getDriver(): void {
    this.helperService.setLocationMenu("Drivers", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.driversService.getUserById(id, "driver")
      .subscribe(user => {

        this.currentDriver.id = user.id;
        this.currentDriver.fullname = user.fullname;
        this.currentDriver.email = user.email;
        this.currentDriver.password = user.password;
        this.currentDriver.phone = user.phone;
        this.currentDriver.address = user.address;
        this.currentDriver.roleName = user.roleName;
        this.currentDriver.isSuperAdmin = user.isSuperAdmin;
        this.currentDriver.allPrivileges = user.allPrivileges;

        this.srcImage = user.imageUrl;

        this.helperService.setIsLoading(false);

      },
      error => {
        this.helperService.showErrorToast(error)
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
    this.driversService.updateUser(this.currentDriver.id, this.currentDriver, this.srcImage)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['drivers/' + this.currentDriver.id]);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }
}

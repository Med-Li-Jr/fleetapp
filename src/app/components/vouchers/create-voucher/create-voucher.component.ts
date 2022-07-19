import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderRead } from '../../../modals/provider.modal';
import { UserRead } from '../../../modals/user.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VoucherCreate } from '../../../modals/voucher.modal';
import { LoginService } from '../../../services/login.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { ProvidersService } from '../../../services/providers.service';
import { UsersService } from '../../../services/users.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VouchersService } from '../../../services/vouchers.service';

@Component({
  selector: 'app-create-voucher',
  templateUrl: './create-voucher.component.html',
  styleUrls: ['./create-voucher.component.css']
})
export class CreateVoucherComponent implements OnInit {

  currentVoucher: VoucherCreate = {
    vehicleId: 0,
    vehicleMarque: "",
    employeeId: 0,
    employeeFullname: "",
    providerId: 0,
    providerFullname: "",
    totalLiter: 0,
    price: 0,
    dateStartUsage: "",
    dateLimiteUsage: "",
  }

  allVehicles: VehicleRead[] = []
  allEmployees: UserRead[] = []
  allProviders: ProviderRead[] = []

  constructor(private helperService: MyhelperService,
    private loginService: LoginService,
    private vehicleService: VehiclesService,
    private employeeService: UsersService,
    private providerService: ProvidersService,
    private voucherService: VouchersService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Vouchers", "Add")
  }

  initForm() {

    this.currentVoucher = {
      vehicleId: 0,
      vehicleMarque: "",
      employeeId: 0,
      employeeFullname: "",
      providerId: 0,
      providerFullname: "",
      totalLiter: 0,
      price: 0,
      dateStartUsage: "",
      dateLimiteUsage: "",
    }

    this.helperService.setIsLoading(true);

    this.vehicleService.getAllVehicles()
      .subscribe(
        resp => {
          this.allVehicles = resp;
          this.employeeService.getAllUsersByRole("employee")
            .subscribe(
              resp => {
                this.allEmployees = resp;
                this.providerService.getAllProviders()
                  .subscribe(
                    resp => {
                      this.allProviders = resp;
                      this.helperService.setIsLoading(false);

                    },
                    error => {
                      
                      this.helperService.showErrorToast(error)
                    });
              },
              error => {
                
                this.helperService.showErrorToast(error)
              });
        },
        error => {
          
          this.helperService.showErrorToast(error)
        });
  }

  onChangeVehicle($event: any) {
    if ($event.target.value.split(",").length > 1) {
      this.currentVoucher.vehicleId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentVoucher.vehicleMarque = $event.target.value;
    }
    else {
      this.currentVoucher.vehicleId = 0;
      this.currentVoucher.vehicleMarque = "";
    }
  }

  onChangeProvider($event: any) {
    if ($event.target.value.split(",").length > 1) {
      this.currentVoucher.providerId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentVoucher.providerFullname = $event.target.value;
    }
    else {
      this.currentVoucher.providerId = 0;
      this.currentVoucher.providerFullname = "";
    }
  }


  onSubmit() {
    this.currentVoucher.employeeFullname = this.loginService.currentUser.id + "," + this.loginService.currentUser.fullname;

    this.helperService.setIsLoading(true);
    this.voucherService.addVoucher(this.currentVoucher)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vouchers']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderRead } from '../../../modals/provider.modal';
import { UserRead } from '../../../modals/user.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VoucherUpdate } from '../../../modals/voucher.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { ProvidersService } from '../../../services/providers.service';
import { UsersService } from '../../../services/users.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VouchersService } from '../../../services/vouchers.service';

@Component({
  selector: 'app-update-voucher',
  templateUrl: './update-voucher.component.html',
  styleUrls: ['./update-voucher.component.css']
})
export class UpdateVoucherComponent implements OnInit {

  currentVoucher: VoucherUpdate = {
    id: 0,
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
    private vehicleService: VehiclesService,
    private employeeService: UsersService,
    private providerService: ProvidersService,
    private voucherService: VouchersService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getVoucher();
  }

  getVoucher(): void {
    this.helperService.setLocationMenu("Vouchers", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.voucherService.getVoucherById(id)
      .subscribe(voucher => {

        this.currentVoucher = voucher;
        this.currentVoucher.vehicleMarque = voucher.vehicleId + "," + voucher.vehicleMarque
        this.currentVoucher.providerFullname = voucher.providerId + "," + voucher.providerFullname
        this.currentVoucher.employeeFullname = voucher.employeeId + "," + voucher.employeeFullname

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

    this.helperService.setIsLoading(true);
    this.voucherService.updateVoucher(this.currentVoucher.id, this.currentVoucher)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vouchers/' + this.currentVoucher.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }

}

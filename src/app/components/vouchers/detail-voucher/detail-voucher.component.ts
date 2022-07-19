import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VoucherDetail } from '../../../modals/voucher.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VouchersService } from '../../../services/vouchers.service';

@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.css']
})
export class DetailVoucherComponent implements OnInit {

  currentVoucher: VoucherDetail = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    employeeId: 0,
    employeeFullname:"",
    providerId: 0,
    providerFullname: "",
    totalLiter: 0,
    price: 0,
    dateStartUsage: "",
    dateLimiteUsage: "",
    vehicle: {} as VehicleRead
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private voucherService: VouchersService,
    private vehiclesService: VehiclesService,
  ) { }

  ngOnInit(): void {
    this.getVoucher();
  }

  getVoucher(): void {

    this.helperService.setLocationMenu("Vouchers", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.voucherService.getVoucherById(id)
      .subscribe(
        resp => {
          
          this.helperService.setIsLoading(false);
          this.currentVoucher = resp
          this.currentVoucher.vehicle = this.vehiclesService.vehicleById(resp.vehicleId)
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.voucherService.deleteVoucher(this.currentVoucher.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vouchers/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}

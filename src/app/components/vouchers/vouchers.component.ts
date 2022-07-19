import { Component, OnInit } from '@angular/core';
import { VoucherRead } from '../../modals/voucher.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { VouchersService } from '../../services/vouchers.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {

  vouchers: VoucherRead[] = [];
  
  constructor(private helperService: MyhelperService, private voucherService: VouchersService) { }


  ngOnInit(): void {
    this.helperService.setLocationMenu("Vouchers", "Dashboard")
    this.onGetAllVoucher();
  }

  onGetAllVoucher()  {
    this.helperService.setIsLoading(true);

    this.voucherService.getAllVouchers()
    .subscribe(      
      resp => {
        this.vouchers = resp;
        this.helperService.setIsLoading(false);
        
      },
      error => {
        
        this.helperService.showErrorToast(error)
      },

    )
  }
}

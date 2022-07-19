import { Component, Input, OnInit } from '@angular/core';
import { VoucherRead } from '../../../modals/voucher.modal';

@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.css']
})
export class ListVoucherComponent implements OnInit {

  @Input()
  vouchers: VoucherRead[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { InsuranceRead } from '../../../modals/insurance.modal';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.css']
})
export class ListInsuranceComponent implements OnInit {

  @Input()
  insurances: InsuranceRead[] = [];
  
  constructor() { }
 
  ngOnInit(): void {
  }
}

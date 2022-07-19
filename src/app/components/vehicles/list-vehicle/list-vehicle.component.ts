import { Component, Input, OnInit } from '@angular/core';
import { VehicleRead } from '../../../modals/vehicle.modal';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  @Input()
  vehicles: VehicleRead[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-card-vehicle',
  templateUrl: './card-vehicle.component.html',
  styleUrls: ['./card-vehicle.component.css']
})
export class CardVehicleComponent implements OnInit {

  canRead = false;
  isExist : boolean = false;

  @Input()
  currentVehicle: VehicleRead;
  
  @Input()
  moduleName: string;
  
  constructor(
    private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.currentVehicle == null || this.currentVehicle.id == 0)
      this.isExist = false
    else
      this.isExist = true
  
    this.canRead = this.loginService.canRead(this.moduleName)
  }

}

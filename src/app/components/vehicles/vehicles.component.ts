import { Component, OnInit } from '@angular/core';
import { VehicleRead } from '../../modals/vehicle.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicles: VehicleRead[] = [];
  
  constructor(private helperService: MyhelperService, private vehicleService: VehiclesService) { }


  ngOnInit(): void {
    this.helperService.setLocationMenu("Vehicles", "Dashboard")
    this.onGetAllVehicle();
  }

  onGetAllVehicle()  {
    this.helperService.setIsLoading(true);

    this.vehicleService.getAllVehicles()
    .subscribe(      
      resp => {
        this.vehicles = resp;
        this.helperService.setIsLoading(false);
        

      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}

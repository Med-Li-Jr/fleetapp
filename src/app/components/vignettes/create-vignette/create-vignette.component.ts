import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VignetteCreate } from '../../../modals/vignette.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VignettesService } from '../../../services/vignettes.service';

@Component({
  selector: 'app-create-vignette',
  templateUrl: './create-vignette.component.html',
  styleUrls: ['./create-vignette.component.css']
})
export class CreateVignetteComponent implements OnInit {

  currentVignette: VignetteCreate = {
    vehicleId: 0,
    vehicleMarque: "",
    type: "",
    price: 0,
    dueDate: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService, 
              private vehicleService: VehiclesService, private vignetteService: VignettesService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Vignettes", "Add")
  }

  initForm() {

    this.currentVignette = {
      vehicleId: 0,
      vehicleMarque: "",
      type: "",
      price: 0,
      dueDate: "",
    }
    
    this.helperService.setIsLoading(true);
    this.vehicleService.getAllVehicles()
    .subscribe(
      resp => {
        this.allVehicles = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        
        this.helperService.showErrorToast(error)
      });
  }

  onChange($event : any)
  {
    if($event.target.value.split(",").length > 1)
    {
      this.currentVignette.vehicleId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentVignette.vehicleMarque = $event.target.value;
    }
    else {
      this.currentVignette.vehicleId = 0;
      this.currentVignette.vehicleMarque = "";
    }
  }

  onSubmit() {

    
    this.helperService.setIsLoading(true);
    this.vignetteService.addVignette(this.currentVignette)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vignettes']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceCreate } from '../../../modals/insurance.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { InsurancesService } from '../../../services/insurances.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.css']
})
export class CreateInsuranceComponent implements OnInit {

  currentInsurance: InsuranceCreate = {
    vehicleId: 0,
    vehicleMarque: "",
    nameAgence: "",
    price: 0,
    dateStartUsage: "",
    dateLimiteUsage: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService, 
              private vehicleService: VehiclesService, private insuranceService: InsurancesService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Insurances", "Add")
  }

  initForm() {

    this.currentInsurance = {
      vehicleId: 0,
      vehicleMarque: "",
      nameAgence: "",
      price: 0,
      dateStartUsage: "",
      dateLimiteUsage: "",
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
      this.currentInsurance.vehicleId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentInsurance.vehicleMarque = $event.target.value;
    }
    else {
      this.currentInsurance.vehicleId = 0;
      this.currentInsurance.vehicleMarque = "";
    }
  }

  onSubmit() {

    
    this.helperService.setIsLoading(true);
    this.insuranceService.addInsurance(this.currentInsurance)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['insurances']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

}

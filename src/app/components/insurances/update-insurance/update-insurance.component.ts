import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceUpdate } from '../../../modals/insurance.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { InsurancesService } from '../../../services/insurances.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-update-insurance',
  templateUrl: './update-insurance.component.html',
  styleUrls: ['./update-insurance.component.css']
})
export class UpdateInsuranceComponent implements OnInit {

  currentInsurance: InsuranceUpdate = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    nameAgence: "",
    price: 0,
    dateStartUsage: "",
    dateLimiteUsage: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService, 
    private insuranceService: InsurancesService,
    private vehiclesService: VehiclesService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getInsurance();
  }

  getInsurance(): void {
    this.helperService.setLocationMenu("Insurances", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.insuranceService.getInsuranceById(id)
      .subscribe(insurance => {

        this.currentInsurance = insurance;

        this.currentInsurance.vehicleMarque=    insurance.vehicleId + "," + insurance.vehicleMarque
        this.vehiclesService.getAllVehicles()
        .subscribe(
          resp => {
            this.allVehicles = resp;
            this.helperService.setIsLoading(false);
          },
          error => {
            
            this.helperService.showErrorToast(error)
          }
        )
      
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
    this.insuranceService.updateInsurance(this.currentInsurance.id, this.currentInsurance)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['insurances/' + this.currentInsurance.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }

}
 
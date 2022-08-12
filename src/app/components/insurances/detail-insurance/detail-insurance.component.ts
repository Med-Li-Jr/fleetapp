import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceDetail } from '../../../modals/insurance.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { InsurancesService } from '../../../services/insurances.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-detail-insurance',
  templateUrl: './detail-insurance.component.html',
  styleUrls: ['./detail-insurance.component.css']
})
export class DetailInsuranceComponent implements OnInit {

  currentInsurance: InsuranceDetail = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    nameAgence: "",
    price: 0,
    dateStartUsage: "",
    dateLimiteUsage: "",
    vehicle: {} as VehicleRead
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private insuranceService: InsurancesService,
    private vehiclesService: VehiclesService,
  ) { }

  ngOnInit(): void {
    this.getInsurance();
  }

  getInsurance(): void {

    this.helperService.setLocationMenu("Insurances", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.insuranceService.getInsuranceById(id)
      .subscribe(
        resp => {
          
          this.currentInsurance = resp
          this.currentInsurance.vehicle = this.vehiclesService.vehicleById(resp.vehicleId)
          this.helperService.setIsLoading(false);
        },
        error => {
          alert(id)
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.insuranceService.deleteInsurance(this.currentInsurance.id)
      .subscribe(
        resp => {
          
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['insurances/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}

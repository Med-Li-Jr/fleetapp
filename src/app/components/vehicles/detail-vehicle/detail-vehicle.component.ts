import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleDetail } from '../../../modals/vehicle.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-detail-vehicle',
  templateUrl: './detail-vehicle.component.html',
  styleUrls: ['./detail-vehicle.component.css']
})
export class DetailVehicleComponent implements OnInit {

  currentVehicle: VehicleDetail = {
    id: 0,
    marque: "",
    groupeId: 0,
    groupeName: "",
    seatNbr: 0,
    datePurchase: "",
    dateStartUsage: "",
    dateLimiteUsage: "",
    imageUrl: "",
    allVignettes: [],
    allInsurances: [],
    allVouchers: []
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private vehicleService: VehiclesService
  ) { }

  ngOnInit(): void {
    this.helperService.setLocationMenu("Vehicles", "Detail")
    this.getVehicle();
  }

  getVehicle(): void {

    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vehicleService.getVehicleById(id)
      .subscribe(
        resp => {
          
          this.helperService.setIsLoading(false);
          this.currentVehicle = resp
        },
        error => {          
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.vehicleService.deleteVehicle(this.currentVehicle.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vehicles/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}

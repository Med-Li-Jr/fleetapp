import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VignetteUpdate } from '../../../modals/vignette.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VignettesService } from '../../../services/vignettes.service';

@Component({
  selector: 'app-update-vignette',
  templateUrl: './update-vignette.component.html',
  styleUrls: ['./update-vignette.component.css']
})
export class UpdateVignetteComponent implements OnInit {

  currentVignette: VignetteUpdate = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    type: "",
    price: 0,
    dueDate: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService,
    private vehicleService: VehiclesService, private vignetteService: VignettesService, private router: Router,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getVignette();
  }

  getVignette(): void {
    this.helperService.setLocationMenu("Vignettes", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vignetteService.getVignetteById(id)
      .subscribe(vignette => {

        this.currentVignette = vignette;
        this.currentVignette.vehicleMarque = vignette.vehicleId + "," + vignette.vehicleMarque
        this.vehicleService.getAllVehicles()
          .subscribe(
            resp => {
              this.allVehicles = resp;
              this.helperService.setIsLoading(false);

            },
            error => {
              
              this.helperService.showErrorToast(error)
            });
      },
        error => {
          
          this.helperService.showErrorToast(error)
        });
  }

  onChange($event: any) {
    if ($event.target.value.split(",").length > 1) {
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
    this.vignetteService.updateVignette(this.currentVignette.id, this.currentVignette)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vignettes/' + this.currentVignette.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }

}

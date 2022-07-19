import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { VignetteDetail } from '../../../modals/vignette.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { VignettesService } from '../../../services/vignettes.service';

@Component({
  selector: 'app-detail-vignette',
  templateUrl: './detail-vignette.component.html',
  styleUrls: ['./detail-vignette.component.css']
})
export class DetailVignetteComponent implements OnInit {

  currentVignette: VignetteDetail = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    type: "",
    price: 0,
    dueDate: "",
    vehicle: {} as VehicleRead
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private vignetteService: VignettesService,
    private vehiclesService: VehiclesService,
  ) { }

  ngOnInit(): void {
    this.getVignette();
  }

  getVignette(): void {

    this.helperService.setLocationMenu("Vignettes", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vignetteService.getVignetteById(id)
      .subscribe(
        resp => {
          
          this.currentVignette = resp
          this.currentVignette.vehicle = this.vehiclesService.vehicleById(resp.vehicleId)
          this.helperService.setIsLoading(false);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.vignetteService.deleteVignette(this.currentVignette.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vignettes/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}

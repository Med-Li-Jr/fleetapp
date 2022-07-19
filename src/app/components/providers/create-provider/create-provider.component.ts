import { Component, OnInit } from '@angular/core';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { ProvidersService } from '../../../services/providers.service';
import { Router } from '@angular/router';
import { ProviderCreate } from '../../../modals/provider.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  currentProvider: ProviderCreate = {
    matricule: "",
    fullname: "",
    email: "",
    address: "",
    phone: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService, 
              private vehicleService: VehiclesService, private providerService: ProvidersService, 
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Providers", "Add")
  }

  initForm() {

    this.currentProvider = {
      matricule: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
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

  onSubmit() {
    
    this.helperService.setIsLoading(true);
    this.providerService.addProvider(this.currentProvider)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['providers']);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      );
  }

}

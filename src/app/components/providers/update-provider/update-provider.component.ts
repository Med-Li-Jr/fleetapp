import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderUpdate } from '../../../modals/provider.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { ProvidersService } from '../../../services/providers.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {


  currentProvider: ProviderUpdate = {
    id: 0,
    matricule: "",
    fullname: "",
    email: "",
    address: "",
    phone: "",
  }

  allVehicles: VehicleRead[] = []

  constructor(private helperService: MyhelperService,
    private vehicleService: VehiclesService, private providerService: ProvidersService, 
    private router: Router, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getProvider();
  }

  getProvider(): void {
    this.helperService.setLocationMenu("Providers", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.providerService.getProviderById(id)
      .subscribe(provider => {

        this.currentProvider = provider;
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
  onSubmit() {

    this.helperService.setIsLoading(true);

    this.providerService.updateProvider(this.currentProvider.id, this.currentProvider)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['providers/' + this.currentProvider.id]);
        },
        error => {
          this.helperService.showErrorToast(error)
        }
      )
  }

}

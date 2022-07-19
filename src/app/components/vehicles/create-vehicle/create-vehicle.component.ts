import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeRead } from '../../../modals/groupe.modal';
import { VehicleCreate } from '../../../modals/vehicle.modal';
import { GroupesService } from '../../../services/groupes.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {

  currentVehicle: VehicleCreate = {
    marque: "",
    groupeId: 0,
    groupeName: "",
    seatNbr: 0,
    datePurchase: "",
    dateStartUsage: "",
    dateLimiteUsage: "",
    imageVehicle: null,
  }
  srcImage: any;
  allGroupes: GroupeRead[] = []

  constructor(private helperService: MyhelperService, private vehicleService: VehiclesService,
    private groupeService: GroupesService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Vehicles", "Add")
  }

  initForm() {

    this.currentVehicle = {
      marque: "",
      groupeId: 0,
      groupeName: "",
      seatNbr: 0,
      datePurchase: "",
      dateStartUsage: "",
      dateLimiteUsage: "",
      imageVehicle: null,
    }
    this.helperService.setIsLoading(true);
    this.groupeService.getAllGroupes()
    .subscribe(
      resp => {
        this.allGroupes = resp;
        this.helperService.setIsLoading(false);
   
      },
      error => {
        
        this.helperService.showErrorToast(error)
      });
  }

  onFileSelected(event: any) {
    this.currentVehicle.imageVehicle = <File>event.target.files[0];

    const file = <File>event.target.files[0]
    const reader = new FileReader();
    reader.onload = e => this.srcImage = reader.result;

    reader.readAsDataURL(file);

  }

  onChange($event : any)
  {
    if($event.target.value.split(",").length > 1)
    {
      this.currentVehicle.groupeId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentVehicle.groupeName = $event.target.value;
    }
    else {
      this.currentVehicle.groupeId = 0;
      this.currentVehicle.groupeName = "";
    }
  }
  
  onSubmit() {

    this.helperService.setIsLoading(true);

    this.vehicleService.addVehicle(this.currentVehicle, this.srcImage)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false){
            this.helperService.showErrorToast(resp)            
          }
          else
            this.router.navigate(['vehicles']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }


}

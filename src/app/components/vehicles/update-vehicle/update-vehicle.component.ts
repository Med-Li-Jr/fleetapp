import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeRead } from '../../../modals/groupe.modal';
import { VehicleUpdate } from '../../../modals/vehicle.modal';
import { GroupesService } from '../../../services/groupes.service';
import { MyhelperService } from '../../../services/myhelper.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {

  srcImage: any;

  currentVehicle: VehicleUpdate = {
    id: 0,
    marque: "",
    groupeId: 0,
    groupeName: "",
    seatNbr: 0,
    datePurchase: "",
    dateStartUsage: "",
    dateLimiteUsage: "",
    imageVehicle: null,
  }

  allGroupes: GroupeRead[] = []

  constructor(private helperService: MyhelperService, 
              private vehicleService: VehiclesService,
              private groupeService: GroupesService,
              private router: Router, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(): void {
    this.helperService.setLocationMenu("Vehicles", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vehicleService.getVehicleById(id)
      .subscribe(vehicle => {
        this.currentVehicle.id = vehicle.id;
        this.currentVehicle.marque = vehicle.marque;
        this.currentVehicle.groupeId = vehicle.groupeId;
        this.currentVehicle.groupeName = vehicle.groupeId + "," + vehicle.groupeName;
        this.currentVehicle.seatNbr = vehicle.seatNbr;
        this.currentVehicle.datePurchase = vehicle.datePurchase;
        this.currentVehicle.dateStartUsage = vehicle.dateStartUsage;
        this.currentVehicle.dateLimiteUsage = vehicle.dateLimiteUsage;

        this.srcImage = vehicle.imageUrl;
        this.groupeService.getAllGroupes()
        .subscribe(
          resp => {
            this.allGroupes = resp;
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
  onFileSelected(event: any) {
    this.currentVehicle.imageVehicle = <File>event.target.files[0];

    const file = <File>event.target.files[0]
    const reader = new FileReader();
    reader.onload = e => this.srcImage = reader.result;

    reader.readAsDataURL(file);

  }

  onSubmit() {

    this.helperService.setIsLoading(true);
    this.vehicleService.updateVehicle(this.currentVehicle.id, this.currentVehicle, this.srcImage)
      .subscribe(
        resp => {
          
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['vehicles/' + this.currentVehicle.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}

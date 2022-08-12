import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { MissionUpdate } from '../../../modals/mission.modal';
import { UserRead } from '../../../modals/user.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { LoginService } from '../../../services/login.service';
import { MissionsService } from '../../../services/missions.service';
import { KEYMAPBOX, MyhelperService } from '../../../services/myhelper.service';
import { MymapService } from '../../../services/mymap.service';
import { UsersService } from '../../../services/users.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {

  currentMission: MissionUpdate = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    employeeId: 0,
    employeeFullname:"",
    driverId: 0,
    driverFullname: "",
    status : "finished",
    dateEnd: "",
    dateStart:"",
    destinationLatitude: 0,
    destinationLocation: "",
    destinationLongitude: 0,
    sourceLatitude: 0,
    sourceLocation: "",
    sourceLongitude: 0,
  }

  allVehicles: VehicleRead[] = []
  allEmployees: UserRead[] = []
  allDrivers: UserRead[] = []

  constructor(private helperService: MyhelperService, 
    private loginService: LoginService,
    private vehicleService: VehiclesService, 
              private employeeService: UsersService, 
              private driverService: UsersService, 
              private missionService: MissionsService, private router: Router,
    private route: ActivatedRoute,
    private mymapService: MymapService) { }



  ngOnInit(): void {
    this.getMission();
  }

  getMission(): void {
    this.helperService.setLocationMenu("Missions", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.missionService.getMissionById(id)
      .subscribe(mission => {
        this.currentMission = mission;
        this.currentMission.vehicleMarque=    mission.vehicleId + "," + mission.vehicleMarque
        this.currentMission.employeeFullname= mission.employeeId + "," + mission.employeeFullname
        this.currentMission.driverFullname =  mission.driverId + "," + mission.driverFullname


        this.configMap();
        this.vehicleService.getAllVehicles()
        .subscribe(
          resp => {
            this.allVehicles = resp;
            this.employeeService.getAllUsersByRole("employee")
            .subscribe(
              resp => {
                this.allEmployees = resp;
                this.driverService.getAllUsersByRole("driver")
                .subscribe(
                  resp => {
                    this.allDrivers = resp;
                    this.helperService.setIsLoading(false);
                  },
                  error => {
                    
                    this.helperService.showErrorToast(error)
                  }
                )
              },
              error => {
                
                this.helperService.showErrorToast(error)
              }
            )
          },
          error => {
            
            this.helperService.showErrorToast(error)
          });
        },
        error => {
          
          this.helperService.showErrorToast(error)
        });
  }

  onChangeVehicle($event : any)
  {
    if($event.target.value.split(",").length > 1)
    {
      this.currentMission.vehicleId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentMission.vehicleMarque = $event.target.value;
    }
    else {
      this.currentMission.vehicleId = 0;
      this.currentMission.vehicleMarque = "";
    }
  }
  
  onChangeDriver($event : any)
  {
    if($event.target.value.split(",").length > 1)
    {
      this.currentMission.driverId = Number.parseInt($event.target.value.split(",")[0]);
      this.currentMission.driverFullname = $event.target.value;
    }
    else {
      this.currentMission.driverId = 0;
      this.currentMission.driverFullname = "";
    }
    
  }

  onSubmit() {

    this.currentMission.employeeFullname = this.loginService.currentUser.id + "," + this.loginService.currentUser.fullname;

    this.helperService.setIsLoading(true);
    this.missionService.updateMission(this.currentMission.id, this.currentMission)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['missions/' + this.currentMission.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }

  public configMap() {
    try {
      const mainThis = this;
      
      let sourceLatlng = L.latLng(this.currentMission.sourceLatitude, this.currentMission.sourceLongitude);
      let destinationLatlng = L.latLng(this.currentMission.destinationLatitude, this.currentMission.destinationLongitude);
      const mapLocDest = L.map('mapLocDest').setView(destinationLatlng, 7);
      const mapLocSrc = L.map('mapLocSrc').setView(sourceLatlng, 7);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + KEYMAPBOX, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: KEYMAPBOX
    }).addTo(mapLocSrc);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + KEYMAPBOX, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: KEYMAPBOX
    }).addTo(mapLocDest);

    let srcMarker = L.marker(sourceLatlng).addTo(mapLocSrc)
    .bindPopup('Marker Source.')
    let destMarker = L.marker(destinationLatlng).addTo(mapLocDest)
    .bindPopup('Marker Destination.')



    mapLocSrc.on('click', function (ev: any) {
      mainThis.currentMission.sourceLatitude= ev.latlng.lat;
      mainThis.currentMission.sourceLongitude= ev.latlng.lng;
      mainThis.mymapService.
        getNameFromLatLng(ev.latlng.lat, ev.latlng.lng)
        .subscribe(
          resp => {
            mainThis.currentMission.sourceLocation = resp[0].name + ", " + resp[0].state
          }
        )

      mapLocSrc.removeLayer(srcMarker)
      srcMarker = L.marker(ev.latlng).addTo(mapLocSrc)
          .bindPopup('Marker Source.')
  });

  mapLocDest.on('click', function (ev: any) {
      mainThis.currentMission.destinationLatitude= ev.latlng.lat;
      mainThis.currentMission.destinationLongitude= ev.latlng.lng;
      mainThis.mymapService.
        getNameFromLatLng(ev.latlng.lat, ev.latlng.lng)
        .subscribe(
          resp => {
            mainThis.currentMission.destinationLocation = resp[0].name + ", " + resp[0].state
          }
        )

      mapLocDest.removeLayer(destMarker)
      destMarker = L.marker(ev.latlng).addTo(mapLocDest)
          .bindPopup('Marker Destination.')
  });
    }
    catch (e) {
      console.log(e)
    }

  }
}
 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { MissionDetail } from '../../../modals/mission.modal';
import { UserRead } from '../../../modals/user.modal';
import { VehicleRead } from '../../../modals/vehicle.modal';
import { LoginService } from '../../../services/login.service';
import { MissionsService } from '../../../services/missions.service';
import { KEYMAPBOX, MyhelperService } from '../../../services/myhelper.service';
import { MymapService } from '../../../services/mymap.service';

@Component({
  selector: 'app-detail-mission',
  templateUrl: './detail-mission.component.html',
  styleUrls: ['./detail-mission.component.css']
})
export class DetailMissionComponent implements OnInit {


  canReadEmp = false;
  canReadDriver = false;
  canReadVehicle = false;

  currentMission: MissionDetail = {
    id: 0,
    vehicleId: 0,
    vehicleMarque: "",
    employeeId: 0,
    employeeFullname: "",
    driverId: 0,
    driverFullname: "",
    status: "finished",
    dateEnd: "",
    dateStart: "",
    destinationLatitude: 0,
    destinationLocation: "",
    destinationLongitude: 0,
    sourceLatitude: 0,
    sourceLocation: "",
    sourceLongitude: 0,
    driver: {} as UserRead,
    employee: {} as UserRead,
    vehicle: {} as VehicleRead
  };

  // const map = L.map('map').setView(center, 7);;
  constructor(
    private loginService: LoginService,
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private missionService: MissionsService,
    private mymapService: MymapService
  ) { }

  ngOnInit(): void {

    this.getMission();
    this.canReadDriver = this.loginService.canRead("drivers")
    this.canReadEmp = this.loginService.canRead("employees")
    this.canReadVehicle = this.loginService.canRead("vehicles")
  }

  getMission(): void {

    this.helperService.setLocationMenu("Missions", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.missionService.getMissionById(id)
      .subscribe(
        resp => {
          this.helperService.setIsLoading(false);
          this.currentMission = resp
          this.configMap()
        },
        error => {

          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.missionService.deleteMission(this.currentMission.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)

          }
          else
            this.router.navigate(['missions/']);
        },
        error => {

          this.helperService.showErrorToast(error)
        }
      )
  }


  public configMap() {
    try {

      let sourceLatlng = L.latLng(this.currentMission.sourceLatitude, this.currentMission.sourceLongitude);
      let destinationLatlng = L.latLng(this.currentMission.destinationLatitude, this.currentMission.destinationLongitude);
      let map = L.map('mapDetailMission').setView(sourceLatlng, 7);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + KEYMAPBOX, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: KEYMAPBOX
      }).addTo(map);
      setTimeout(() => {

        L.marker(sourceLatlng,{icon: this.helperService.getMarkerIcon("green")}).addTo(map)
          .bindPopup('Source : ' + this.currentMission.sourceLocation, { closeButton: false })

        L.marker(destinationLatlng,{icon: this.helperService.getMarkerIcon("red")}).addTo(map)
          .bindPopup('Destination : ' + this.currentMission.destinationLocation, { closeButton: false })
      }, 1000)

      this.mymapService.getArrayItineraireFromMapBox(sourceLatlng.lat, sourceLatlng.lng, destinationLatlng.lat, destinationLatlng.lng)
        .subscribe(resp => {
          //console.log(resp.routes[0].geometry.coordinates, typeof(resp))
          let coord = this.mymapService.configDirections(resp.routes[0].geometry.coordinates)
          var polyline = L.polyline(coord, { color: 'red' }).addTo(map);

          // arrayItineraireGoogleMap.unshift([sourceLatlng.lat - 1, sourceLatlng.lng +1])
          // arrayItineraireGoogleMap.push([destinationLatlng.lat - 1, destinationLatlng.lng +1])
          let southWest = L.latLng(sourceLatlng.lat + 1, sourceLatlng.lng + 1);
          let northEast = L.latLng(destinationLatlng.lat - 1, destinationLatlng.lng - 1);
          let bound = L.latLngBounds(
            southWest,
            northEast
          );
          //console.log(polyline.getBounds())
          // zoom the map to the polyline
          map.fitBounds(bound);

        })
    }
    catch (e) {
      console.log(e)
    }

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { KEYMAPBOX, MyhelperService } from '../../services/myhelper.service';
import { MissionsService } from '../../services/missions.service';
import { TracersService, tracersTB } from '../../services/tracers.service';
import { MymapService } from '../../services/mymap.service';
import { MissionDetail } from '../../modals/mission.modal';
import { TracerModal } from '../../modals/tracer.modal';
import { allMarker, allSetInterval } from '../../services/mocks/data-mocks';
import { VehiclesService } from '../../services/vehicles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-tracers',
  templateUrl: './tracers.component.html',
  styleUrls: ['./tracers.component.css']
})
export class TracersComponent implements OnInit, OnDestroy {

  polyline: any = null;
  markerSource : any = null;
  markerDestination : any = null;
  center: any = L.latLng(33.886917, 9.537499);
  map: any = null



  allTracers: TracerModal[] = []
  allMissions: MissionDetail[] = []

  constructor(private helperService: MyhelperService,
    private tracerService: TracersService, private missionsService: MissionsService,
    // private vehicleService: VehiclesService, private userService: UsersService,
    private mymapService: MymapService) { }


  ngOnInit(): void {
    this.helperService.setLocationMenu("Tracers", "Dashboard")
    // tracersTB.splice(0, tracersTB.length)
    this.tracerService.onAllTracers();
    this.getAllTracers();
  }

  getAllTracers() {
    this.helperService.setIsLoading(true);

    this.allTracers = tracersTB
    this.missionsService.getCurrentMissions()
      .subscribe(
        resp => {
          this.allMissions = resp
          this.helperService.setIsLoading(false);
          this.configMap()
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }


  public configMap() {
    try {

      if (this.map == null) {
        this.map = L.map('map').setView(this.center, 6);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + KEYMAPBOX, {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          accessToken: KEYMAPBOX
        }).addTo(this.map);

      }
      let mainThis = this;
      for (let i = 0; i < allMarker.length; i++) {
        allMarker[i].marker = L.marker(allMarker[i].marker.getLatLng())
        .bindPopup(allMarker[i].marker.getPopup().getContent(), { closeButton: false })
          .addTo(this.map)
          .on('click', function (e) {
            // //console.log("mytracer click", tracer)
            mainThis.showVehicleDirection(allMarker[i].idTracer)
          })
          .on('popupclose', function (e) {
            // //console.log(e);
            mainThis.map.setView(mainThis.center, 6);
            mainThis.clearMap()
          })
        //console.log(allMarker[i].marker.getPopup().getContent())
      }
      
      this.configMissionsMap();
    }
    catch (e) {
      //console.log(e)
    }

  }


  configMissionsMap() {
    

    for (let i = 0; i < tracersTB.length; i++) {
      this.configStartMission(tracersTB[i].id, tracersTB[i].missionId);
    }
    this.helperService.setIsLoading(false);
  }

  configStartMission(tracerID: string, missionID: number) {
    let checkIndexSetInterval = allSetInterval.findIndex((elt: any) => elt.tracerId === tracerID)
    if (checkIndexSetInterval === -1) {
      allSetInterval.push(
        {
          tracerId: tracerID,
          missionId: missionID,
          currentIndex: 0,
          setIntervalId: 0
        }
      )

      let indexSetInterval = allSetInterval.findIndex((elt: any) => elt.tracerId === tracerID)
      if (indexSetInterval > -1) {
        let mainThis = this;
        allSetInterval[indexSetInterval]
          .setIntervalId = setInterval(function () {


            let indexCurrentInterval = allSetInterval.findIndex((elt: any) => elt.tracerId === tracerID)

            if (indexCurrentInterval > -1) {

              let indexTracer = tracersTB.findIndex(elt => elt.id === tracerID)

              if (indexTracer > -1) {
                let currentTracer = tracersTB[indexTracer]
                let coordinates = Object.keys(currentTracer.coordinates).map((key) => [currentTracer.coordinates[key][0], currentTracer.coordinates[key][1]]);
                let coord = mainThis.mymapService.configDirections(coordinates)
                ++currentTracer.indexCurrentCoord

                let indexLoop = currentTracer.indexCurrentCoord

                if (indexLoop < coord.length) {

                  currentTracer.latitude = coord[indexLoop][0]
                  currentTracer.longitude = coord[indexLoop][1]
                  currentTracer.currentSpeed = Math.round(((Math.random() * 100) + Number.EPSILON) * 100) / 100
                  //mission started


                  mainThis.configMissionActif(currentTracer)

                  mainThis.tracerService.onUpdateTracer(currentTracer);
                  //console.log(" i = " + indexLoop + " tracer " + tracerID)
                }
                else {
                  //Mission has finished
                  mainThis.configMissionFinshed(tracerID)
                }
              }
            }
          }, 1000)
      }

    }
  }

  configMissionActif(tracer: TracerModal) {

    const mainThis = this;
    const foundIndex = allMarker.findIndex((element: any) => element.idTracer == tracer.id);

    if (foundIndex > -1) {
      const currentMarker = allMarker[foundIndex];
      currentMarker.marker.setLatLng(L.latLng(tracer.latitude, tracer.longitude))
        .bindPopup(mainThis.setContentPopupMarker(tracer), { closeButton: false }).addTo(this.map)
    }
    else {

      allMarker.push(
        {
          idTracer: tracer.id,
          idMission: tracer.missionId,
          marker: L.marker([tracer.latitude, tracer.longitude])
            .bindPopup(mainThis.setContentPopupMarker(tracer), { closeButton: false })
            .addTo(mainThis.map)
            .on('click', function (e) {
              // //console.log("mytracer click", tracer)
              mainThis.showVehicleDirection(tracer.id)
            })
            .on('popupclose', function (e) {
              // //console.log(e);
              mainThis.map.setView(mainThis.center, 6);
              mainThis.clearMap()
            })
        }
      )
    }
  }

  configMissionFinshed(tracerID: string) {

    let indexT = tracersTB.findIndex(elt => elt.id == tracerID)
    if (indexT > -1) {

      this.updateGlobalMission(tracersTB[indexT].missionId, "finished")

      let indexM = this.allMissions.findIndex(elt => elt.id === tracersTB[indexT].missionId)
      if (indexM > -1)
        this.allMissions.splice(indexM, 1);

      this.tracerService.onDeleteTracer(tracerID)

      // this.allTracers.splice(indexT, 1);

      this.configDeleteMarker(tracerID);
      let indexCurrentInterval = allSetInterval.findIndex((elt: any) => elt.tracerId === tracerID)
      if (indexCurrentInterval > -1 && indexCurrentInterval < allSetInterval.length) {
        clearInterval(allSetInterval[indexCurrentInterval].setIntervalId)
        allSetInterval.splice(indexCurrentInterval, 1);
      }

      this.clearMap()
    }
  }

  updateGlobalMission(missionID: number, status: string) {
    let index = this.allMissions.findIndex(elt => elt.id === missionID)

    if (index > -1) {
      this.allMissions[index].status = status
      if (this.allMissions[index].vehicleMarque.split(",").length === 1)
        this.allMissions[index].vehicleMarque = this.allMissions[index].vehicleId + "," + this.allMissions[index].vehicleMarque

      if (this.allMissions[index].driverFullname.split(",").length === 1)
        this.allMissions[index].driverFullname = this.allMissions[index].driverId + "," + this.allMissions[index].driverFullname

      if (this.allMissions[index].employeeFullname.split(",").length === 1)
        this.allMissions[index].employeeFullname = this.allMissions[index].employeeId + "," + this.allMissions[index].employeeFullname

      this.missionsService.updateMission(this.allMissions[index].id, this.allMissions[index])
        .subscribe(
          resp => {
            //console.log(this.allMissions[index])
          },
          error => {
            
            this.helperService.showErrorToast(error)
          }
        )
    }
  }


  configDeleteMarker(tracerID: string) {

    const foundIndex = allMarker.findIndex((element: any) => element.idTracer == tracerID);
    if (foundIndex != -1) {

      const currentMarker = allMarker[foundIndex].marker;

      if (currentMarker.getPopup().isOpen()) {
        currentMarker.getPopup().closePopup()
        this.clearMap()
      }

      this.map.removeLayer(currentMarker)
      // this.onStopClicked(allMarker[foundIndex].idMission)

      allMarker.splice(foundIndex, 1)
    }
  }

  clearMap() {
    // //console.log(this.polyline)
    
    if(this.markerSource != null)
      this.map.removeLayer(this.markerSource)
    
    if(this.markerDestination != null)
      this.map.removeLayer(this.markerDestination)

    if (this.polyline != null)
      this.map.removeLayer(this.polyline);
  }


  showVehicleDirection(idTracer: string) {

    const mainThis = this;
    const foundIndex = tracersTB.findIndex(element => element.id == idTracer);
    if (foundIndex != -1) {
      const tracer = tracersTB[foundIndex];

      this.clearMap()

      let indexMarker = allMarker.findIndex((element: any) => element.idTracer == tracer.id);

      if (indexMarker > -1) {

        allMarker[foundIndex].marker.openPopup();

        tracer.coordinates = Object.keys(tracer.coordinates).map((key) => [tracer.coordinates[key][0], tracer.coordinates[key][1]]);

        let coord = mainThis.mymapService.configDirections(tracer.coordinates)

        mainThis.polyline = L.polyline(coord, { color: 'red' }).addTo(mainThis.map);

        let southWest = L.latLng(tracer.sourceLatitude + 1, tracer.sourceLongitude + 1);
        let northEast = L.latLng(tracer.destinationLatitude - 1, tracer.destinationLongitude - 1);
        let bound = L.latLngBounds(
          southWest,
          northEast
        );

        // mainThis.map.removeLayer(mainThis.markerSource)
        // mainThis.map.removeLayer(mainThis.markerDestination)
        var greenIcon = L.icon({
          iconUrl: 'assets/img/icons/pin_green.svg.png',
          shadowUrl: 'assets/img/icons/marker_shadow.png',

          iconSize:     [25, 41], // size of the icon
          iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
          shadowAnchor: [10, 41],  // the same for the shadow
      });

        var redIcon = L.icon({
          iconUrl: 'assets/img/icons/pin_red.png',
          shadowUrl: 'assets/img/icons/marker_shadow.png',

          iconSize:     [25, 41], // size of the icon
          iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
          shadowAnchor: [10, 41],  // the same for the shadow
      });

        mainThis.markerSource = L.marker([tracer.sourceLatitude, tracer.sourceLongitude], {icon: greenIcon})
        .bindPopup("source : " + tracer.sourceLocation)
        .addTo(mainThis.map)

        mainThis.markerDestination = L.marker([tracer.destinationLatitude, tracer.destinationLongitude], {icon: redIcon})
        .bindPopup("destination : " + tracer.destinationLocation)
        .addTo(mainThis.map)
        // zoom the map to the polyline
        mainThis.map.fitBounds(bound);
        // mainThis.map.fitBounds(mainThis.polyline.getBounds());

      }
    }
  }


  onStartClicked(missionId: number) {
    let index = this.allMissions.findIndex(m => m.id === missionId);
    if (index > -1) {
      let currentMission = this.allMissions[index];

      let newTracer: TracerModal = {
        id: "",

        missionId: currentMission.id,

        location: currentMission.sourceLocation,

        latitude: currentMission.sourceLatitude,

        longitude: currentMission.sourceLongitude,

        currentSpeed: 0,

        vehicleId: currentMission.vehicleId,

        vehicleMarque: currentMission.vehicleMarque,

        vehicleImg : currentMission.vehicle?.imageUrl,

        driverImg: currentMission.driver?.imageUrl,

        driverId: currentMission.driverId,

        driverFullname: currentMission.driverFullname,

        sourceLatitude: currentMission.sourceLatitude,

        sourceLongitude: currentMission.sourceLongitude,

        sourceLocation: currentMission.sourceLocation,

        destinationLatitude: currentMission.destinationLatitude,

        destinationLongitude: currentMission.destinationLongitude,

        destinationLocation: currentMission.destinationLocation,

        indexCurrentCoord: 0,

        coordinates: []

      }
      this.helperService.setIsLoading(true);
      let mainThis = this;
      this.mymapService.getArrayItineraireFromMapBox(
        newTracer.sourceLatitude, newTracer.sourceLongitude,
        newTracer.destinationLatitude, newTracer.destinationLongitude)
        .subscribe(resp => {

          let coord = resp.routes[0].geometry.coordinates
          newTracer.coordinates = coord;

          mainThis.tracerService.onAddTracer(newTracer);
          // mainThis.allTracers.push(newTracer)
          mainThis.updateGlobalMission(mainThis.allMissions[index].id, "started")
          mainThis.configStartMission(newTracer.id, newTracer.missionId)
          this.helperService.setIsLoading(false);
        },
          error => {
            this.helperService.showErrorToast(error)
          })
    }
  }

  onStopClicked(missionId: number) {
    let indexTracer = tracersTB.findIndex(m => m.missionId === missionId);
    if (indexTracer < 0) {
      this.helperService.showErrorToast("Error: Tracer does not exist")
    }
    this.configMissionFinshed(tracersTB[indexTracer].id);
  }

  setContentPopupMarker(tracer: TracerModal): L.Popup {

    let contentPopup = `<div class="row" style="width: 280px">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-4">
          <h6>Vitesse: </h6>
        </div>
        <div class="col-md-8">
          <h6><b>`+ tracer.currentSpeed + `</b> km/h </h6>
        </div>
        <div class="col-md-4">
          <h6>Source: </h6>
        </div>
        <div class="col-md-8">
          <h6><b>`+ tracer.sourceLocation + `</b> </h6>
        </div>
        <div class="col-md-4">
          <h6>Destination: </h6>
        </div>
        <div class="col-md-8">
          <h6><b>`+ tracer.destinationLocation + `</b> </h6>
        </div>
        
      </div>
    </div>
    <div class="col-md-6">
        <img src="`+ tracer.vehicleImg + `" width="100" height="100">
        <h6 class="text-center mt-2"><b> `+ tracer.vehicleMarque + ` </b> </h6>
    </div>
    <div class="col-md-6">
        <img src="`+ tracer.driverImg + `" class="rounded-circle" width="100" height="100">
        <h6 class="text-center mt-2"><b> `+ tracer.driverFullname + ` </b> </h6>
    </div>
</div>`
    // let contentPopup = 'Vehicle : ' + tracer.vehicleMarque + ' <br> Location : ' + tracer.location + ' <br> Speed : ' + tracer.currentSpeed;

    return L.popup()
      .setContent(contentPopup);
  }

  ngOnDestroy()
  {
    for(let i =0; i < allSetInterval.length; i++)
    {
      clearInterval(allSetInterval[i].setIntervalId)
    }
    allSetInterval.splice(0, allSetInterval.length)

    //destroy everything 
  }

}

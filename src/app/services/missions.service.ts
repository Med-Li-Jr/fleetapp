import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MissionCreate, MissionDetail, MissionModal, MissionRead, MissionUpdate } from '../modals/mission.modal';
import { LayoutBLLService } from './layoutBLL.service';
import { UsersService } from './users.service';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {


  constructor(
    private bllService: LayoutBLLService,
    private employeesService: UsersService,
    private vehiclesService: VehiclesService,
    private driversService: UsersService,
  ) { }

  convertModalToRead(mission: MissionModal): MissionRead {
    return {
      id: mission.id,
      vehicleId: mission.vehicleId,
      vehicleMarque: mission.vehicleMarque,
      employeeId: mission.employeeId,
      employeeFullname: mission.employeeFullname,
      driverId: mission.driverId,
      driverFullname: mission.driverFullname,
      status: mission.status,
      sourceLocation: mission.sourceLocation,
      destinationLocation: mission.destinationLocation
    }
  }

  convertModalToDetail(mission: MissionModal): MissionDetail {
    return {
      id: mission.id,
      vehicleId: mission.vehicleId,
      vehicleMarque: mission.vehicleMarque,
      employeeId: mission.employeeId,
      employeeFullname: mission.employeeFullname,
      driverId: mission.driverId,
      driverFullname: mission.driverFullname,
      status: mission.status,
      dateStart: mission.dateStart,
      dateEnd: mission.dateEnd,
      sourceLatitude: mission.sourceLatitude,
      sourceLongitude: mission.sourceLongitude,
      sourceLocation: mission.sourceLocation,
      destinationLatitude: mission.destinationLatitude,
      destinationLongitude: mission.destinationLongitude,
      destinationLocation: mission.destinationLocation,
      driver: this.driversService.userById(mission.driverId),
      employee: this.employeesService.userById(mission.employeeId),
      vehicle: this.vehiclesService.vehicleById(mission.vehicleId)

    }
  }

  convertCreateToModal(mission: MissionCreate, id: number): MissionModal {
    return {
      id: id,
      vehicleId: mission.vehicleId,
      vehicleMarque: mission.vehicleMarque,
      employeeId: mission.employeeId,
      employeeFullname: mission.employeeFullname,
      driverId: mission.driverId,
      driverFullname: mission.driverFullname,
      status: mission.status,
      dateStart: mission.dateStart,
      dateEnd: mission.dateEnd,
      sourceLatitude: mission.sourceLatitude,
      sourceLongitude: mission.sourceLongitude,
      sourceLocation: mission.sourceLocation,
      destinationLatitude: mission.destinationLatitude,
      destinationLongitude: mission.destinationLongitude,
      destinationLocation: mission.destinationLocation,
    }
  }


  convertUpdateToModal(mission: MissionUpdate): MissionModal {
    return {
      id: mission.id,
      vehicleId: mission.vehicleId,
      vehicleMarque: mission.vehicleMarque,
      employeeId: mission.employeeId,
      employeeFullname: mission.employeeFullname,
      driverId: mission.driverId,
      driverFullname: mission.driverFullname,
      status: mission.status,
      dateStart: mission.dateStart,
      dateEnd: mission.dateEnd,
      sourceLatitude: mission.sourceLatitude,
      sourceLongitude: mission.sourceLongitude,
      sourceLocation: mission.sourceLocation,
      destinationLatitude: mission.destinationLatitude,
      destinationLongitude: mission.destinationLongitude,
      destinationLocation: mission.destinationLocation,
    }
  }

  getAllMissions(): Observable<MissionRead[]> {

    this.updateTB()
    
      
    let allMissions: MissionRead[] = []
    for (let i = 0; i < missionsTB.length; i++) {
      allMissions.push(this.convertModalToRead(missionsTB[i]))
    }
    return of(allMissions)
  }

  getCurrentMissions(): Observable<MissionDetail[]> {

    this.updateTB()
      
    let allMissions: MissionDetail[] = []
    for (let i = 0; i < missionsTB.length; i++) {
      if (missionsTB[i].status.trim().toLowerCase() !== "finished")
        allMissions.push(this.convertModalToDetail(missionsTB[i]))
    }
    return of(allMissions)
  }

  // getAllMissionsByVehicleID(id: number): MissionRead[] {
  //   let missionsVehicle: MissionRead[] = []
  //   for (let i = 0; i < missionsTB.length; i++) {
  //     if (missionsTB[i].vehicleId === id)
  //       missionsVehicle.push(this.convertModalToRead(missionsTB[i]))
  //   }
  //   return missionsVehicle;
  // }

  getMissionById(id: number): Observable<MissionDetail> {

    this.updateTB()
    
    let index = missionsTB.findIndex(user => user.id === id)
    if (index < 0)
      return throwError(() => Error("Mission does not exist"))


    return of(this.convertModalToDetail(missionsTB[index]));
  }


  missionById(id: number): MissionRead {

    this.updateTB()
    
    let index = missionsTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.bllService.defaultMission();

    return missionsTB[index];
  }
  addMission(mission: MissionCreate): Observable<string> {

    this.updateTB()
    
    let oldEmployee = mission.employeeFullname;
    let oldVehicle = mission.vehicleMarque;
    let oldDriver = mission.driverFullname;

    let message = this.bllService.validateMission(mission);
    if (message.length > 0) {
      mission.employeeFullname = oldEmployee;
      mission.vehicleMarque = oldVehicle;
      mission.driverFullname = oldDriver
      return throwError(() => Error(message))
    }

    missionsTB.push(this.convertCreateToModal(mission, (this.bllService.getLastIdFromData(missionsTB) + 1)))
    this.updateTable()
    return of("Add success")
  }

  updateMission(id: Number, mission: MissionUpdate): Observable<string> {

    this.updateTB()
    
    let index = missionsTB.findIndex(elt => elt.id === id)
    if (index < 0)
      return throwError(() => Error("Mission does not exist"));

    let oldEmployee = mission.employeeFullname;
    let oldVehicle = mission.vehicleMarque;
    let oldDriver = mission.driverFullname;

    let message = this.bllService.validateMission(mission);
    if (message.length > 0) {
      mission.employeeFullname = oldEmployee;
      mission.vehicleMarque = oldVehicle;
      mission.driverFullname = oldDriver
      return throwError(() => Error(message))
    }
    missionsTB[index] = this.convertUpdateToModal(mission);
    this.updateTable()
    return of("Update success");

  }

  deleteMission(id: number): Observable<string> {

    this.updateTB()

    let index = missionsTB.findIndex(element => element.id === id);
    if (index < 0)
      return throwError(() => Error("Mission does not exist"));

    missionsTB.splice(index, 1);
    this.updateTable();
    return of("Delete success");

  }

  updateTable()
  {
    localStorage.setItem("missionsTable", JSON.stringify(missionsTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("missionsTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      missionsTB = loaclTB;
  }
}

export let missionsTB: MissionModal[] = []
import { Injectable } from '@angular/core';
import { LayoutBLLService } from './layoutBLL.service';
import { InsurancesService } from './insurances.service';
import { VignettesService } from './vignettes.service';
import { VouchersService } from './vouchers.service';
import { VehicleCreate, VehicleDetail, VehicleModal, VehicleRead, VehicleUpdate } from '../modals/vehicle.modal';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    private bllService: LayoutBLLService,
    private insuranceService: InsurancesService,
    private vignettesService: VignettesService,
    private vouchersService: VouchersService) 
    { }

  convertModalToRead(vehicle: VehicleModal) : VehicleRead {
    return {
      id: vehicle.id,
      groupeId:vehicle.groupeId,
      groupeName: vehicle.groupeName,
      marque: vehicle.marque,
      seatNbr: vehicle.seatNbr,
      datePurchase: vehicle.datePurchase,
      imageUrl: vehicle.imageUrl 
    }
  }

  convertModalToDetail(vehicle: VehicleModal) : VehicleDetail {
    return {
      id: vehicle.id,
      groupeId:vehicle.groupeId,
      groupeName: vehicle.groupeName,
      marque: vehicle.marque,
      seatNbr: vehicle.seatNbr,
      datePurchase: vehicle.datePurchase,
      dateStartUsage: vehicle.dateStartUsage,
      dateLimiteUsage: vehicle.dateLimiteUsage,
      imageUrl: vehicle.imageUrl,
      allInsurances: this.insuranceService.getAllInsurancesByVehicleID(vehicle.id),
      allVignettes: this.vignettesService.getAllVignettesByVehicleID(vehicle.id),
      allVouchers: this.vouchersService.getAllVouchersByVehicleID(vehicle.id),
    }
  }

  convertCreateToModal(vehicle: VehicleCreate, id: number) : VehicleModal {
    return {
      id: id,
      groupeId:vehicle.groupeId,
      groupeName: vehicle.groupeName,
      marque: vehicle.marque,
      seatNbr: vehicle.seatNbr,
      datePurchase: vehicle.datePurchase,
      dateStartUsage: vehicle.dateStartUsage,
      dateLimiteUsage: vehicle.dateLimiteUsage,
      imageUrl: "",
    }
  }


  convertUpdateToModal(vehicle: VehicleUpdate) : VehicleModal {
    return {
      id: vehicle.id,
      groupeId:vehicle.groupeId,
      groupeName: vehicle.groupeName,
      marque: vehicle.marque,
      seatNbr: vehicle.seatNbr,
      datePurchase: vehicle.datePurchase,
      dateStartUsage: vehicle.dateStartUsage,
      dateLimiteUsage: vehicle.dateLimiteUsage,
      imageUrl: "",
    }
  }

  getAllVehicles() : Observable<VehicleRead[]> 
  {
    this.updateTB()
      
    let allVehicles : VehicleRead[] = []
    for(let i = 0; i < vehiclesTB.length; i++)
    {
      allVehicles.push(this.convertModalToRead(vehiclesTB[i]))
    }
    return of(allVehicles)
  }
  
  getAllVehiclesByGroupeID(id: number) : VehicleRead[] 
  {
    this.updateTB()

    let vehicleGroupe : VehicleRead[] = []
    for(let i = 0; i < vehiclesTB.length; i++)
    {
      if(vehiclesTB[i].groupeId === id)
        vehicleGroupe.push(this.convertModalToRead(vehiclesTB[i]))
    }
    return vehicleGroupe;
  }
  
  getVehicleById(id: number): Observable<VehicleDetail>
  {
    this.updateTB()

    let index = vehiclesTB.findIndex(vehicle => vehicle.id === id)
    if (index < 0)
      return throwError( () => Error("Vehicle does not exist"));


    return of(this.convertModalToDetail(vehiclesTB[index]));

  }


  vehicleById(id: number): VehicleRead {

    this.updateTB()

    let index = vehiclesTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.bllService.defaultVehicle();

    return vehiclesTB[index];
  }
  
  addVehicle(vehicle: VehicleCreate, imageVehicle: string) : Observable<string>
  {
    this.updateTB()

    let oldGroupe = vehicle.groupeName;
    let message = this.bllService.validateVehicle(vehicle, 0); 
    if (message.length > 0) {
      vehicle.groupeName = oldGroupe
      return throwError(() => Error(message))
    }

    let newVehicle = this.convertCreateToModal(vehicle, (this.bllService.getLastIdFromData(vehiclesTB) + 1))
    newVehicle.imageUrl = imageVehicle ?? "assets/img/avatars/default_vehicle.jpeg"
    vehiclesTB.push(newVehicle)
    this.updateTable()
    
    return of("Add success")
  }

  updateVehicle(id: Number, vehicle: VehicleUpdate, imageVehicle: string) : Observable<string>
  {
    this.updateTB()
    let index = vehiclesTB.findIndex( elt => elt.id === id)
    if(index < 0)
    return throwError(() => Error("Vehicle does not exist"))


      let oldGroupe = vehicle.groupeName;
    let message = this.bllService.validateVehicle(vehicle, vehicle.id); 
    if (message.length > 0) {
      vehicle.groupeName = oldGroupe
      return throwError(() => Error(message))
    }

    let vehicleUpdate = this.convertUpdateToModal(vehicle)
    vehicleUpdate.imageUrl = imageVehicle
    vehiclesTB[index] = vehicleUpdate
    this.updateTable()
    return of("Update success");

  }

  deleteVehicle(id: number) : Observable<string>
  {
    this.updateTB()
    let index = vehiclesTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError(() => Error("Vehicle does not exist"))

    vehiclesTB.splice(index, 1);
    this.updateTable()
    return of("Delete success");
  } 
  
  updateTable()
  {
    localStorage.setItem("vehiclesTable", JSON.stringify(vehiclesTB))
  }

  updateTB()
  {
    let loaclTB: any = localStorage.getItem("vehiclesTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      vehiclesTB = loaclTB;
  }
}

export let vehiclesTB: VehicleModal[] = []
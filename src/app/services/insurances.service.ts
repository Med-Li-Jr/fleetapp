import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { InsuranceCreate, InsuranceDetail, InsuranceModal, InsuranceRead, InsuranceUpdate } from '../modals/insurance.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class InsurancesService {

  constructor(
    private bllService: LayoutBLLService) { }

  convertModalToRead(insurance: InsuranceModal): InsuranceRead {
    return {
      id: insurance.id,
      vehicleId: insurance.vehicleId,
      vehicleMarque: insurance.vehicleMarque,
      nameAgence: insurance.nameAgence,
      price: insurance.price,
      dateLimiteUsage: insurance.dateLimiteUsage
    }
  }

  convertModalToDetail(insurance: InsuranceModal): InsuranceDetail {
    return {
      id: insurance.id,
      vehicleId: insurance.vehicleId,
      vehicleMarque: insurance.vehicleMarque,
      nameAgence: insurance.nameAgence,
      price: insurance.price,
      dateStartUsage: insurance.dateStartUsage,
      dateLimiteUsage: insurance.dateLimiteUsage,
      vehicle: this.bllService.defaultVehicle()
    }
  }

  convertCreateToModal(insurance: InsuranceCreate, id: number): InsuranceModal {
    return {
      id: id,
      vehicleId: insurance.vehicleId,
      vehicleMarque: insurance.vehicleMarque,
      nameAgence: insurance.nameAgence,
      price: insurance.price,
      dateStartUsage: insurance.dateStartUsage,
      dateLimiteUsage: insurance.dateLimiteUsage,
    }
  }


  convertUpdateToModal(insurance: InsuranceUpdate): InsuranceModal {
    return {
      id: insurance.id,
      vehicleId: insurance.vehicleId,
      vehicleMarque: insurance.vehicleMarque,
      nameAgence: insurance.nameAgence,
      price: insurance.price,
      dateStartUsage: insurance.dateStartUsage,
      dateLimiteUsage: insurance.dateLimiteUsage,
    }
  }


  getAllInsurances(): Observable<InsuranceRead[]> {

    this.updateTB()
    
    let allInsurances: InsuranceRead[] = []
    for (let i = 0; i < insurancesTB.length; i++) {
      allInsurances.push(this.convertModalToRead(insurancesTB[i]))
    }
    return of(allInsurances)
  }

  getAllInsurancesByVehicleID(id: number): InsuranceRead[] {

    this.updateTB()
    
    let insurancesVehicle: InsuranceRead[] = []
    for (let i = 0; i < insurancesTB.length; i++) {
      if (insurancesTB[i].vehicleId === id)
        insurancesVehicle.push(this.convertModalToRead(insurancesTB[i]))
    }
    return insurancesVehicle;
  }

  getInsuranceById(id: number): Observable<InsuranceDetail> {

    this.updateTB()
    
    let index = insurancesTB.findIndex(insurance => insurance.id === id)
    if (index < 0)
      return throwError(() => Error("Insurance does not exist"))

    return of(this.convertModalToDetail(insurancesTB[index]));
  }


  insuranceById(id: number): InsuranceRead {

    this.updateTB()
    
    let index = insurancesTB.findIndex(insurance => insurance.id === id)
    if (index < 0)
      return this.bllService.defaultInsurance();

    return insurancesTB[index];
  }
  addInsurance(insurance: InsuranceCreate): Observable<string> {

    this.updateTB()

    let oldVehicle = insurance.vehicleMarque;
    let message = this.bllService.validateInsurance(insurance);
    if (message.length > 0) {
      insurance.vehicleMarque = oldVehicle
      return throwError(() => Error(message))
    }

    insurancesTB.push(this.convertCreateToModal(insurance, (this.bllService.getLastIdFromData(insurancesTB) + 1)))
    this.updateTable();
    return of("Add success")
  }

  updateInsurance(id: Number, insurance: InsuranceUpdate): Observable<string> {

    this.updateTB()
    
    let index = insurancesTB.findIndex(elt => elt.id === id)
    if (index < 0)
      return throwError(() => Error("Insurance does not exist"))


    let oldVehicle = insurance.vehicleMarque;
    let message = this.bllService.validateInsurance(insurance);
    if (message.length > 0) {
      insurance.vehicleMarque = oldVehicle
      return throwError(() => Error(message))
    }

    insurancesTB[index] = this.convertUpdateToModal(insurance);
    this.updateTable();

    return of("Update success");

  }

  deleteInsurance(id: number): Observable<string> {

    this.updateTB()
    
    let index = insurancesTB.findIndex(element => element.id === id);
    if (index < 0)
      return throwError(() => Error("Insurance does not exist"))

    insurancesTB.splice(index, 1);
    this.updateTable();
    return of("Delete success");
  }

  updateTable() {
    localStorage.setItem("insurancesTable", JSON.stringify(insurancesTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("insurancesTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      insurancesTB = loaclTB;
  }

}

export let insurancesTB: InsuranceModal[] = []
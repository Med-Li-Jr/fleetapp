import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { VoucherCreate, VoucherDetail, VoucherModal, VoucherRead, VoucherUpdate } from '../modals/voucher.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(
    private bllService: LayoutBLLService) { }

  convertModalToRead(voucher: VoucherModal): VoucherRead {
    return {
      id: voucher.id,
      vehicleId: voucher.vehicleId,
      vehicleMarque: voucher.vehicleMarque,
      totalLiter: voucher.totalLiter,
      employeeId: voucher.employeeId,
      employeeFullname: voucher.employeeFullname,
      providerId: voucher.providerId,
      providerFullname: voucher.providerFullname,
      dateLimiteUsage: voucher.dateLimiteUsage
    }
  }

  convertModalToDetail(voucher: VoucherModal): VoucherDetail {
    return {
      id: voucher.id,
      vehicleId: voucher.vehicleId,
      vehicleMarque: voucher.vehicleMarque,
      totalLiter: voucher.totalLiter,
      employeeId: voucher.employeeId,
      employeeFullname: voucher.employeeFullname,
      providerId: voucher.providerId,
      providerFullname: voucher.providerFullname,
      dateLimiteUsage: voucher.dateLimiteUsage,
      price: voucher.price,
      dateStartUsage: voucher.dateStartUsage,
      vehicle: this.bllService.defaultVehicle()
    }
  }

  convertCreateToModal(voucher: VoucherCreate, id: number): VoucherModal {
    return {
      id: id,
      vehicleId: voucher.vehicleId,
      vehicleMarque: voucher.vehicleMarque,
      totalLiter: voucher.totalLiter,
      employeeId: voucher.employeeId,
      employeeFullname: voucher.employeeFullname,
      providerId: voucher.providerId,
      providerFullname: voucher.providerFullname,
      dateLimiteUsage: voucher.dateLimiteUsage,
      price: voucher.price,
      dateStartUsage: voucher.dateStartUsage,
    }
  }


  convertUpdateToModal(voucher: VoucherUpdate): VoucherModal {
    return {
      id: voucher.id,
      vehicleId: voucher.vehicleId,
      vehicleMarque: voucher.vehicleMarque,
      totalLiter: voucher.totalLiter,
      employeeId: voucher.employeeId,
      employeeFullname: voucher.employeeFullname,
      providerId: voucher.providerId,
      providerFullname: voucher.providerFullname,
      dateLimiteUsage: voucher.dateLimiteUsage,
      price: voucher.price,
      dateStartUsage: voucher.dateStartUsage,
    }
  }

  getAllVouchers(): Observable<VoucherRead[]> {
    
    this.updateTB()


    let allVouchers: VoucherRead[] = []
    for (let i = 0; i < vouchersTB.length; i++) {
      allVouchers.push(this.convertModalToRead(vouchersTB[i]))
    }
    return of(allVouchers)
  }

  getAllVouchersByVehicleID(id: number): VoucherRead[] {


    this.updateTB()

    
    let vouchersVehicle: VoucherRead[] = []
    for (let i = 0; i < vouchersTB.length; i++) {
      if (vouchersTB[i].vehicleId === id)
        vouchersVehicle.push(this.convertModalToRead(vouchersTB[i]))
    }
    return vouchersVehicle;
  }

  getVoucherById(id: number): Observable<VoucherDetail> {


    this.updateTB()

    
      
    let index = vouchersTB.findIndex(user => user.id === id)
    if (index < 0)
      return throwError(() => Error("Voucher does not exist"))


    return of(this.convertModalToDetail(vouchersTB[index]));
  }


  voucherById(id: number): VoucherRead {


    this.updateTB()
      

    let index = vouchersTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.bllService.defaultVoucher();

    return vouchersTB[index];
  }
  addVoucher(voucher: VoucherCreate): Observable<string> {

    this.updateTB()

    let oldEmployee = voucher.employeeFullname;
    let oldVehicle = voucher.vehicleMarque;
    let oldProvider = voucher.providerFullname;

    let message = this.bllService.validateVoucher(voucher);
    if (message.length > 0) {
      voucher.employeeFullname = oldEmployee;
      voucher.vehicleMarque = oldVehicle;
      voucher.providerFullname = oldProvider
      return throwError(() => Error(message))
    }

    vouchersTB.push(this.convertCreateToModal(voucher, (this.bllService.getLastIdFromData(vouchersTB) + 1)))
    this.updateTable()
    return of("Add success")
  }

  updateVoucher(id: Number, voucher: VoucherUpdate): Observable<string> {


    this.updateTB()

    
    let index = vouchersTB.findIndex(elt => elt.id === id)
    if (index < 0)
    return throwError(() => Error("Voucher does not exist"))


    let oldEmployee = voucher.employeeFullname;
    let oldVehicle = voucher.vehicleMarque;
    let oldProvider = voucher.providerFullname;

    let message = this.bllService.validateVoucher(voucher);
    if (message.length > 0) {
      voucher.employeeFullname = oldEmployee;
      voucher.vehicleMarque = oldVehicle;
      voucher.providerFullname = oldProvider
      return throwError(() => Error(message))
    }

    vouchersTB[index] = this.convertUpdateToModal(voucher);
    this.updateTable()
    return of("Update success");

  }

  deleteVoucher(id: number): Observable<string> {

    this.updateTB()

    let index = vouchersTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError(() => Error("Voucher does not exist"))

    vouchersTB.splice(index, 1);
    this.updateTable()
    return of("Delete success");

  }

  updateTable()
  {
    localStorage.setItem("vouchersTable", JSON.stringify(vouchersTB))
  }

  updateTB()
  {
    let loaclTB: any = localStorage.getItem("vouchersTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      vouchersTB = loaclTB;
  }
}

export let vouchersTB: VoucherModal[] = []
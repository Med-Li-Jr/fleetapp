import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { VignetteCreate, VignetteDetail, VignetteModal, VignetteRead, VignetteUpdate } from '../modals/vignette.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class VignettesService {

  constructor(
    private bllService: LayoutBLLService) { }

  convertModalToRead(vignette: VignetteModal) : VignetteRead {
    return {
      id: vignette.id,
      vehicleId: vignette.vehicleId,
      vehicleMarque: vignette.vehicleMarque,
      type : vignette.type,
      price: vignette.price,
      dueDate: vignette.dueDate,
    }
  }

  convertModalToDetail(vignette: VignetteModal) : VignetteDetail {
    return {
      id: vignette.id,
      vehicleId: vignette.vehicleId,
      vehicleMarque: vignette.vehicleMarque,
      type : vignette.type,
      price: vignette.price,
      dueDate: vignette.dueDate,
      vehicle: this.bllService.defaultVehicle()
    }
  }

  convertCreateToModal(vignette: VignetteCreate, id: number) : VignetteModal {
    return {
      id: id,
      vehicleId: vignette.vehicleId,
      vehicleMarque: vignette.vehicleMarque,
      type : vignette.type,
      price: vignette.price,
      dueDate: vignette.dueDate,
    }
  }


  convertUpdateToModal(vignette: VignetteUpdate) : VignetteModal {
    return {
      id: vignette.id,
      vehicleId: vignette.vehicleId,
      vehicleMarque: vignette.vehicleMarque,
      type : vignette.type,
      price: vignette.price,
      dueDate: vignette.dueDate,
    }
  }

  getAllVignettes() : Observable<VignetteRead[]> 
  {

    this.updateTB()

      
    let allVignettes : VignetteRead[] = []
    for(let i = 0; i < vignettesTB.length; i++)
    {
      allVignettes.push(this.convertModalToRead(vignettesTB[i]))
    }
    return of(allVignettes)
  }
  
  getAllVignettesByVehicleID(id: number) : VignetteRead[] 
  {

    this.updateTB()


    let vignettesVehicle : VignetteRead[] = []
    for(let i = 0; i < vignettesTB.length; i++)
    {
      if(vignettesTB[i].vehicleId === id)
        vignettesVehicle.push(this.convertModalToRead(vignettesTB[i]))
    }
    return vignettesVehicle;
  }
  
  getVignetteById(id: number): Observable<VignetteDetail>
  {

    this.updateTB()

      
    let index = vignettesTB.findIndex(user => user.id === id)
    if (index < 0)
      return throwError( () => Error("Vignette does not exist"))


    return of(this.convertModalToDetail(vignettesTB[index]));

  }


  vignetteById(id: number): VignetteRead {

    this.updateTB()

    let index = vignettesTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.bllService.defaultVignette();

    return vignettesTB[index];
  }

  addVignette(vignette: VignetteCreate) : Observable<string>
  {

    this.updateTB()

    let oldVehicle = vignette.vehicleMarque;
    let message = this.bllService.validateVignette(vignette); 
    if (message.length > 0) {
      vignette.vehicleMarque = oldVehicle
      return throwError(() => Error(message))
    }

    vignettesTB.push(this.convertCreateToModal( vignette, (this.bllService.getLastIdFromData(vignettesTB) + 1)))
    this.updateTable()
    return of("Add success")
  }

  updateVignette(id: Number, vignette: VignetteUpdate) : Observable<string>
  {

    this.updateTB()

    let index = vignettesTB.findIndex( elt => elt.id === id)
    if(index < 0)
    return throwError(() => Error("Vignette does not exist"))


    let oldVehicle = vignette.vehicleMarque;
    let message = this.bllService.validateVignette(vignette); 
    if (message.length > 0) {
      vignette.vehicleMarque = oldVehicle
      return throwError(() => Error(message))
    }

    vignettesTB[index] = this.convertUpdateToModal(vignette);
    this.updateTable()
    return of("Update success");

  }

  deleteVignette(id: number) : Observable<string>
  {

    this.updateTB()

    let index = vignettesTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError(() => Error("Vignette does not exist"))

    vignettesTB.splice(index, 1);
    this.updateTable()
    return of("Delete success");
  }
  
  updateTable()
  {
    localStorage.setItem("vignettesTable", JSON.stringify(vignettesTB))
  }

  updateTB()
  {
    let loaclTB: any = localStorage.getItem("vignettesTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      vignettesTB = loaclTB;
  }
}

export let vignettesTB: VignetteModal[] = []
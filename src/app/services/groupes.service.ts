import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { GroupeCreate, GroupeDetail, GroupeModal, GroupeRead, GroupeUpdate } from '../modals/groupe.modal';
import { LayoutBLLService } from './layoutBLL.service';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {


  constructor(
    private bllService: LayoutBLLService,
    private vehiclesService: VehiclesService) { }



  convertModalToRead(groupe: GroupeModal): GroupeRead {
    return {
      id: groupe.id,
      name: groupe.name,
      description: groupe.description,
    }
  }


  convertModalToDetail(groupe: GroupeModal): GroupeDetail {
    return {
      id: groupe.id,
      name: groupe.name,
      description: groupe.description,
      allVehicles: this.vehiclesService.getAllVehiclesByGroupeID(groupe.id)
    }
  }
  convertCreateToModal(groupe: GroupeCreate, id: number): GroupeModal {
    return {
      id: id,
      name: groupe.name,
      description: groupe.description,
    }
  }


  convertUpdateToModal(groupe: GroupeUpdate): GroupeModal {
    return {
      id: groupe.id,
      name: groupe.name,
      description: groupe.description,
    }
  }

  getAllGroupes(): Observable<GroupeRead[]> {

    this.updateTB()
    
    let allGroupes: GroupeRead[] = []
    for (let i = 0; i < groupesTB.length; i++) {
      allGroupes.push(this.convertModalToRead(groupesTB[i]))
    }
    return of(allGroupes)
  }

  getGroupeById(id: number): Observable<GroupeDetail> {

    this.updateTB()
    
    let index = groupesTB.findIndex(groupe => groupe.id === id)
    if (index < 0)
      return throwError(() => Error("Groupe does not exist"))

    return of(this.convertModalToDetail(groupesTB[index]));
  }

  groupeById(id: number): GroupeRead {

    this.updateTB()
    
    let index = groupesTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.bllService.defaultGroupe();

    return groupesTB[index];
  }


  addGroupe(groupe: GroupeCreate): Observable<string> {

    this.updateTB()
    
    let message = this.bllService.validateGroupe(groupe, 0);

    if (message.length > 0) {
      return throwError(() => Error(message))
    }

    groupesTB.push(this.convertCreateToModal(groupe, (this.bllService.getLastIdFromData(groupesTB) + 1)))
    this.updateTable()
    return of("Add success")
  }

  updateGroupe(id: Number, groupe: GroupeUpdate): Observable<string> {

    this.updateTB()
    
    let index = groupesTB.findIndex(element => element.id === id);
    if (index < 0)
      return throwError(() => Error("Groupe does not exist"))

    let message = this.bllService.validateGroupe(groupe, groupe.id);

    if (message.length > 0) {
      return throwError(() => Error(message))
    }

    groupesTB[index] = this.convertUpdateToModal(groupe);
    this.updateTable();
    return of("Update success");

  }

  deleteGroupe(id: number): Observable<string> {

    this.updateTB()
    
    let index = groupesTB.findIndex(element => element.id === id);
    if (index < 0)
      return throwError(() => Error("Groupe does not exist"))

    groupesTB.splice(index, 1);
    this.updateTable();

    return of("Delete success");

  }

  updateTable() {
    localStorage.setItem("groupesTable", JSON.stringify(groupesTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("groupesTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      groupesTB = loaclTB;
  }

}

export let groupesTB: GroupeModal[] = []
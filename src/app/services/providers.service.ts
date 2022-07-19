import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ProviderCreate, ProviderDetail, ProviderModal, ProviderRead, ProviderUpdate } from '../modals/provider.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private bllService: LayoutBLLService) { }

  convertModalToRead(provider: ProviderModal): ProviderRead {
    return {
      id: provider.id,
      fullname: provider.fullname,
      email: provider.email,
      matricule: provider.matricule,
    }
  }


  convertModalToDetail(provider: ProviderModal): ProviderDetail {
    return {
      id: provider.id,
      fullname: provider.fullname,
      email: provider.email,
      matricule: provider.matricule,
      address: provider.address,
      phone: provider.phone
    }
  }
  convertCreateToModal(provider: ProviderCreate, id: number): ProviderModal {
    return {
      id: id,
      fullname: provider.fullname,
      email: provider.email,
      matricule: provider.matricule,
      address: provider.address,
      phone: provider.phone
    }
  }

  convertUpdateToModal(provider: ProviderUpdate): ProviderModal {
    return {
      id: provider.id,
      fullname: provider.fullname,
      email: provider.email,
      matricule: provider.matricule,
      address: provider.address,
      phone: provider.phone
    }
  }

  getAllProviders(): Observable<ProviderRead[]> {

    this.updateTB()
    
    let allProviders: ProviderRead[] = []
    for (let i = 0; i < providersTB.length; i++) {
      allProviders.push(this.convertModalToRead(providersTB[i]))
    }
    return of(allProviders)
  }

  getProviderById(id: number): Observable<ProviderDetail> {

    this.updateTB()
    
    let index = providersTB.findIndex(provider => provider.id === id)
    if (index < 0)
      return throwError( () => Error("Provider does not exist"))


    return of(this.convertModalToDetail(providersTB[index]));
  }

  providerById(id: number): ProviderRead {

    this.updateTB()

    let index = providersTB.findIndex(provider => provider.id === id)
    if (index < 0)
      return this.bllService.defaultProvider();

    return providersTB[index];
  }

  addProvider(provider: ProviderCreate): Observable<string> {

    this.updateTB()
    
    let message = this.bllService.validateProvider(provider, 0);

    if (message.length > 0) {
      return throwError(() => Error(message))
    }

    providersTB.push(this.convertCreateToModal(provider, (this.bllService.getLastIdFromData(providersTB) + 1)))
    this.updateTable()
    return of("Add success")
  }

  updateProvider(id: Number, provider: ProviderUpdate): Observable<string> {

    this.updateTB()
    

    let index = providersTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError(() => Error("Provider does not exist"))

    let message = this.bllService.validateProvider(provider, provider.id);

    if (message.length > 0) {
      return throwError(() => Error(message))
    }

    providersTB[index] = this.convertUpdateToModal(provider);
    this.updateTable()
    return of("Update success");
  }

  deleteProvider(id: number): Observable<string> {

    this.updateTB()
    
    let index = providersTB.findIndex(element => element.id === id);
    if (index < 0)
    return throwError(() => Error("Provider does not exist"))

    providersTB.splice(index, 1);
    this.updateTable()
    return of("Delete success");
  }

  updateTable()
  {
    localStorage.setItem("providersTable", JSON.stringify(providersTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("providersTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      providersTB = loaclTB;
  }

}

export let providersTB: ProviderModal[] = []
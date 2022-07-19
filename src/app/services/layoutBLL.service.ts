import { Injectable } from '@angular/core';
import { GroupeRead } from '../modals/groupe.modal';
import { InsuranceRead } from '../modals/insurance.modal';
import { MissionCreate, MissionRead } from '../modals/mission.modal';
import { ProviderRead } from '../modals/provider.modal';
import { UserRead } from '../modals/user.modal';
import { VehicleRead } from '../modals/vehicle.modal';
import { VignetteRead } from '../modals/vignette.modal';
import { VoucherRead } from '../modals/voucher.modal';
import { privilegesTB } from './privileges.service';
import { providersTB } from './providers.service';
import { usersTB } from './users.service';
import { groupesTB } from './groupes.service';
import { vehiclesTB } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutBLLService {

  constructor() { }

  getLastIdFromData(data: any[]) {
    return data.length === 0 ? 1 : data[data.length - 1]["id"]
  }
  
  validateGroupe(groupe: any, id: number): string {

    let index = groupesTB.findIndex(
      elt => elt.name.trim().toLowerCase() === groupe.name.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      return ("Name already exist");

    return "";
  }


  validateUser(user: any, id: number): string {

    // let index = usersTB.findIndex(
    //   elt => elt.fullname.trim().toLowerCase() === user.fullname.trim().toLowerCase() && elt.id !== id)
    // if (index >= 0)
    //   return ("Name already exist");

    let message = "";

    let index = usersTB.findIndex(
      elt => elt.email.trim().toLowerCase() === user.email.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      message = ("Email already exist") + ";"

    index = usersTB.findIndex(
      elt => elt.phone.trim().toLowerCase() === user.phone.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      message +=  ("Phone already exist") + ";"
    
    if(["superadmin", "employee", "driver"].includes(user.roleName.trim().toLowerCase()) == false )
      message +=  ("Choose a valid Role") + ";"
      
    return message;
  }


  validateProvider(provider: any, id: number): string {

    let message = "";
    let index = providersTB.findIndex(
      elt => elt.matricule.trim().toLowerCase() === provider.matricule.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      message += ("Matricule already exist") + ";"

    index = providersTB.findIndex(
      elt => elt.email.trim().toLowerCase() === provider.email.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      message +=  ("Email already exist") + ";"

    index = providersTB.findIndex(
      elt => elt.phone.trim().toLowerCase() === provider.phone.trim().toLowerCase() && elt.id !== id)
    if (index >= 0)
      message +=  ("Phone already exist") + ";"

    return message;
  }


  validateVehicle(vehicle: any, id: number): string {

    let paramGroupe = vehicle.groupeName.split(",");

    if (paramGroupe.length < 2)
      return "Choose a groupe"

    vehicle.groupeId = Number.parseInt(paramGroupe[0]);
    vehicle.groupeName = paramGroupe[1];

    let message = ""

    let index = groupesTB.findIndex(elt => elt.id === vehicle.groupeId);
    if (index < 0) {
      message += "Groupe does not exist" + ";"
    }

    index = vehiclesTB.findIndex(
      elt => elt.marque.trim().toLowerCase() === vehicle.marque.trim().toLowerCase())
    if (index >= 0 && vehiclesTB[index].id !== id){
      return ("Marque already exist");
    }
    return message;
  }

  validateInsurance(insurance: any): string {

    let paramVehicle = insurance.vehicleMarque.split(",");

    if (paramVehicle.length < 2)
      return "Choose a vehicle"

    insurance.vehicleId = Number.parseInt(paramVehicle[0]);
    insurance.vehicleMarque = paramVehicle[1];

    let index = vehiclesTB.findIndex(elt => elt.id === insurance.vehicleId);
    if (index < 0) {
      return "Vehicle does not exist"
    }

    return "";
  }

  validateVignette(vignette: any): string {

    let paramVehicle = vignette.vehicleMarque.split(",");

    if (paramVehicle.length < 2)
      return "Choose a vehicle"

    vignette.vehicleId = Number.parseInt(paramVehicle[0]);
    vignette.vehicleMarque = paramVehicle[1];

    let index = vehiclesTB.findIndex(elt => elt.id === vignette.vehicleId);
    if (index < 0) {
      return "Vehicle does not exist"
    }

    return "";
  }


  validatePrivilege(privilege: any): string {


    let index = usersTB.findIndex(elt => elt.id === privilege.userID);
    if (index < 0) {
      return "User does not exist"
    }

    index = privilegesTB.findIndex(
      elt => elt.moduleName.trim().toLowerCase() === privilege.moduleName.trim().toLowerCase()
        && elt.userID === privilege.userID)

    if (index >= 0)
      return ("Privilege already exist for this module : " + privilege.moduleName);

    return "";
  }

  validateVoucher(voucher: any): string {

    let paramVehicle = voucher.vehicleMarque.split(",");

    if (paramVehicle.length < 2)
      return "Choose a vehicle"

    voucher.vehicleId = Number.parseInt(paramVehicle[0]);
    voucher.vehicleMarque = paramVehicle[1];

    let message = "";
    let index = vehiclesTB.findIndex(elt => elt.id === voucher.vehicleId);
    if (index < 0) {
      message += "Vehicle does not exist" + ";"
    }

    let paramEmployee = voucher.employeeFullname.split(",");

    if (paramEmployee.length < 2)
      return "Choose a employee"

    voucher.employeeId = Number.parseInt(paramEmployee[0]);
    voucher.employeeFullname = paramEmployee[1];

    index = usersTB.findIndex(elt => elt.id === voucher.employeeId);
    if (index < 0) {
      message += "Employee does not exist" + ";"
    }

    let paramProvider = voucher.providerFullname.split(",");

    if (paramProvider.length < 2)
      return "Choose a provider"

    voucher.providerId = Number.parseInt(paramProvider[0]);
    voucher.providerFullname = paramProvider[1];

    index = providersTB.findIndex(elt => elt.id === voucher.providerId);
    if (index < 0) {
      message += "Provider does not exist" + ";"
    }

    return message;
  }

  validateMission(mission: MissionCreate): string {

    let paramVehicle = mission.vehicleMarque.split(",");

    if (paramVehicle.length < 2)
      return "Choose a vehicle"

    let message = "";

    mission.vehicleId = Number.parseInt(paramVehicle[0]);
    mission.vehicleMarque = paramVehicle[1];


    let index = vehiclesTB.findIndex(elt => elt.id === mission.vehicleId);
    if (index < 0) {
      message += "Vehicle does not exist" + ";"
    }

    if (mission.sourceLocation.length == 0) {
      message += "Choose a valid source location " + ";"
    }

    if (mission.destinationLocation.length == 0) {
      message += "Choose a valid destination location " + ";"
    }
    let paramEmployee = mission.employeeFullname.split(",");

    if (paramEmployee.length < 2)
      return "Choose a employee"

    mission.employeeId = Number.parseInt(paramEmployee[0]);
    mission.employeeFullname = paramEmployee[1];

    index = usersTB.findIndex(elt => elt.id === mission.employeeId);
    if (index < 0) {
      message += "Employee does not exist"
    }

    let paramProvider = mission.driverFullname.split(",");

    if (paramProvider.length < 2)
      return "Choose a driver"

    mission.driverId = Number.parseInt(paramProvider[0]);
    mission.driverFullname = paramProvider[1];

    index = usersTB.findIndex(elt => elt.id === mission.driverId);
    if (index < 0) {
      message += "Driver does not exist" + ";"
    }

    return message;
  }

  defaultGroupe(): GroupeRead {
    return {
      id: 0,
      name: "",
      description: "",
    }
  }

  defaultVehicle(): VehicleRead {
    return {
      id: 0,
      groupeId: 0,
      groupeName: "",
      marque: "",
      seatNbr: 0,
      datePurchase: "",
      imageUrl: ""
    }
  }

  defaultInsurance(): InsuranceRead {
    return {
      id: 0,
      vehicleId: 0,
      vehicleMarque: "",
      nameAgence: "",
      price: 0,
      dateLimiteUsage: ""
    }
  }
  defaultProvider(): ProviderRead {
    return {
      id: 0,
      fullname: "",
      email: "",
      matricule: ""
    }
  }
  defaultUser(): UserRead {
    return {
      id: 0,
      fullname: "",
      roleName: "",
      isSuperAdmin: false,
      email: "",
      phone: "",
      imageUrl: "",
    }
  }
  defaultVignette(): VignetteRead {
    return {
      id: 0,
      vehicleId: 0,
      vehicleMarque: "",
      type: "",
      price: 0,
      dueDate: "",
    }
  }
  defaultVoucher(): VoucherRead {
    return {
      id: 0,
      vehicleId: 0,
      vehicleMarque: "",
      totalLiter: 0,
      employeeId: 0,
      employeeFullname: "",
      providerId: 0,
      providerFullname: "",
      dateLimiteUsage: ""
    }
  }

  defaultMission(): MissionRead {
    return {
      id: 0,
      vehicleId: 0,
      vehicleMarque: "",
      employeeId: 0,
      employeeFullname: "",
      driverId: 0,
      driverFullname: "",      
      status: "",
      sourceLocation: "",
      destinationLocation: "",
    }
  }


}

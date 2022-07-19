import { VehicleRead } from "./vehicle.modal";

export interface InsuranceModal {

    id: number,

    vehicleId: number,

    nameAgence: string,

    price: number,

    dateStartUsage: string,

    dateLimiteUsage: string,

    vehicleMarque: string,

}

export interface InsuranceCreate {

    vehicleId: number,

    nameAgence: string,

    price: number,

    dateStartUsage: string,

    dateLimiteUsage: string,

    vehicleMarque: string,

}

export interface InsuranceRead {

    id: number,

    vehicleId: number,

    nameAgence: string,

    price: number,

    dateLimiteUsage: string,

    vehicleMarque: string,

}

export interface InsuranceDetail {

    id: number,

    vehicleId: number,

    vehicleMarque: string,

    nameAgence: string,

    price: number,

    dateStartUsage: string,

    dateLimiteUsage: string,

    vehicle: VehicleRead

}

export interface InsuranceUpdate {

    id: number,

    vehicleId: number,

    nameAgence: string,

    price: number,

    dateStartUsage: string,

    dateLimiteUsage: string,

    vehicleMarque: string,

}

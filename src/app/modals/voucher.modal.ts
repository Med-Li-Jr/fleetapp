import { VehicleRead } from "./vehicle.modal";

export interface VoucherModal {

    id: number;

    employeeId: number;

    vehicleId: number;

    providerId: number;

    // status: string;

    price: number;

    totalLiter: number;

    dateStartUsage: string;

    dateLimiteUsage: string;

    employeeFullname: string;

    vehicleMarque: string;

    providerFullname: string;

}

export interface VoucherCreate {

    employeeId: number;

    vehicleId: number;

    providerId: number;

    // status: string;

    price: number;

    totalLiter: number;

    dateStartUsage: string;

    dateLimiteUsage: string;

    employeeFullname: string;

    vehicleMarque: string;

    providerFullname: string;

}

export interface VoucherRead {
    id: number;

    employeeId: number;

    vehicleId: number;

    providerId: number;

    // status: string;

    totalLiter: number;

    dateLimiteUsage: string;

    employeeFullname: string;

    vehicleMarque: string;

    providerFullname: string;

}

export interface VoucherDetail {

    id: number;

    employeeId: number;

    vehicleId: number;

    providerId: number;

    // status: string;

    price: number;

    totalLiter: number;

    dateStartUsage: string;

    dateLimiteUsage: string;

    vehicleMarque: string;

    vehicle: VehicleRead 

    employeeFullname: string;

    providerFullname: string;

}

export interface VoucherUpdate {

    id: number;

    employeeId: number;

    vehicleId: number;

    providerId: number;

    // status: string;

    price: number;

    totalLiter: number;

    dateStartUsage: string;

    dateLimiteUsage: string;

    employeeFullname: string;

    vehicleMarque: string;

    providerFullname: string;

}

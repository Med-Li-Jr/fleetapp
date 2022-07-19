import { VehicleRead } from "./vehicle.modal";

export interface VignetteModal {

    id: number;

    vehicleId: number;

    type: string;

    price: number;

    dueDate: string;

    vehicleMarque: string;

}

export interface VignetteCreate {

    vehicleId: number;

    type: string;

    price: number;

    dueDate: string;

    vehicleMarque: string;

}

export interface VignetteRead {

    id: number;

    vehicleId: number;

    type: string;

    price: number;

    dueDate: string;

    vehicleMarque: string;

}

export interface VignetteDetail {

    id: number;

    vehicleId: number;

    type: string;

    price: number;

    dueDate: string;

    vehicleMarque: string;

    vehicle: VehicleRead 

}

export interface VignetteUpdate {

    id: number;

    vehicleId: number;

    type: string;

    price: number;

    dueDate: string;

    vehicleMarque: string;

}

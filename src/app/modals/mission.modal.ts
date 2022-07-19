import { UserRead } from "./user.modal";
import { VehicleRead } from "./vehicle.modal";

export interface MissionModal {

    id: number;

    employeeId: number;

    vehicleId: number;

    driverId: number;

    status: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    dateStart: string;

    dateEnd: string;

    employeeFullname: string;

    vehicleMarque: string;

    driverFullname: string;

}

export interface MissionCreate {

    employeeId: number;

    vehicleId: number;

    driverId: number;

    status: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    dateStart: string;

    dateEnd: string;

    employeeFullname: string;

    vehicleMarque: string;

    driverFullname: string;

}

export interface MissionRead {

    id: number;

    employeeId: number;

    vehicleId: number;

    driverId: number;

    status: string;

    sourceLocation: string;

    destinationLocation: string;

    employeeFullname: string;

    vehicleMarque: string;

    driverFullname: string;

}

export interface MissionDetail {

    id: number;

    employeeId: number;

    vehicleId: number;

    driverId: number;

    status: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    dateStart: string;

    dateEnd: string;

    employeeFullname: string;

    driverFullname: string;

    vehicleMarque: string;

    employee: UserRead;

    driver: UserRead;

    vehicle: VehicleRead 
}

export interface MissionUpdate {

    id: number;

    employeeId: number;

    vehicleId: number;

    driverId: number;

    status: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    dateStart: string;

    dateEnd: string;

    employeeFullname: string;

    vehicleMarque: string;

    driverFullname: string;

}

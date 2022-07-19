
export interface TracerModal {

    id: string;

    missionId: number;

    location: string;

    latitude: number;

    longitude: number;

    currentSpeed: number;

    vehicleId: number;

    vehicleMarque: string;

    vehicleImg: string;

    driverImg: string;

    driverId: number;

    driverFullname: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    indexCurrentCoord: number;

    coordinates: any

}

export interface TracerRead {

    id: string;

    missionId: number;

    location: string;

    latitude: number;

    longitude: number;

    currentSpeed: number;

    vehicleId: number;

    vehicleMarque: string;

    driverId: number;

    driverFullname: string;

    sourceLatitude: number;

    sourceLongitude: number;

    sourceLocation: string;

    destinationLatitude: number;

    destinationLongitude: number;

    destinationLocation: string;

    coordinates: any

}
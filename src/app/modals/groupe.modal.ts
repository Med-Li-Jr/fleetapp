import { VehicleRead } from "./vehicle.modal";

export interface GroupeModal {
    id: number,
    name: string;
    description: string;
}

export interface GroupeCreate {
    name: string;
    description: string;
}

export interface GroupeRead {
    id: number,
    name: string;
    description: string;
}

export interface GroupeDetail {
    id: number,
    name: string;
    description: string;
    allVehicles: VehicleRead[];
}

export interface GroupeUpdate {
    id: number,
    name: string;
    description: string;
}

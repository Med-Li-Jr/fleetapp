import { InsuranceRead } from "./insurance.modal";
import { VignetteRead } from "./vignette.modal";
import { VoucherRead } from "./voucher.modal";

export interface VehicleModal {

    id: number;

    groupeId: number;

    groupeName: string;

    marque: string;

    seatNbr: number;

    // status: string;

    datePurchase: string;

    dateStartUsage: string;

    dateLimiteUsage: string;

    imageUrl: string;

}

export interface VehicleCreate {

    groupeName: string;

    groupeId: number;

    marque: string;

    seatNbr: number;

    // status: string;

    datePurchase: string;

    dateStartUsage: string;

    dateLimiteUsage: string;

    imageVehicle: any;

}

export interface VehicleRead {

    id: number;

    groupeId: number;
    
    groupeName: string;

    marque: string;

    seatNbr: number;

    // status: string;

    imageUrl: string;

    datePurchase: string;

}

export interface VehicleDetail {

    id: number;

    groupeId: number;

    groupeName: string;

    marque: string;

    seatNbr: number;

    // status: string;

    datePurchase: string;

    dateStartUsage: string;

    dateLimiteUsage: string;

    imageUrl: string;

    allInsurances: InsuranceRead[];

    allVignettes: VignetteRead[];

    allVouchers: VoucherRead[]

}

export interface VehicleUpdate {

    id: number;

    groupeName: string;

    groupeId: number;

    marque: string;

    seatNbr: number;

    // status: string;

    datePurchase: string;

    dateStartUsage: string;

    dateLimiteUsage: string;

    imageVehicle: any;

}

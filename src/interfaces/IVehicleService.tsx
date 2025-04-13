import { IServiceWithDate } from "./IService";
import { IVehicle } from "./IVehicle";

export interface IVehicleServiceBase {
    id: number;
    vehicleId: number;
    serviceId: number;
    serviceDate: string;
}

export interface IVehicleServiceWithVehicleName extends IVehicleServiceBase {
    vehicleName: string;
}

export interface IServicedVehicle {
    id: number;
    vehicleId: number;
    vehicleName: string;
    vehicleProduction: number;
    serviceDate: string;
}

export interface IServiceOfVehicle {
    id: number,
    serviceId: number,
    title: string,
    description?: string,
    serviceDate: string,
}

export interface IVehicleService {
    id: number;
    vehicle: IVehicle;
    services: IServiceWithDate[];
}
export interface IVehicle {
    id: number;
    model: string;
    brand: string;
    production: number;
    color?: string;
    categoryName: string;
}

export interface IVehicleToPost {
    id: number;
    model: string;
    brand: string;
    production: number;
    color?: string;
    vehicleCategyId: number;
}

export interface IVehicleSelector {
    id: number;
    vehicleName: string;
    production: number;
}
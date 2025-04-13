export interface IFueling {
    id: number;
    vehicleId: number; 
    vehicleName: string;
    fuelingDate: string;
    quantity: number;
    price?: number;
}

export interface IFuelingForPost {
    id: number;
    vehicleId: number;
    fuelingDate: string;
    quantity: number;
    price?: number;
}
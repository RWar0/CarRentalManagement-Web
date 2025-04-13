export interface IRental {
    id: number;
    customerId: number;
    customerName: string;
    vehicleId: number;
    vehicleName: string;
    beginDate: string;
    endDate: string;
}

export interface IRentalForPost {
    id: number;
    customerId: number;
    vehicleId: number;
    beginDate: string;
    endDate: string;
}

export interface IFollowingRental {
    id: number;
    customerFullName: string;
    vehicleName: string;
    beginDate: string;
}

export interface IRentalChart {
    month: number;
    quantity: number;
}
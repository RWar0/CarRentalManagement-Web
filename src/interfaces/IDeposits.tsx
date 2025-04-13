export interface IDepositForPost {
    id: number;
    rentalId: number;
    price: number;
    status: string;
}

export interface IDeposit extends IDepositForPost {
    beginDate: string;
    endDate: string;
    customerId: number;
    customerName: string;
    vehicleId: number;
    vehicleName: string;
}


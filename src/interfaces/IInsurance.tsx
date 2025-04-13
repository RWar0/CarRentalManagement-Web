export interface IInsurance {
    id: number;
    vehicleId: number;
    vehicleName: string;
    beginDate: string;
    endDate: string;
}

export interface IInsuranceForPost {
    id: number;
    vehicleId: number;
    beginDate: string;
    endDate: string;
}
export interface IWarning {
    id: number;
    customerId: number;
    customerName: string;
    description: string;
    warningDate: string;
}

export interface IWarningForPost {
    id: number;
    customerId: number;
    description: string;
    warningDate: string;
}
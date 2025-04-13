export interface ICustomer {
    id: number;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    placeOfBirth: string;
    pesel: string;
}

export interface ICustomerSelector {
    id: number;
    customerName: string;
}
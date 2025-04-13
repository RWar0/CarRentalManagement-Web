export interface IService {
    id: number;
    title: string;
    description?: string;
}

export interface IServiceWithDate {
    id: number;
    serviceId: number;
    title: string;
    description?: string;
    serviceDate: string;
}
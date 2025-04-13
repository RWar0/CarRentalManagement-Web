export interface IPaymentForPost {
    id: number;
    invoiceId: number;
    paymentTotal: number;
    isFinalized: boolean;
    finalizationDate?: string | null;
}

export interface IPayment extends IPaymentForPost {
    invoiceTitle: string;
}

export interface IPaymentForPostCombined {
    id: number;
    invoiceId?: number;
    invoiceTitle: string;
    paymentTotal?: number;
    isFinalized: boolean;
    finalizationDate?: string | null;
}
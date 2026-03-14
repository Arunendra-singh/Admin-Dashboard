export interface ISalesTaxData {
    quantity: number;
    amount: number;
    itemCode: string;
}

export type salesTaxPayload = ISalesTaxData[];

export interface IGetTaxFromTaxJar {
    statuscode: number;
    message: string;
    data: [];
}

export type TaxJarAPIPayload = TaxJarAPIObject[];

export interface TaxJarAPIObject {
    line_items: [
        {
            id: number,
            quantity: number,
            unit_price: number
        }],
    to_street: string,
    to_city: string,
    to_state: string,
    to_zip: string,
    to_country: string,
    amount: number,
    shipping: 0
}

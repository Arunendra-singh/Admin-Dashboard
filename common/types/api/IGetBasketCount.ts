export interface IBasketCountResponse {
    statuscode: number;
    message: string;
    data: CountData;
}

export interface CountData {
    basketproductcount: number;
    wishlistcount: number;
    comparecount: number;
    presentationcount: number;
}

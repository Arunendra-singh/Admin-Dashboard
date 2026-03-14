export interface IGetPriceEditJson {
    statuscode: number;
    message: string;
    data: IGetPriceEditJsonData;
}
export interface IGetPriceEditJsonData {
    discountdercent: number;
    expdate: any;
    isenabledstrikeprice: boolean;
    priceedittype: string;
}

export interface IGetPurchaseOrderData {
    Filters: Filter[];
}
export interface Filter {
    FilterFromDateName: string;
    FilterFromDateValue: string;
    FilterFromPoNoValue: string;
    FilterToDateName: string;
    FilterToDateValue: string;
    SortName: string;
    ViewName: string;
    pageNo: number;
}
export interface IGetPurchaseOrderResponse {
    statuscode: number;
    message: string;
    data: IGetPurchaseOrderResData;
}
export interface IGetPurchaseOrderResData {
    fileGuid: string;
    fileName: string;
}

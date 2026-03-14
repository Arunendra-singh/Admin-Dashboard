export interface IProductImprintResponse {
    statuscode: number;
    message: string;
    data: IProductImprintData;
};

export interface IProductImprintData {
    productname: string,
    productguid: string,
    productcode: string,
    imprintmethodvalue: string,
    productdetailurl: string
};

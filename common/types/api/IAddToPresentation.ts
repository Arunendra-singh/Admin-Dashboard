export interface IAddToPresentation {
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    isaddedinpresentation: boolean;
    productcode: boolean;
}

export type ProductPresentationPayload = ProductPresentationObject[];

export interface ProductPresentationObject {
    ProductGuid: string;
    ProductCode: string;
    CurrencyGuid: string;
    SkuGuid: string;
    CatalogGuid: string;
}

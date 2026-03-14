export interface IAddToPresentationCatalog {
    statuscode: number;
    message: string;
    data: Data;
}
export interface Data {
    isaddedinpresentation: boolean;
    productcode: boolean;
}
export type ProductPresentationCatalogPayload = ProductPresentationCatalogObject[];
export interface ProductPresentationCatalogObject {
    UserDetails: UserDetail;
    ProductCodes: string[];
}
export interface UserDetail {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    Address: string;
    Phone: string;
    UserType: string;
    UserGuid: string;
}

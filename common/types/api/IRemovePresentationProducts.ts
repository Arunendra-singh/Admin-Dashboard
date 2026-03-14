export interface IRemovePresentationProducts {
    statuscode: number;
    message: string;
    data: [];
}

export type PresentationRemoveProductPayload = PresentationRemoveProductObject[];

export interface PresentationRemoveProductObject {
    CatalogGuid: string;
    ProductGuid: string;
}

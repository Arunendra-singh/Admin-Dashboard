export interface ISaveEditPresentationProducts {
    statuscode: number;
    message: string;
    data: [];
}

export type PresentationEditSavePayload = PresentationEditSaveObject[];

export interface PresentationEditSaveObject {
    CatalogGuid: string;
    CatalogProducts: [];
    CustomerGroupGuids: string;
}

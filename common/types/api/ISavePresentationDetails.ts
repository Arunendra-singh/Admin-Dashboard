export interface ISavePresentationDetails {
    statuscode: number;
    message: string;
    data: [];
}

export type PresentationDetailsPayload = PresentationDetailsObject[];

export interface PresentationDetailsObject {
    CatalogGuid: string;
    VirtualSampleLogo: string;
    MasterColor: [];
    CatalogProducts: [];
    CatalogPages: [];
    Option: string;
    BannerText: string;
    DisclaimerText: string;
    IsRemoveWhiteBackground: boolean;
    CatalogThumbnail: string;
    CustomerGroupGuids: string;
    NoDecoratingPrice: boolean;
}

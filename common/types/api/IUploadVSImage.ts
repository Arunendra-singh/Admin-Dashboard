export interface IUploadPayload {
    CatalogGuid: string;
    WebSiteGuid: string;
    productskus: Iprodcutskudata[];
}
export interface Iprodcutskudata {
    Base64Img: any;
    Curvature: number;
    ImprintMethodName: string;
    LocationJson: string;
    LogoName: string;
    LogoURL: string;
    Rotation: number;
    SKUGuid: string;
    SKUImage: string;
    SKUImage_OG: string;
    SKUURL: string;
    Samelogo: boolean;
}

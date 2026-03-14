export interface ISaveNewTemplated {
    statuscode: number;
    message: string;
    data: data[];
}
export interface data {
    websiteguid: string;
    languageguid: string;
    templateguid: string;
    templatename: string;
    backcover: string;
    backcoverguid: string;
    frontcover: string;
    frontcoverguid: string;
    header: string;
    headerguid: string;
    footer: string;
    footerguid: string;
    frontinner: [];
    backinner: [];
    orientation: string;
    type: string;
    backgroundimage: string;
    backgroundimageguid: string;
    layoutguid: string;
    layoutimage: string;
    product: Int16Array;
    flyerthumbimage: [];
    flyerthumbimageguid: [];
    layoutlist: [];
    iscdmincreated: boolean;
    pagesize: Int16Array;
    pageno: Int8Array;
    custbackgroundimage: [];
    backbuttoncolor: string;
}
export type SaveCatelogPayload = SaveCatelogObject[];

export interface SaveCatelogObject {
    TemplateName: string;
    IsActive: boolean;
    BackCover: string;
    FrontCoverGuid: string;
    FrontCover: string;
    Header: string;
    HeaderGuid: string;
    Footer: string;
    FooterGuid: string;
    FrontInner: any;
    BackInner: any;
    Orientation: string;
    Type: string;
    BackgroundImage: string;
    BackgroundImageGuid: string;
    CustBackgroundImage: any;
    LayoutGuid: string;
    LayoutImage: string;
    Product: number
    FlyerThumbImage: string;
    FlyerThumbImageGuid: string;
    LayoutList: LayoutListobj[];
    BackButtonColor: any;
}
export interface LayoutListobj {
    layoutGuid: string;
    pageHTML: any;
    type: string;
    product: number;
    variantImage: string;
    fileName: string;
    name: string;
    isActive: boolean;
    priceNotSupported: string
}

export interface IFlyerListingAsyncResponse {
    statuscode: number;
    message: string;
    data: IFlyerListingAsyncData;
}

export interface IFlyerListingAsyncData {
    flyerdataList: FlyerdataList[];
    pageNo: string;
    pageSize: number;
    pageRows: number;
    pageColumn: number;
    viewAll: string;
    salesCount: number;
    fileVersion: string;
    hideFlyerType: string;
}
export interface FlyerdataList {
    salesFlyerGuid: string;
    websiteGuid: string;
    languageGuid: string;
    flyerType: string;
    flyerName: string;
    flyerImage: string;
    flyerPDF: string;
    imageAlt: string;
    sequence: number;
    expirationDateUTS: any;
    filters: any;
    multipleFlyerImage: any;
    keywords: string[];
    url: string;
    isActive: boolean;
    ipAddress: string;
    createdBy: string;
    createdDateUtc: string;
    modifiedBy: string;
    modifiedDateUtc: string;
}

export interface IFlyerListingAsyncProps {
    Filters: Filter[];
}

export interface Filter {
    PageNo: string;
    PageRows: number;
    PageColumns: number;
    ViewAll: string;
    Type: string;
    IsFlyerBasedonDDL: string;
    HideFlyerType: string;
    SortbyCreateddatedesc: boolean;
}

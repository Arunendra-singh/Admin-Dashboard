export interface ISaveRecentlyViewedAPIResponse {
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    recentlyviewedproducts: Recentlyviewedproducts;
    featuresettings: Featuresettings;
}

export interface Recentlyviewedproducts {
    websiteguid: string;
    userguid: string;
    sessionid: string;
    productguid: string;
    viewdateutc: string;
    viewdateutcunix: number;
}

export interface Featuresettings {
    iscamelianlikeisenable: boolean;
    isoptimizesearch: boolean;
    popularproductcount: boolean;
}

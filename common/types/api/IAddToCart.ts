export interface IAddToCart {
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    featureSettings: FeatureSettings;
    resources: Resources;
    globalSettings: GlobalSettings;
}

export interface FeatureSettings {
    iscompassenable: boolean;
    isgillbebcoenable: boolean;
    isnetsuitfeatureenable: boolean;
    iscustomizeandorder: boolean;
    iscustomizeandorderqna: boolean;
    issetupchargeproductlevel: boolean;
    issingleproductorder: boolean;
    iscategorizationofproductsforfreight: boolean;
    isaddtocartfromvsenable: boolean;
    ismaximumquantityisone: boolean;
    isnewartworkstatus: boolean;
    lmsintegrations: boolean;
    isrfqenabled: boolean;
}

export interface Resources {
    maxqtyerrormsg: string;
    setupcharge: string;
}

export interface GlobalSettings {
    ewizaiwebsiteguid: string;
}

export type ProductBasketDetailVMPayload = ProductBasketDetailVM[];

export interface ProductBasketDetailVM {
    UserGuid: string;
    SessionGuid: string;
    EmailAddress: string;
    ProductGuid: string;
    ProductCode: string;
    SKUGuid: string;
    Quantity: string;
    PricingGuid: string;
    CurrencyGuid: string;
    WebsiteGuid: string;
    CustomField: string;
    DecimalPrecision: string;
    CustomField2: string;
    PricingName: string;
    ImprintMethodGuid: string;
    ImprintLocations: ImprintLocation[];
    NumberOfImprintLocations: string;
    NumberOfImprintColors: string;
}

export interface ImprintLocation {
    ImprintLocationGuid: string;
    ImprintColors: string[];
}

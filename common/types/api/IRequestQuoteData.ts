// IRequestQuoteData.ts
export interface IRequestQuotePayload {
    ProductName: string;
    ProductCode: string;
    ImageName: string;
    SelectedImage: string;
    Quantity: string;
    IsAuthorizedPromoDistributor: boolean;
    ASI: string;
    PPAI: string;
    SAGE: string;
    UPIC: string;
    PPPC: string;
    Note: string;
    ProductGuid: string;
    CompanyName: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    color: string;
    ExtensionNo: string;
    Phone: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    CountryGUID: string;
    Zip: string;
    RequestQuoteItems: RequestQuoteItem[];
    Source: any;
    Decoration: string;
    DoYouNeed: string;
    CompanyAddress: string;
    Companyzipcode: string;
    IsShipzipcode: string;
    UserGuid: string;
    CompanyCity: string;
    password: string;
    NeedQuoteby: string;
    CaptchaResponse: string;
}

export interface RequestQuoteItem {
    ProductGuid: string;
    Color: string;
    Quantity: number;
    ImageName: string;
    ProductName: string;
    ProductCode: string;
    Note: string;
    SKU: string;
    ProductAliasName: string;
    ImprintMethodGuid: string;
    ImprintMethodName: string;
    ImprintLocations: ImprintLocations[];
    NumberOfImprintColors: number;
    NumberOfImprintLocations: number;
    PricingGuid: string;
    Price: number;
    TotalProductOrderAmount: number;
    PriceToDisplay: number;
    TotalPrice: number;
    ChargesList: string[];
}

export interface ImprintLocations {
    ImprintLocationGuid: string;
    ImprintLocationName: string;
    ImprintColors: string[];
    ImprintColorGuid: string[];
}

export interface IRequestQuoteResponse {
    statuscode: number;
    statusCode: number;
    message: string;
    data: any;
}

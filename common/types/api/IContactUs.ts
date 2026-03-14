export interface IContactUsPorps {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    CompanyName: string;
    Phone: string;
    Fax: string;
    Address: string;
    City: string;
    State: string;
    SAGE: string;
    Zip: string;
    CountryGUID: string;
    ASI: string;
    PPAI: string;
    UPIC: string;
    PPPC: string;
    FreightTypeName: string;
    ShipperNumber: string;
    Message: string;
    ContactGuid: string;
    WebsiteGuid: string;
    ContactType: string;
    CountryName: string;
    ExtensionNo: string;
    AccountNumber: string;
    AptSuite: string;
    OtherAssociation: string;
    Quantity: string;
    CaptchaResponse: string;
}
export interface IContactUsResponse {
    statuscode: number;
    message: string;
    data: any;
}

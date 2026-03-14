export interface EditProfileResponse {
    statuscode: number;
    message: string;
}

export interface EditProfilePayload {
    RegistrationType: string;
    CompanyName: string;
    CompanyWebsite: string;
    Industry: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    Phone: string;
    Fax: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    CountryGUID: string;
    Zip: string;
    IsSubScribed: boolean;
    IsAuthorizedPromoDistributor: boolean;
    IsActive: boolean;
    CreatedBy: string;
    UserGuid: string;
    IsApproved: boolean;
    CustomField2: string;
    PPAI: string;
    SAGE: string;
    UPIC: string;
    Customer_NS_ID: string;
    PPPC: string;
    Password: string;
    PrimaryContact: any[];
    CaptchaResponce: string;
    ExtensionNo: string;
    OtherAssociation: string;
    OtheruserType: string;
    CustomerNumber: string;
    TaxExemptionFileName: string;
    UserName: string;
}

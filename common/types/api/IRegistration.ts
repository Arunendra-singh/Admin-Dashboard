export interface IRegistrationPorps {
    OtherUserType: string;
    RegistrationType: string;
    ArrayReferralGuid: string[];
    CompanyName: string;
    CompanyWebsite: string;
    VATOrGSTNumber: string;
    Industry: string;
    Gender: string;
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
    CustomField1: string;
    CustomField2: string;
    ASI: string;
    PPAI: string;
    SAGE: string;
    UPIC: string;
    PPPC: string;
    IsAuthorizedPromoDistributor: boolean;
    IsResetActive: boolean;
    IsActive: boolean;
    CreatedBy: string;
    UserName: string;
    IsApproved: boolean;
    ExtensionNo: string;
    AptSuite: string;
    OtherAssociation: string;
    JobTitle: string;
    TaxExemptionFileName: string;
    NumberOfUsers: number;
    CallFromNetSuite: boolean;
    CaptchaResponse: string;
}

export interface IRegistrationResponse {
    statuscode: number;
    message: string;
}

export interface INewsLetterSubscriptionProps {
    NewsLetterGuid: string;
    WebsiteGuid: string;
    IsSubScribed: boolean;
    FirstName: string;
    LastName: string;
    IsRegistered: boolean;
    EmailAddress: string;
    State: string;
    CountryGUID: string;
    CompanyName: string;
}

export interface INewsLetterSubscriptionResponse {
    statusCode: number;
    message: string;
    data: INewsLetterSubscriptionData;
}

export interface INewsLetterSubscriptionData {
    featuresettings: Featuresettings;
    resources: Resources;
}

export interface Featuresettings {
    syncToConstantContactApi: boolean;
}

export interface Resources {
    success: string;
    already: string;
    error: string;
}

export interface IGetOrderSampleData {
    UserGuid: string;
    WebsiteGuid: string;
    LanguageGuid: string;
    DefaultLanguageGuid: string;
    RequestType: string;
    SampleType: string;
    FilterProductName: string;
    FilterProductValue: string;
    FilterFromDateName: string;
    FilterFromDateValue: string;
    FilterToDateName: string;
    FilterToDateValue: string;
    FilterEmail: string;
    FilterEmailValue: string;
    FilterStatusName: string;
    FilterStatusValue: string;
    FilterStatusNameOrder: string;
    FilterStatusValueOrder: string;
    FilterFirstName: string;
    FilterFirstNameValue: string;
    FilterLastName: string;
    FilterLastNameValue: string;
    FilterPhoneNumber: string;
    FilterPhoneNumberValue: string;
    FilterProductCode: string;
    FilterProductCodeValue: string;
    IsCustomShow: boolean;
    IsRequestQuoteWithoutDetail: boolean;
}

export interface IGetOrderSampleResponse {
    statuscode: number;
    message: string;
    data: IGetOrderSampleResData;
}

export interface IGetOrderSampleResData {
    fileGuid: string;
    fileName: string;
}

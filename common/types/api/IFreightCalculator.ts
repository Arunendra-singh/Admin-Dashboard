export interface FreightCalcultorResponse {
    statuscode: number;
    message: string;
}

export interface FreightCalcultorPayload {
    WebSiteGuid: string,
    LanguageGuid: string,
    CurrencyGuid: string,
    DefaultLanguageGuid: string,
    Websiteurl: string,
    ProductCode: string,
    Quantity: number,
    CountryCode: string,
    PostalCode: string,
    StateOrProvinceCode: string,
    isResidential: boolean,
    DisplayShipmentWeightInboxWeight: boolean,
    CartonMaxQuantity: boolean
}

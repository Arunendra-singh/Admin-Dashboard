export interface IGetWebsiteCurrenciesResponse {
    statuscode: number;
    message: string;
    data: IGetWebsiteCurrenciesData;
}

export interface IGetWebsiteCurrenciesData {
    websitecurrencies: Websitecurrencies;
    resource: Resource;
}

export interface Websitecurrencies {
    currencyguids: Currencyguid[];
}

export interface Currencyguid {
    currencyguid: string;
    currencyname: string;
    currencycode: string;
    currencysymbol: string;
}

export interface Resource {
    uscurrencyname: string;
    canadacurrencyname: string;
    indiancrrencyname: string;
    australiancrrencyname: string;
    eurocrrencyname: string;
    britishcrrencyname: string;
    swissfranccrrencyname: string;
    yencrrencyname: string;
}

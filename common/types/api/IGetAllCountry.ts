export interface IGetAllCountryResponse {
    statuscode: number;
    message: string;
    data: CountryData[];
}

export interface CountryData {
    countryguid: string;
    countryname: string;
    countrycode: string;
    currencyguid: string;
    displayorder: number;
    isdcode: string;
    isactive: boolean;
    ipaddress: string;
    createdby: string;
    createddateutc: string;
    modifiedby: string;
    modifieddateutc: string;
    createddateutcunix: number;
    modifieddateutcunix: number;
}

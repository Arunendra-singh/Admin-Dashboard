export interface IAllCountryResponse {
    statuscode: number
    message: string
    data: IAllCountry[]
}

export interface IAllCountry {
    countryguid: string
    countryname: string
    countrycode: string
    currencyguid: string
    displayorder: number
    isdcode: string
    isactive: boolean
    ipaddress: string
    createdby: string
    createddateutc: string
    modifiedby: string
    modifieddateutc: string
    createddateutcunix: number
    modifieddateutcunix: number
}

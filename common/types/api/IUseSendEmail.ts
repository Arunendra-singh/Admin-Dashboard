import { type MicroServices } from "../MicroServices";

export interface IUseSendEmail {
    statuscode: number
    message: string
    data: Data
}

export interface Data {
    websiteguid: any
    languageguid: any
    loggingguid: string
    fromname: string
    fromemail: string
    message: string
    productguid: string
    recipientdetail: Recipientdetail[]
    skuguid: any
    variantsize: string
    productcode: string
    strikepricecolor: any
    discountpricecolor: any
    hidediscountpricecode: boolean
    showsaveprice: string
    body: any
}

export interface Recipientdetail {
    recipientname: string
    recipientemail: string
}

export interface IUserSendMailProps {
    postData: string
    endPoint: string
    baseUrl: keyof MicroServices
    serviceName: string
}

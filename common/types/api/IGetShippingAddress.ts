export interface IGetShippingAddressResponse {
    statuscode: number;
    message: string;
    data: IGetShippingAddressData;
}

export interface IGetShippingAddressData {
    addresscount: number;
    checkshippingname: boolean;
    shippingdetails: Shippingdetail[];
    billingaddress: any;
    globalsettings: any;
    featuresettings: any;
    resources: Resources;
}

export interface Shippingdetail {
    shippingname: string;
    shippingfirstname: string;
    shippinglastname: string;
    shippingemailid: string;
    addressguid: string;
    shippingcompanyname: string;
    shippingaddress1: string;
    shippingaddress2: string;
    shippingcity: string;
    shippingstate: string;
    shippingcountryguid: string;
    shippingzip: string;
    shippingextensionno: string;
    shippingphone: string;
    compassshippingaddressid: string;
    navshippingkey: any;
    isresidential: boolean;
    isdeleted: boolean;
}

export interface Resources {
    shippingname: string;
    shippingfirstname: string;
    shippinglastname: string;
    shippingzipcode: string;
    shippingemail: string;
    emptyshippingdata: string;
    deleteaddresssuccessmsg: string;
    deleteconfirm: any;
}

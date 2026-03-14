export interface IBillingAddressResponse {
    statusCode: number;
    message: string;
    data: IBillingAddress;
}

export interface IBillingAddress {
    billingAddressLists: BillingAddressList[];
}

export interface BillingAddressList {
    firstname: any;
    lastname: any;
    billingextensionno: any;
    billingphone: string;
    billingaddress1: string;
    billingaddress2: string;
    billingcity: string;
    billingstate: string;
    billingzip: string;
    billingcountry: string;
    billingfirstname: string;
    billinglastname: string;
    billingemailid: string;
    addressguid: string;
    billingname: string;
    isdefault: boolean;
}

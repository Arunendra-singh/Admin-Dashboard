export interface IThankYouResponse {
    statusCode: string;
    massage: string;
    data: IThankYou;
}

export interface IThankYou {
    resources: Resources;
    orderdetails: Orderdetails;
}

export interface Resources {
    "order.thankyou.couponapplied": string;
    "order.lable.packingcharges": string;
    "order.thankyou.transactionid": string;
    "order.thankyou.bankrefnumber": string;
    "order.thankyou.total": string;
    "order.thankyou.status": string;
    "order.labels.subtotal": string;
    "order.orderpopup.subheadingpara": string;
    "order.lable.deliverycharges": string;
    "order.label.freeproduct": string;
}

export interface Orderdetails {
    coupencode: string;
    deliverycharges: any;
    packingcharges: string;
    grandtotal: string;
    status: string;
    yoursavings: any;
    cgstheader: any;
    sgstheader: any;
    cgst: any;
    sgst: any;
    totalorderprice: string;
    ordernumber: string;
    emailid: string;
    subtotal: string;
    transactionid: string;
    paymentreference: string;
    additonaldeliveryinstruction: any;
    ordertype: string;
    products: Product[];
    shippinginformation: Shippinginformation;
    dealsdiscountamount: string;
    subscriptiondiscountamount: string;
    invoicefilepath: string;
}

export interface Product {
    quantity: number;
    price: number;
    productcode: string;
    productname: string;
    productdefaultimage: string;
    imagealttext: any;
    discountamount: any;
    totalamountdiscount: number;
    addons: any[];
}

export interface Shippinginformation {
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
    isresidential: boolean;
}

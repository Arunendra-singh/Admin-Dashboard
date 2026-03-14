export interface IReportOrderResponse {
    statusCode: number;
    message: string;
    data: IReportOrderData;
}

export interface IReportOrderData {
    gstpercentage: any;
    isgstapplicable: boolean;
    iscustomizeandorder: boolean;
    iscustomizeandorderqna: boolean;
    listorder: Listorder[];
    listordersreport: any;
    isdecimalprecisionadd: boolean;
    features: Features;
    globalsettings: Globalsettings;
}

export interface Listorder {
    orderguid: string;
    userguid: string;
    currencyguid: string;
    itemslist: Itemslist[];
    filters: any;
    addressguid: string;
    ordernumber: string;
    requestquotenumber: any;
    websiteguid: string;
    status: string;
    totalorderprice: number;
    emailid: string;
    companyname: string;
    shippingaddress: any;
    trackingdetais: any;
    shippinginformation: Shippinginformation;
    billinginformation: Billinginformation;
    currencycode: any;
    shipperno: Shipperno;
    callfromnetsuite: boolean;
    salesorder_ns_id: any;
    discountprice: number;
    tax: number;
    shippingcost: number;
    handlingcost: number;
    othercost: number;
    usapaytermid: string;
    usapaytermname: string;
    compassordernumber: any;
    promotioncode: any;
    marketingcode: any;
    imagealttext: any;
    promocodes: any;
    promotionid: any;
    basketfreightcharges: number;
    isreturned: boolean;
    basketfreightname: string;
    paymentmode: string;
    tokenizekey: any;
    cardnumber: any;
    expirydate: any;
    cardtype: any;
    promotionamount: any;
    shipviaid: string;
    shipviavalue: string;
    shoppingcartid: any;
    eventdate: any;
    deliverydate: any;
    ponumber: string;
    responcetext: any;
    saletax: number;
    tsystransactionno: any;
    tsyscreditcardno: any;
    tsyscreditcardtype: any;
    thirdpartyshipping: Thirdpartyshipping;
    instructions: string;
    gatrackcount: number;
    ppai: any;
    promotionnoteforbasket: string;
    decimalprecision: any;
    paytracetransactionid: any;
    additonaldeliveryinstruction: any;
    howyouhereaboutus: any;
    captcharesponce: any;
    submitpolist: any;
    paypaltransactionid: string;
    questionans: any;
    ischatbot: boolean;
    campaignguid: any;
    isdeleted: boolean;
    isproofrequired: boolean;
    subtotal: number;
    isapproveproof: boolean;
    isorderproofpayment: boolean;
    reason: any;
    proofuploaded: boolean;
    proofpath: any;
    prooftype: any;
    usedcartondeails: any;
    twowaypaymentmode: any;
    twowaypaymentmoderequired: boolean;
    previousorderdetails: any;
    salesrepresentative: boolean;
    sraccno: any;
    vertextaxcharge: any;
    insertfrom: any;
    transaction_tag: any;
    cardholder_name: any;
    exp_date: any;
    token_type: any;
    deliverydetails: any;
    erpzohoorderid: any;
    salesrep: any;
    customdiscountpercentage: any;
    customdiscountamount: any;
    approveddate: string;
    approvedby: any;
    approvedreason: any;
    cardcode: any;
    from: any;
    invoicenumber: any;
    salesrepemailaddress: any;
    balancetotalorderamount: number;
    isnettermspayment: boolean;
    nettermstotalorderamount: number;
    salestaxonproductcostpercentage: number;
    salestaxonproductcostamount: number;
    blindship: boolean;
    detailurl: any;
    approveddateunix: number;
    eventdateunix: number;
    deliverydateunix: number;
    exp_dateunix: number;
    isActive: boolean;
    ipAddress: string;
    createdBy: string;
    createdDateUtc: string;
    modifiedBy: string;
    modifiedDateUtc: string;
    createdDateUnix: number;
    modifiedDateUnix: number;
}

export interface Itemslist {
    productguid: string;
    skuguid: string;
    quantity: number;
    price: number;
    totalprice: number;
    artworkfilename: any;
    freightcharges: any;
    freightname: any;
    productcode: string;
    productname: string;
    productdefaultimage: any;
    imagealttext: any;
    variantname: any;
    variantsize: string;
    basketdetailguid: string;
    imprintmethodname: string;
    formulalist: any;
    chargeslist: Chargeslist[];
    imprintmethodguid: string;
    numberofimprintcolors: number;
    numberofimprintlocations: number;
    imprintlocations: Imprintlocation[];
    actualprice: number;
    promotionconditionguid: any;
    conditionname: any;
    conditionrule: any;
    actualtotalamount: number;
    discountamount: any;
    minorderamount: any;
    discountpercentage: any;
    isapplyonproductbaseprice: boolean;
    isapplyonitemandchargeprice: boolean;
    isapplysitewide: boolean;
    isalluserselected: boolean;
    isallcustomergroupselected: boolean;
    maximumdiscountamount: any;
    isapplyonbasketprice: boolean;
    totalamountafterpromotion: number;
    totalamountbeforepromotion: number;
    totaldiscountamount: number;
    totalproductorderamount: number;
    freesetupchargenote: boolean;
    promotiontotalnote: any;
    promotionproductnote: any;
    flag: any;
    collectionguids: any;
    applydiscounttocollectionguids: any;
    applydiscounttoproductguids: any;
    productguids: any;
    totalproductamount: number;
    pricingguid: string;
    previousorderno: any;
    artvaultguid: any;
    artvaultlist: any;
    discountshippingpercentage: any;
    issample: boolean;
    isbillablesample: boolean;
    erpproductid: number;
    cartid: any;
    shipcarrier: string;
    skuname: string;
    questionanswer: any;
    erpskuid: string;
    applicablepromotions: any;
    existingpromotions: any;
    promotionalnotes: any;
    pricetodisplay: number;
    actualquantity: number;
    discountedshippingtype: any;
    isfreesetup: any;
    productaliasname: string;
    itemdescprice: any;
    totalamounttodisplay: number;
    totalamountdiscount: number;
    decimalprecision: any;
    suppliername: string;
    additonaldeliveryinstruction: any;
    howyouhereaboutus: any;
    groupguid: string;
    country: string;
    vintage: any;
    priceperquantity?: number;
    pricingname: any;
    featuredicondata: any;
    isconsiderforrecomm: boolean;
    previousorderdetails: any;
    iscustomproduct: boolean;
    psreorder: boolean;
    artworktext: any;
    customfield: string;
    productcustomcharges: any;
    customfield2: any;
    vsimagelinks: any;
    vslink: any;
    pmscharges: number;
    detailurl: any;
}

export interface Chargeslist {
    chargename: string;
    chargevalue: number;
    quantity: any;
}

export interface Imprintlocation {
    imprintlocationguid: string;
    imprintlocationname: string;
    imprintcolors: string[];
    imprintcustomcolors: any;
    imprintcolorguid: string[];
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
    compassshippingaddressid: string;
    shippingfax: any;
    isresidential: boolean;
    isresalecertificate: boolean;
    iswilladvise: boolean;
    ismultiplelocations: boolean;
}

export interface Billinginformation {
    billingname: any;
    billingfirstname: string;
    billinglastname: string;
    billingemailid: string;
    addressguid: any;
    billingcompanyname: string;
    vatorgstnumber: string;
    billingaddress1: string;
    billingaddress2: string;
    billingcity: string;
    billingstate: string;
    billingcountryguid: string;
    billingzip: string;
    billingextensionno: string;
    billingphone: string;
    isdcode: any;
    billingreferencename: any;
    billingcardtype: any;
    billingcardnumber: any;
    billingcardholdersname: any;
    billingcardexpirydate: any;
    billingcardcvv: any;
    compassbillingaddressid: string;
    billingfax: any;
}

export interface Shipperno {
    freighttypename: any;
    shippernumber: string;
    freightmethodname: any;
}

export interface Thirdpartyshipping {
    Isrecipient: boolean;
    isthirdparty: boolean;
    thirdpartyname: any;
    isgordonshipping: boolean;
    ismyfreightaccount: boolean;
}

export interface Features {
    isgstapplicable: boolean;
    isdecimalprecisionadd: boolean;
    iscustomizeandorder: boolean;
    iscustomizeandorderqna: boolean;
    ismultipleskusfeatureenabled: boolean;
}

export interface Globalsettings {
    decimaldigitsofttl: any;
    decimalprecision: any;
    minimumdecimalprecision: any;
    gstpercentage: string;
    dateformat: any;
    salestaxpercentage: any;
    gstamount: number;
    isLMSIntegration: boolean;
}

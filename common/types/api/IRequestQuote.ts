export interface IFilterData {
    Filters: Filter[];
}

export interface Filter {
    SortName: string;
    PageNo: string;
    RequestType: string;
    UserGuid: string;
}

export interface IRequestQuoteResponse {
    statuscode: number;
    message: string;
    data: RequestQuoteData;
}

export interface RequestQuoteData {
    ordersamples: any;
    requestquotes: Requestquote[];
    resources: Resources;
    featuressettings: Featuressettings;
    globalsettings: Globalsettings;
}

export interface Requestquote {
    requestquoteguid: string;
    companyname: string;
    productguid: string;
    color: string;
    deliverydate: any;
    totalorderprice: number;
    usapaytermid: any;
    usapaytermname: any;
    paymentmode: any;
    addressguid: any;
    ordernumber: any;
    status: any;
    userguid: string;
    currencyguid: any;
    shippinginformation: any;
    billinginformation: any;
    firstname: string;
    lastname: string;
    emailaddress: string;
    salesrepemailaddress: any;
    salesrepname: any;
    extensionno: any;
    phone: string;
    address1: any;
    address2: any;
    city: any;
    state: string;
    countryguid: string;
    zip: any;
    createddateutc: string;
    websiteguid: string;
    note: any;
    isauthorizedpromodistributor: boolean;
    asi: any;
    ppai: any;
    sage: any;
    upic: any;
    pppc: any;
    quantity: string;
    needquoteby: string;
    imagename: string;
    productname: string;
    productcode: string;
    selectedimage: string;
    requestquoteitems: Requestquoteitem[];
    thirdpartyshipping: any;
    isorderplaced: boolean;
    source: any;
    requestquotenumber: any;
    fax: any;
    producttype: any;
    process: any;
    size: any;
    referencetype: any;
    campaignguid: any;
    basketfreightcharges: any;
    basketfreightname: any;
    comments: any;
    adminnotes: any;
    salesrepresentative: any;
    from: any;
    decoration: string;
    doyouneed: string;
    issaverfq: boolean;
    customdiscountpercentage: any;
    customdiscountamount: any;
    isrequestquotewithimprintdtls: boolean;
    companyaddress: string;
    companyzipcode: string;
    isshipzipcode: string;
    rfqtype: any;
    companycity: string;
    associations: any;
    isexternalrequestquoteflag: boolean;
    pono: any;
    password: any;
    createddateunix: number;
    needquotebyunix: number;
}

export interface Requestquoteitem {
    productguid: string;
    color: string;
    quantity: number;
    imagename: string;
    productname: string;
    productcode: string;
    note: string;
    sku: string;
    productaliasname: string;
    imprintmethodname: any;
    imprintmethodguid: any;
    pricingguid: any;
    pricetodisplay: number;
    skuguid: any;
    price: any;
    totalprice: any;
    freightcharges: any;
    freightname: any;
    productdefaultimage: any;
    imagealttext: any;
    variantname: any;
    variantsize: any;
    numberofimprintcolors: number;
    numberofimprintlocations: number;
    actualprice: number;
    imprintlocations: any;
    artvaultguid: any;
    artvaultlist: any;
    artworkfilename: any;
    artworktext: any;
    formulalist: any;
    chargeslist: any;
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
    previousorderno: any;
    discountshippingpercentage: any;
    issample: boolean;
    isbillablesample: boolean;
    erpproductid: number;
    cartid: any;
    shipcarrier: any;
    skuname: any;
    questionanswer: any;
    erpskuid: string;
    applicablepromotions: any;
    existingpromotions: any;
    promotionalnotes: any;
    actualquantity: number;
    discountedshippingtype: any;
    isfreesetup: any;
    itemdescprice: any;
    totalamounttodisplay: any;
    totalamountdiscount: any;
    decimalprecision: any;
    suppliername: any;
    additonaldeliveryinstruction: any;
    howyouhereaboutus: any;
    groupguid: any;
    country: any;
    vintage: any;
    priceperquantity: any;
    pricingname: any;
    featuredicondata: any;
    isconsiderforrecomm: any;
    previousorderdetails: any;
    iscustomproduct: boolean;
    psreorder: boolean;
    lstproductcustomcharges: any;
}

export interface Resources {
    showingdata: string;
    quuotestauts: string;
    requestquotenumber: string;
    productname: string;
    createddate: string;
    customername: string;
    quantity: string;
    emailid: string;
    createdby: string;
    amount: string;
    decoration: string;
    reportdoyouneedbelow: string;
    isshipzipcode: string;
    status: string;
    rfqtype: string;
    salesrepresentative: string;
    reviewaction: string;
    company: any;
    norecordsfound: any;
    print: any;
    firstname: any;
    lastname: any;
    emailaddress: any;
    phone: any;
    accountnumber: any;
    extension: any;
    companyname: any;
    shippingaddress1: any;
    aptsuite: any;
    shippingaddress2: any;
    shippingcity: any;
    shippingstate: any;
    shippingcountry: any;
    shippingzip: any;
    freighttype: any;
    shipperno: any;
    asi: any;
    ppai: any;
    sage: any;
    upic: any;
    otherassociation: any;
    needsampleby: any;
    samplenote: any;
    productcolor: any;
    productquantity: any;
}

export interface Featuressettings {
    isrfqenabled: boolean;
    isusfastprint: boolean;
}

export interface Globalsettings {
    addutcvalue: string;
}

export interface BasketListDataResponse {
    statuscode: number;
    message: string;
    data: BasketListData;
}

export interface BasketListData {
    isuserloggedin: boolean;
    isguestuser: boolean;
    productscount: number;
    basketlist: Basketlist[];
    imprintmethods: any;
    imprintlocations: any;
    imprintcolor: any;
    resources: Resources;
    featuresetting: Featuresetting;
    globalsetting: Globalsetting;
}

export interface Basketlist {
    basketdetailsguid: string;
    skuguid: string;
    pricingguid: string;
    imagename: any;
    imagepath: any;
    productname: string;
    productcode: string;
    imagealttext: string;
    skuname: string;
    productguid: string;
    quantity: number;
    userguid: string;
    sessionguid: string;
    price: number;
    totalcartamount: number;
    totalproductamount: number;
    variantsize: string;
    variantimagename: string;
    currencyguid: string;
    currencycode: any;
    minquantity: number;
    artworkfilename: any;
    cartonheight: string;
    cartonlength: string;
    cartonweight: string;
    cartonwidth: string;
    productheight: any;
    productlength: any;
    productweight: any;
    productwidth: any;
    unitspercarton: string;
    statecode: string;
    country: string;
    postalcode: string;
    vsimagelinks: any;
    vslink: any;
    freightcharge: any;
    freightname: any;
    subtotal: any;
    imprintmethoddetails: Imprintmethoddetail[];
    imprintlocations: any;
    numberofimprintcolors: number;
    numberofimprintlocations: number;
    formuladetails: any;
    imprintmethods: any;
    chargeslist: Chargeslist[];
    imprintmethodname: any;
    imprintlocationsname: any;
    inventory: number;
    conditionname: any;
    conditionrule: any;
    discountamount: any;
    minorderamount: any;
    discountpercentage: any;
    actualprice: number;
    promotionconditionguid: any;
    actualtotalamount: number;
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
    discountshipping: any;
    shippingmethodguids: any;
    shippingstateguids: any;
    previousorderno: any;
    artvaultguid: any;
    artvaulturls: any;
    discountshippingpercentage: any;
    erpproductid: number;
    issample: boolean;
    isbillablesample: boolean;
    cartid: any;
    shipcarrier: any;
    questionanswer: any;
    erpskuid: string;
    applicablepromotions: any[];
    existingpromotions: any;
    promotionalnotes: any[];
    pricetodisplay: number;
    actualquantity: number;
    discountedshippingtype: any;
    isfreesetup: any;
    promocodealert: any;
    isfromcheckout: boolean;
    totalamounttodisplay: number;
    totalamountdiscount: number;
    promotionalnotesfortotal: any[];
    cartcharges: any;
    shoppingcartid: any;
    shoppingcartitemid: any;
    uploadartwork: boolean;
    productaliasname: string;
    additionalpricingguid: any;
    additionalnoofcolors: any;
    customfields: any;
    customfieldtext: any;
    unitwt: any;
    decimalprecision: any;
    artvaultinstructions: any;
    editorderguid: any;
    suppliername: string;
    totalquantity: number;
    groupguid: any;
    variantupcharge: any;
    vintage: any;
    maxquantity: any;
    quantityunit: string;
    priceperquantity: number;
    pricingname: string;
    skucode: string;
    size: any;
    featurediconsdata: Featurediconsdaum[];
    pspreorderdetail: any;
    isproductfreeshipping: boolean;
    iscustomproduct: boolean;
    psreorder: boolean;
    artworktext: any;
    customfield2: any;
    isartworkuploaded: boolean;
    customfield: any;
    productiontime: string;
    pmscharges: number;
    variants: any;
    customizeproductdetails: any;
    color: any;
    sizes: any;
    detailurl: any;
}

export interface Imprintmethoddetail {
    imprintmethodguid: string;
    imprintmethodname: string;
    imprintlocations: Imprintlocation[];
    imprintcustomcolors: any;
    pmscount: number;
}

export interface Imprintlocation {
    imprintlocationguid: string;
    imprintlocationname: string;
    imprintcolors: Imprintcolor[];
}

export interface Imprintcolor {
    imprintcolorguid: string;
    imprintcolorname: string;
}

export interface Chargeslist {
    chargename: string;
    chargevalue: number;
    quantity: any;
}

export interface Featurediconsdaum {
    websiteGuid: string;
    collectionGuid: string;
    parentCollectionGuid: string;
    collectionName: string;
    languageGuid: string;
    collectionImageName: string;
    collectionBannerImageName: string;
    iconImageName: string;
    descriptionText: string;
    bannerText: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    displayOrder: number;
    productCount: number;
    collectionType: string;
    featuredIconURL: string;
    featureIconImageAlt: string;
    isActive: boolean;
    ipAddress: string;
    createdBy: string;
    createdDateUtc: string;
    modifiedBy: string;
    modifiedDateUtc: string;
}

export interface Resources {
    product: string;
    productcode: string;
    quantity: string;
    price: string;
    amount: string;
    billablesamplenote: string;
    samplenote: string;
    variantname: string;
    actualstyle: string;
    pricingname: string;
    description: string;
    variantsize: string;
    country: string;
    vintage: string;
    imprintlocationcolor: string;
    subtotal: string;
    viewbasket: string;
    totalamount: string;
    gst: string;
    baskettotalamount: string;
    cartcount: string;
    basket: string;
}

export interface Featuresetting {
    isgstapplicable: boolean;
    isviewcart: boolean;
    isshowthumbnailimg: boolean;
    basketisenabled: boolean;
    wishlistisenabled: boolean;
    catalogisenabled: boolean;
    isgrosspriceafterlogin: boolean;
    minqtyisenabled: boolean;
    iscompassenable: boolean;
    isdecimalprecisionadd: boolean;
    isnotetextcallprice: boolean;
    isshowminmaxprice: boolean;
    ispricemoq: boolean;
    eqpnqponsizes: boolean;
}

export interface Globalsetting {
    fileversion: string;
    decimalprecision: string;
    gstpercentage: string;
    minimumdecimalprecision: any;
}

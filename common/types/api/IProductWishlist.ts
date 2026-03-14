export interface IProductWishlistResponse {
    statuscode: number;
    message: string;
    data: IProductWishlistData;
}

export interface IProductWishlistData {
    wishlistcounts: number;
    maxpage: number;
    precisionvalue: any;
    strimagesizename: string;
    tempwcallforprice: string;
    productlstdata: Productlstdaum[];
    pageno: number;
    pagesize: number;
    productcount: number;
    lstallproductscount: number;
    resource: Resource;
    globalsetting: Globalsetting;
    featuresetting: Featuresetting;
}

export interface Productlstdaum {
    productguid: string;
    productcode: string;
    productname: string;
    productaliasname: string;
    description: string;
    productimageurl: string;
    price: number;
    quantity: number;
    color: any;
    isaddedinwishlist: boolean;
    productrating: number;
    detailurl: string;
    isreiewed: boolean;
    collectionname: string;
    collectionalias: any;
    customfield: any;
    minprice: number;
    mindiscountedprice: number;
    mindiscountedstrikeprice: number;
    iscallforprice: boolean;
    callforprice: any;
    minstrikeprice: number;
    minquantity: number;
    discountcode: string;
    maxpriceproductcard: number;
    minpriceproductcard: number;
    discountcodemaxprice: any;
    discountcodeminprice: any;
    pricingguid: any;
    swatches: string[];
    productnewskuvm: Productnewskuvm[];
    featurediconsvm: any;
    strikeprice: number;
    furtherdescription: any;
    notetext: any;
    skucount: number;
    isincludesubscription: boolean;
    yousave: number;
    lstcolors: string[];
    expirationdateutcunix: any;
    dealoftheweekstartdateunix: any;
    dealoftheweekenddateunix: any;
    seodetails: Seodetail[];
}

export interface Productnewskuvm {
    inventory: any;
    skuguid: any;
    sku: any;
    variantname: string;
    imagename: string;
    imagealttext: string;
    prodprices: any;
    customfield: any;
    price: number;
    strikeprice: number;
    pricingguid: any;
    isdefault: boolean;
}

export interface Seodetail {
    pagetitle: any;
    metakeyword: any;
    metadescription: any;
    canonical: string;
    metarobots: any;
}

export interface Resource {
    aslowas: string;
    minquantity: string;
    quickview: string;
    addtobasket: string;
    addtowishlist: string;
    viewproduct: string;
    removefromwishlistmsg: string;
    productcompare: string;
    addtocart: string;
    detail: string;
    catalogpresentation: string;
    iscallforprice: string;
    iscallpricecanada: string;
    iscallpriceusa: string;
    yousave: string;
    addtocartpopuptitle: string;
    charhyphen: string;
    addcompare: string;
    removecompare: string;
    removefromwishlistconfirmmsg: string;
    noproductsinwishlist: string;
    addsuccess: string;
    addfailed: string;
    maxinventory: string;
    maxbasketqty: string;
}

export interface Globalsetting {
    fileversion: string;
    decimalprecision: string;
    gstpercentage: any;
    minimumdecimalprecision: string;
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
}

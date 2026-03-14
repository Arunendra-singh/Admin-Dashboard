export interface IBoughtTogetherResponse {
    statuscode: number;
    message: string;
    data: IBoughtTogetherData;
}

export interface IBoughtTogetherData {
    carousel: boolean;
    lstmastercolor: any;
    categorieslist: any;
    collectionguids: any[];
    productlstdata: Productlist[];
    frequentlyboughttogethervm: any;
    featuresetting: Featuresetting;
    gloablsetting: Gloablsetting;
    resource: Resource;
    reviewes: any;
    lstupcomingtradeshowproducts: any;
    redirectionurl: any;
    trendingcategories: any;
    suggestedtags: any;
    brands: any;
}

export interface Productlist {
    productguid: string;
    productcode: string;
    productname: string;
    productaliasname: string;
    description: string;
    productimageurl: string;
    price: number;
    isaddedinwishlist: boolean;
    productrating: number;
    detailurl: string;
    isreiewed: boolean;
    collectionname: any;
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
    pricingguid: string;
    featurediconsvm: any;
    swatches: string[];
    brandiconsvm: any;
    productnewskuvm: Productnewskuvm[];
    productmediavm: Productmediavm[];
    strikeprice: number;
    furtherdescription: string;
    notetext: string;
    skucount: number;
    isincludesubscription: boolean;
    yousave: number;
    seodetails: Seodetail[];
}

export interface Productnewskuvm {
    inventory: number;
    skuguid: string;
    sku: string;
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

export interface Productmediavm {
    medianame: string;
    mediatype: string;
    mediaalttext: string;
    media: string;
    productcode: string;
    mediaurl: any;
    skuguid: string[];
    mediagroupdisplayimage: boolean;
    mediagroupguid: string;
    mediaguid: string;
    mediagroupname: any;
    mediadisplayorder: any;
    websiteguid: any;
    skucode: any;
    productname: any;
}

export interface Seodetail {
    pagetitle: string;
    metakeyword: string;
    metadescription: string;
    canonical: string;
    metarobots: string;
}

export interface Featuresetting {
    ispricebreakloginbased: boolean;
    isshowminmaxprice: boolean;
    isdecimalprecesionbasedonlogin: boolean;
    guestusercheckoutisenabled: boolean;
    minqtyisenabled: boolean;
    isdisablepricewithoutlogin: boolean;
    productinventory: boolean;
    isnetsuiteenabled: boolean;
    issapintegrationprice: boolean;
    catalogisenabled: boolean;
    mediaonhvrisenabled: boolean;
    isgrosspriceafterlogin: boolean;
    isdecimalprecisionadd: boolean;
    isshowthumbnailimg: boolean;
    isairecommended: boolean;
    quickviewisenabled: boolean;
}

export interface Gloablsetting {
    decimalprecisionfinal: string;
    minimumdecimalprecision: any;
    fileversion: any;
    globalsettingvalue: any;
}

export interface Resource {
    addtobasket: any;
    addtowishlist: any;
    productcompare: any;
    quickview: any;
    iscallforprice: string;
    minquantity: string;
    aslowas: string;
    catalogpresentation: any;
    sectionviewall: string;
    wishlistcheckbox: string;
    loginrequiremsg: any;
    detail: any;
    removefromwishlistmsg: any;
    reviewcountlbl: any;
    yousave: string;
    addcompare: any;
    removecompare: any;
    charhyphen: any;
    viewproduct: any;
    iscallpricecanada: string;
    iscallpriceusa: string;
    strpresentationbuttonpermission: any;
    viewalltext: any;
    stremptyspace: any;
    maxqtyvalidation: any;
    minqtyvalidation: any;
    inventorywarning: any;
    titlesuccess: any;
    addsuccess: any;
    addfailed: any;
    sampeaddfailed: any;
    quantityvalidation: any;
    cartloginrequire: any;
    maxinventory: any;
    maxbasketqty: any;
    viewallsimilarproduct: any;
    elementdesc: any;
    placeneworder: any;
    heading: string;
    noproducttitle: any;
    pricetitle: any;
    citytitle: any;
    statetitle: any;
    countrytitle: any;
    changelocation: any;
    pieces: any;
    featured: any;
    totalpriceheading: string;
}

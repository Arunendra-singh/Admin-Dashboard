export interface IGetProductDetailResponse {
    statusCode: string;
    message: string;
    data: ProductDetail;
}

export interface ProductDetail {
    productdata: Productdaum[];
    resources: Resources;
}

export interface Productdaum {
    productguid: string;
    productcode: string;
    productname: string;
    description: string;
    productaliasname: string;
    furtherdescription: string;
    minprice: number;
    minstrikeprice: number;
    mindiscountedprice: number;
    mindiscountedstrikeprice: number;
    discountcode: string;
    expirationdateutc: string;
    iscallforprice: boolean;
    minquantity: number;
    maxquantity: number;
    price: number;
    productimageurl: string;
    pricingguid: string;
    productdetailurl: any;
    customfield: string[];
    collections: Collection[];
    productrating: number;
    isaddedinwishlist: boolean;
    isreiewed: boolean;
    featurediconsnew: Featurediconsnew[];
    productnewskuvm: Productnewskuvm[];
    productdetails: any;
    productmedialist: any;
    reviewcount: number;
    productcombodeals: Productcombodeal[];
    strikeprice: number;
    hidestep1: boolean;
    isincludesubscription: boolean;
    frequencytype: string;
    duration: string;
    frequency: Frequency[];
    customfield1: string[];
}

export interface Collection {
    collectionname: string;
    collectiontype: string;
    alias: string;
    categoryurl: string;
    productcount: number;
    categoryimageurl: string;
    collectionguid: string;
    subcategories: any;
}

export interface Featurediconsnew {
    websiteguid: any;
    collectionguid: string;
    parentcollectionguid: any;
    collectionname: string;
    languageguid: any;
    collectionimagename: any;
    collectionbannerimagename: string;
    iconimagename: string;
    descriptiontext: any;
    bannertext: string;
    collectiontype: any;
    offerbannerimagename: any;
    menubannerimagename: any;
    collectionimagealt: any;
    bannerimagealt: any;
    offerbannerimagealt: any;
    menubannerimagealt: any;
    alias: string;
    furtherdescriptiontext: any;
    featureiconimagealt: string;
    parentcollectionname: any;
    featurediconurl: string;
    isactive: boolean;
}

export interface Productnewskuvm {
    skuguid: string;
    sku: string;
    inventory: number;
    volume: any;
    weight: number;
    variantname: string;
    variantsize: string;
    imagename: string;
    imagealttext: string;
    isdefault: boolean;
    addons: any;
    productdetails?: any[];
    price: number;
    strikeprice: number;
    pricingguid: string;
    productmedialist: Productmedialist[];
    notetext: string;
}

export interface Productmedialist {
    medianame: string;
    mediatype: string;
    mediaalttext: string;
    media: string;
    mediaurl: any;
    mediagroupguid: string;
    mediaguid: string;
    productcode: string;
    websiteguid: any;
    skucode: any;
    skuguid: string[];
    mediagroupdisplayimage: boolean;
    productname: any;
    mediadisplayorder: any;
    mediagroupname: string;
}

export interface Productcombodeal {
    productcount: string;
    discountpercentage: string;
    discountamount: number;
}

export interface Frequency {
    frequency: string;
    discountpercentage: string;
    discountamount: number;
}

export interface Resources {
    "product.pricing": string;
    "product.price": string;
    "product.quantity": string;
    "product.available colors": string;
    "product.write a review": string;
}

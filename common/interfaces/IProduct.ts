import { type ICollection } from "./ICollection";

export interface IProduct {
    collectionalias: string;
    collectionGuids: ICollectionGuid[];
    collectionname: string;
    collections: ICollection[];
    customfield: string[];
    customfield1: string[];
    data_actionurl: string;
    description: string;
    detailurl: string;
    discountcode: string;
    downloadscount: number;
    duration: string;
    eventthemes: any[];
    expirationdateutc: any;
    featurediconsnew: any;
    featurediconsvm: any;
    frequency: IFrequency[];
    frequencytype: string;
    furtherdescription: string;
    hidestep1: boolean;
    industries: any[];
    isaddedinwishlist: boolean;
    iscallforprice: boolean;
    isdownloaded: boolean;
    isincludesubscription: boolean;
    islike: boolean;
    isreiewed: boolean;
    lastupdatedon: string;
    maxquantity: number;
    mediaurl: string;
    mindiscountedprice: number;
    mindiscountedstrikeprice: number;
    minprice: number;
    minquantity: number;
    minstrikeprice: number;
    notetext: string;
    notetext2: string;
    popularproductcount: string;
    price: number;
    pricingguid: string;
    productaliasname: string;
    productcode: string;
    productcombodeals: IProductComboDeal[];
    productdetails: IProductDetail[];
    productdetailurl: string;
    productguid: string;
    productimageurl: string;
    productlikes: number;
    productmedialist: IProductMediaList[];
    productmediavm: IProductMediaList[];
    productname: string;
    productnewskuvm: IProductNewSKUVM[];
    productrating: number;
    reviewcount: number;
    skucount: number;
    strikeprice: number;
    tagattributes: string;
}

interface ICollectionGuid {
    collectionguid: string;
    collectiontype: string;
    userguids: any;
    collectionimagename: any;
}

interface IProductNewSKUVM {
    addons: any;
    customField: any;
    imagealttext: string;
    imagename: string;
    inventory: number;
    isdefault: boolean;
    notetext: string;
    price: number;
    pricingguid: string;
    prodprices: any;
    productdetails?: any[];
    productmedialist: IProductMediaList[];
    sku: string;
    skuguid: string;
    strikeprice: number;
    variantname: string;
    variantsize: string;
    volume: any;
    weight: number;
}

interface IProductDetail {
    groupname: string;
    groupdescription: string;
    groupkey: string;
    groupvalue: string;
    sequence: number;
    skuguid: string;
}

interface IProductMediaList {
    medianame: string;
    mediatype: string;
    mediaalttext: string;
    media: string;
    mediaurl: any;
    mediagroupguid: string;
    mediaguid: string;
    productcode: string;
    websiteguid: string;
    skucode: string;
    skuguid: string[];
    mediagroupdisplayimage: boolean;
    productname: any;
    mediadisplayorder: any;
    mediagroupname: string;
}

interface IProductComboDeal {
    productcount: string;
    discountpercentage: string;
    discountamount: number;
}

interface IFrequency {
    frequency: string;
    discountpercentage: string;
    discountamount: number;
}

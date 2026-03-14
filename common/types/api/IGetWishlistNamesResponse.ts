export interface IGetWishlistNamesResponse {
    statuscode: string;
    message: string;
    data: any;
    wishlist: Wishlist[];
    totalcount: string;
}

export interface Wishlist {
    wishlistname: string;
    count: number;
    data: WishlistData;
}

export interface WishlistData {
    productdetails: Productdetail[];
}

export interface Productdetail {
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
    expirationdateutc?: string;
    iscallforprice: boolean;
    minquantity: number;
    maxquantity: any;
    price: number;
    productimageurl: string;
    pricingguid: string;
    productdetailurl: string;
    customfield: string;
    productrating: number;
    isaddedinwishlist: boolean;
    isreiewed: boolean;
    featurediconsnew: any[];
    productnewskuvm: Productnewskuvm[];
    productdetails: any;
    productmedialist: Productmedialist[];
    reviewcount: number;
    promocodes: any[];
    notetext2: string;
}

export interface Productnewskuvm {
    skuguid: string;
    sku: string;
    inventory: any;
    volume: any;
    weight: number;
    variantname: string;
    variantsize: string;
    imagename: string;
    imagealttext: string;
    isdefault: boolean;
    addons: any[];
}

export interface Productmedialist {
    medianame: any;
    mediatype: string;
    mediaalttext: string;
    media: string;
    mediaurl: string;
}

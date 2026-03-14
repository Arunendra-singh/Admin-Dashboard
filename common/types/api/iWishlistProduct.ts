export interface iWishlistProductResponse {
    statusCode: string;
    message: string;
    data: Data;
    wishlist: any;
    totalCount: any;
}

export interface Data {
    resources: Resources;
    productDetails: WishlistProductDetail[];
}

export interface Resources {
    AddtoCart: string;
    "Basket.Wishlist.Remove": string;
}

export interface WishlistProductDetail {
    productGuid: string;
    productcode: string;
    productname: string;
    description: string;
    productAliasName: string;
    furtherDescription: string;
    minPrice: number;
    minStrikePrice: number;
    minDiscountedPrice: number;
    minDiscountedStrikePrice: number;
    discountCode: string;
    expirationDateUtc?: string;
    isCallForPrice: boolean;
    minQuantity: number;
    maxQuantity: any;
    price: number;
    productImageUrl: string;
    pricingGuid: string;
    productDetailURL: string;
    customfield: string;
    productRating: number;
    isAddedInWishList: boolean;
    isReiewed: boolean;
    featurediconsNew: any[];
    productnewskuVM: ProductnewskuVm[];
    productDetails: any;
    productMediaList: ProductMediaList[];
    reviewCount: number;
    promocodes: any[];
    notetext2: string;
}

export interface ProductnewskuVm {
    skuGuid: string;
    sku: string;
    inventory: any;
    volume: any;
    weight: number;
    variantName: string;
    variantSize: string;
    imageName: string;
    imageAltText: string;
    isDefault: boolean;
    addons: any[];
}

export interface ProductMediaList {
    mediaName: any;
    mediaType: string;
    mediaAltText: string;
    media: string;
    mediaUrl: string;
}

export interface ICollectionDataResponse {
    statusCode: number
    message: string
    data: ICollectionData[]
}

export interface ICollectionData {
    collectionName: string
    alias: string
    productCount: number
    collectionType: string
    categoryBanner: any
    categoryBannerImageAlt: any
    categoryDescription: string
    productnewvm: Productnewvm[]
}

interface Productnewvm {
    productGuid: string
    productcode: string
    productname: string
    furtherDescription?: string
    productImageUrl: string
    isAddedInWishList?: boolean
    popularProductCount?: string
    productRating?: number
    productLikes?: number
    downloadsCount?: number
    lastUpdatedOn?: string
    tagAttributes?: string
    description?: string
    productAliasName?: string
    detailURL?: string
    isLike?: boolean
    isDownloaded?: boolean
    isReiewed?: boolean
    featurediconsVM?: any[]
    productnewskuVM?: ProductnewskuVm[]
    productMediaList?: ProductMediaList[]
    price: number
    strikePrice: number
    priceGuid?: string
}

interface ProductnewskuVm {
    skuGuid: string
    sku: string
    variantName: string
    imageName: string
    imageAltText: string
    isDefault: boolean
    price: number
    priceGuid: string
    strikePrice: number
    inventory: number
}

interface ProductMediaList {
    mediaName: any
    mediaType: string
    mediaAltText: string
    media: string
    productCode: string
    mediaUrl: string
    skuGuid: string[]
    mediaGroupDisplayImage: boolean
}

export interface IUploadImagesResponse {
    statuscode: number
    message: string
    data: IUploadImages[]
}

export interface IUploadImages {
    rowNumber: number
    categoryName: string
    parentCategoryName: any
    productId: number
    productGuid: string
    productSku: any
    productName: string
    productCode: string
    languageId: number
    categoryGUID: any
    parentCategoryGUID: any
    groupCommodityGUID: any
    visibility: boolean
    score: number
    encodedProductName: string
    productNameWithCode: string
    productAliasName: any
    defaultImageName: any
    imageUrl: string
    minPrice: number
    correctedWords: any
    price: number
    suggestion: any
    detailurl: string
}

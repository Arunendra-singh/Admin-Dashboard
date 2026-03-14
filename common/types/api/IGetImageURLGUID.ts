export type GetImageURLGUIDResponse = ProductData[];

export interface ProductData {
    RowNumber: number;
    CategoryName: string;
    ParentCategoryName: any;
    ProductId: number;
    ProductGuid: string;
    ProductSku: any;
    ProductName: string;
    ProductCode: string;
    LanguageId: number;
    CategoryGUID: any;
    ParentCategoryGUID: any;
    GroupCommodityGUID: any;
    Visibility: boolean;
    Score: number;
    EncodedProductName: string;
    ProductNameWithCode: string;
    ProductAliasName: any;
    ImageUrl: string;
    MinPrice: number;
    CorrectedWords: any;
    defaultImageName: any;
    Suggestion: any;
    Price: number;
    ontology_keywords: any;
    StrikePrice: number;
    FurtherDescription: any;
}

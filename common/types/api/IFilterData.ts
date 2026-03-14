export interface IFilterResponse {
    statuscode: number;
    message: string;
    data: any;
}

export interface IProductFilter {
    categoryFilterName: string;
    categoryFilters: any;
    categoryFilter: CategoryFilter[];
    sectionFilterName: any;
    sectionFilters: any;
    brandFilterName: string;
    brandFilters: any[];
    priceFilterName: string;
    priceFilters: PriceFilters;
    eventThemeFilterName: any;
    eventThemesWithCount: any;
    industryFilterName: any;
    industriesWithCount: any;
    productionTimeFilterName: any;
    productionTimeWithCount: any;
    productionTimeINDayswithCount: any;
    minOrderFilterName: any;
    minOrderWithCount: any;
    productRatingFilterName: any;
    productRatingWithCount: any;
    imprintMethodsFilterName: any;
    imprintMethodsWithCount: any;
    productMaterialFilterName: any;
    productMaterialsWithCount: any;
    sizesFilterName: any;
    sizesWithCount: any;
    colorFilterName: string;
    colorsWithCount: any;
    masterColorsFilter: any;
    countryCode: any;
    productCountryWithCount: any;
    zipCode: any;
    productZipcodeWithCount: any;
    customeField: any;
    customeField1: any;
    productCustomeFieldWithCount: any;
    productCustomeField1WithCount: any;
    variantSizesFilterName: string;
    variantSizesWithCount: any;
    varintForFilters: any[];
    multipleProductionTimeName: any;
    multipleProductionTimeWithCount: any;
    endCategoryFilterName: any;
    endCategoryFilters: any;
    parentCategoryFilterName: any;
    parentCategoryFilters: any;
    priceMenuInFilter: any;
    colorsDataWithCount: ColorsDataWithCount[];
    productCount: string;
    prodPriceFilterName: any;
    prodPriceFilters: any;
    stateCode: any;
    productStatecodeWithCount: any;
    multiProductionTimeWithCount: any;
    impoter: any;
    impoterWithCount: any;
}

export interface CategoryFilter {
    collectionName: string;
    collectionType: string;
    alias: string;
    categoryURL: string;
    productCount: number;
    categoryImageURL: string;
    collectionGuid: string;
    subCategories: SubCategory[];
    parentCollectionGuid: any;
    collectionBannerImageName: string;
    descriptionText: string;
    bannerText: string;
    furtherDescriptionText: string;
    offerBannerImageName: string;
}

export interface SubCategory {
    collectionName: string;
    collectionType: string;
    alias: string;
    categoryURL: string;
    productCount: number;
    categoryImageURL: string;
    collectionGuid: string;
    subCategories: any;
    parentCollectionGuid: any;
    collectionBannerImageName: string;
    descriptionText: string;
    bannerText: string;
    furtherDescriptionText: string;
    offerBannerImageName: string;
}

export interface PriceFilters {
    minPrice: number;
    maxPrice: number;
    selectedMinPrice: number;
    selectedMaxPrice: number;
    actualMinPrice: number;
    actualMaxPrice: number;
    isPriceMenu: boolean;
}

export interface ColorsDataWithCount {
    masterColorGuid: string;
    masterColorName: string;
    masterColorHexValue: string;
    skuGuid: any;
    count: number;
}

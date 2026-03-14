export interface IFilterData {
    UserGuid: string;
    CategoryGuid: string;
    WebsiteGuid: string;
    PageNo: number;
    PageSize: number;
    SortName: string;
    CategoryGUIDs: string;
    SectionGUIDs: string;
    BrandGUIDs: string;
    MinPrice: number;
    MaxPrice: number;
    SelectedMinPrice: number;
    SelectedMaxPrice: number;
    LanguageGuid: string;
    Industry: string;
    EventTheme: string;
    MinOrder: string;
    ProductRating: string;
    ImprintMethods: string;
    Materials: string;
    ProductionTime: string;
    Sizes: string;
    SearchText: string;
    Colors: string;
    SearchResults: string;
    ShowViewAll: string;
    SupplierGUIDs: string;
    CountryCode: string;
    StateCode: string;
    ZipCode: string;
    CustomField: string;
    CustomField1: string;
    CustomField2: string;
    VariantSize: string;
    MaxOrder: string;
    IsSwatchesSelected: boolean;
    ProductCodeSimilarProduct: string;
    MultipleProductionTime: string;
    SubCategoriesGUIDs: string;
    ParentCategoriesGUIDs: string;
    IsReviewCount: boolean;
    NoOfSwatches: string;
    IsViewAll: boolean;
    ShowVariant: boolean;
    SearchWithinCategory: string;
    Inventory: string;
    WarehouseProduct: boolean;
    IsShowProductImageOnSwatchColorOption: string;
    IsImageNameasswatches: string;
    MultiMinMaxPrice: string;
    IsBindCategoryNameonProductcard: boolean;
    InOutOfStock: string;
    IsAvoidCategoryFilter: boolean;
    SelectedFilter: string;
}

export interface ProductListingWithLazyLoadResolve {
    productData: Productlstdaum[];
    nextPage: number;
    totalPages: number;
    productCount: number;
}
export interface GetProductsWithOptimizeSearchNewResult {
    resource: Resource;
    productData: Productlstdaum[];
    productcount: number;
    collectionguids: Collectionguid[];
}
export interface ProductListingResponse {
    [x: string]: any;
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    [x: string]: any;
    productcount: number;
    collectionguids: Collectionguid[];
    productlstdata: Productlstdaum[];
    resource: Resource;
}

export interface Collectionguid {
    collectionguid: string;
    collectionname: string;
    collectionimagename: string;
    alias: string;
    collectiontype: string;
    seodetails: Seodetails;
}

export interface Seodetails {
    pagetitle: string;
    metakeyword: string;
    metadescription: string;
    canonical: string;
    metarobots: string;
}

export interface Productlstdaum {
    productguid: string;
    productcode: string;
    productname: string;
    productaliasname: string;
    description: any;
    productimageurl: string;
    price: number;
    isaddedinwishlist: boolean;
    productrating: number;
    lastupdatedon: any;
    tagattributes: any;
    productlikes: number;
    downloadscount: number;
    detailurl: string;
    islike: boolean;
    isdownloaded: boolean;
    isreiewed: boolean;
    collectionname: any;
    collectionalias: any;
    customfield: any;
    collectionguids: Collectionguid2[];
    pricingguid: string;
    featurediconsvm: any;
    swatches: string[];
    productnewskuvm: Productnewskuvm[];
    productmediavm: Productmediavm[];
    eventthemes: Eventtheme[];
    industries: Industry[];
    strikeprice: number;
    furtherdescription: string;
    notetext: string;
    skucount: number;
    isincludesubscription: boolean;
    seodetails: Seodetail[];
    isbillablesample: boolean;
}

export interface Collectionguid2 {
    collectionguid: string;
    collectiontype: string;
    userguids: any;
    collectionimagename: string;
}

export interface Productnewskuvm {
    inventory?: number;
    skuguid: string;
    sku: string;
    variantname: string;
    imagename: string;
    imagealttext: string;
    prodprices: any;
    customfield: any;
    price: number;
    strikeprice: number;
    pricingguid: string;
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

export interface Eventtheme {
    key: string;
    value: string;
}

export interface Industry {
    key: string;
    value: string;
}

export interface Seodetail {
    pagetitle: string;
    metakeyword: string;
    metadescription: string;
    canonical: string;
    metarobots: string;
}

export interface Resource {
    showingcardrecords: string;
    showingcardrecordspaging: string;
    aslowas: string;
    minquantity: string;
    quickview: string;
    addtobasket: string;
    addtowishlist: string;
    viewproduct: string;
    compare: string;
    callforprice: string;
    catalogpresentation: string;
    details: string;
    wishlistcheckbox: string;
    wishlistloginrequired: string;
    removefromwishlistmsg: string;
    reviewcount: string;
    removewishlist: string;
    removecompare: string;
    presentationproductremoved: string;
    iscallforpricecanada: string;
    iscallforpriceusa: string;
    getproductcount: any;
    yousave: string;
    maxqtyvalidation: string;
    minqtyvalidation: string;
    inventorywarning: string;
    titlesuccess: string;
    addsuccess: string;
    addfailed: string;
    sampleaddfailed: string;
    quantityvalidation: string;
    cartloginrequired: string;
    maxinventory: string;
    maxquantity: string;
    addcompare: string;
    charhyphen: string;
    emptyspace: string;
    presentationbuttonpermission: string;
    expirationdate: string;
    instock: string;
    noproductfound: string;
    quickviewpopup: string;
}

// IProductDetails
export interface IProductDetailsResponse {
    statuscode: number;
    message: string;
    data: IProductDetailsData;
}

export interface IProductDetailsData {
    websiteguid: any;
    productguid: any;
    productname: any;
    productcode: any;
    imagename: any;
    description: any;
    languageguid: any;
    productrating: number;
    furtherdescription: any;
    price: number;
    productsize: any;
    minquantity: any;
    productmedialist: any;
    productskus: any;
    parentcollectionguid: any;
    collectionguid: any;
    parentcategoryname: any;
    categoryname: any;
    customfield: any;
    isblank: boolean;
    productvirtualsamplelink: any;
    eventthemename: any;
    productdetails: any;
    collections: any;
    imprintlocations: any;
    imprintcolors: any;
    imprintmethods: any;
    detailurl: any;
    isaddedinwishlist: boolean;
    seodetails: any[];
}

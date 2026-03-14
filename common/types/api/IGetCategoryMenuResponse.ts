export interface IGetCategoryMenuResponse {
    statuscode: number;
    message: string;
    data: CategoryMenuData[];
    categorydata: any[];
}

export interface CategoryMenuData {
    collectionname: string;
    collectiontype: string;
    alias: string;
    categoryurl: string;
    productcount: number;
    categoryimageurl: string;
    collectionguid: string;
    subcategories?: Subcategory[];
    parentcollectionguid: any;
    collectionbannerimagename: string;
    descriptiontext: string;
    bannertext: string;
    furtherdescriptiontext: string;
    displayorder: number;
    seodetails: Seodetail2[];
    products: any[];
}

export interface Subcategory {
    collectionname: string;
    collectiontype: string;
    alias: string;
    categoryurl: string;
    productcount: number;
    categoryimageurl: string;
    collectionguid: string;
    subcategories: any;
    parentcollectionguid: any;
    collectionbannerimagename: string;
    descriptiontext: string;
    bannertext: string;
    furtherdescriptiontext: string;
    displayorder: number;
    seodetails: Seodetail[];
    products: any;
}

export interface Seodetail {
    pagetitle: string;
    metadescription: string;
    metakeyword: string;
    canonicallink: string;
    metarobots: string;
}

export interface Seodetail2 {
    pagetitle: string;
    metadescription: string;
    metakeyword: string;
    canonicallink: string;
    metarobots: string;
}

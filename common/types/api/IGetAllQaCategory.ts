export interface IGetAllQaCategoryResponse {
    statuscode: number;
    message: string;
    data: QACategoryData[];
}

export interface QACategoryData {
    collectionname: string;
    collectiontype: string;
    alias: string;
    categoryurl: string;
    productcount: number;
    categoryimageurl: string;
    collectionguid: string;
    subcategories?: QaSubcategory[];
    parentcollectionguid: any;
    collectionbannerimagename: string;
    descriptiontext: string;
    bannertext: string;
    furtherdescriptiontext: string;
    displayorder: number;
    products: any[];
}

export interface QaSubcategory {
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
    products: any;
}

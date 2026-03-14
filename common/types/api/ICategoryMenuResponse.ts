interface ISubCategory {
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
    offerbannerimagename: string;
}

export interface ICategory {
    collectionname: string;
    collectiontype: string;
    alias: string;
    categoryurl: string;
    productcount: number;
    categoryimageurl: string;
    collectionguid: string;
    subcategories?: ISubCategory[];
    parentcollectionguid: any;
    collectionbannerimagename: string;
    descriptiontext: string;
    bannertext: string;
    furtherdescriptiontext: string;
    offerbannerimagename?: string;
}

export interface ICategoryMenuResponse {
    statusCode: number;
    message: string;
    data: ICategory[];
    categorydata: any;
}

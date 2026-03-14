export interface ICategoryDetailResponse {
    statusCode: number;
    message: string;
    data: ICategoryDetails;
}

export interface ICategoryDetails {
    collectionguid: string;
    alias: string;
    collectionname: string;
    descriptiontext: string;
    metatitle: string;
    metadescription: string;
    metakeywords: string;
    bannertext: string;
    productcount: number;
    collectiontype: string;
    categorybanner: string;
    canonicallink: string;
    metarobots: string;
    h1tag: string;
    furtherdescriptiontext: string;
}

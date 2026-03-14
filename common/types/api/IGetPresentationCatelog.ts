export interface IGetPresentationCatelog {
    statuscode: number;
    message: string;
    data: data[];
}

export interface data {
    landscapedata: OrientationData[];
    portraitdata: OrientationData[];
    type: string;
}

export interface OrientationData {
    exclusiveperpage: pageDetails[];
    fourperpage: pageDetails[];
    oneperpage: pageDetails[];
    orientation: string;
    randomperpage: pageDetails[];
    twoperpage: pageDetails[];
}

export interface pageDetails {
    websiteguid: string;
    languageguid: string;
    templateguid: string;
    templatename: string;
    backcover: string;
    backcoverguid: string;
    frontcover: string;
    frontcoverguid: string;
    header: string;
    headerguid: string;
    footer: string;
    footerguid: string;
    frontinner: [];
    backinner: [];
    orientation: string;
    type: string;
    backgroundimage: string;
    backgroundimageguid: string;
    layoutguid: string;
    layoutimage: string;
    product: Int16Array;
    flyerthumbimage: [];
    flyerthumbimageguid: [];
    layoutlist: [];
    iscdmincreated: boolean;
    pagesize: Int16Array;
    pageno: Int8Array;
    custbackgroundimage: [];
    backbuttoncolor: string;
}

export type ProductCatelogPayload = ProductCatelogObject[];

export interface ProductCatelogObject {
    Type: string;
    CatelogGuid: string;
    Option: string;
    CatelogEffect: string;
    ProductCodes: [];
}

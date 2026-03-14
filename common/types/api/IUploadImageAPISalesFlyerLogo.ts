export interface IUploadImageAPISalesFlyerLogoRes {
    statusCode: number;
    message: string;
    data: IUploadImageAPISalesFlyerLogoData;
}

export interface IUploadImageAPISalesFlyerLogoData {
    success: string;
    name: string;
    type: string;
    src: string;
    elementid: string;
    currentslideposition: string;
    catalogguid: string;
    ismultipleimage: boolean;
}

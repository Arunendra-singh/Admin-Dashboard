export interface IUploadLogoAPIPresentationRes {
    statusCode: number;
    message: string;
    data: string;
    files: string;
    uploadValues: IUploadLogoAPIPresentationData[]
}

export interface IUploadLogoAPIPresentationData {
    success: boolean;
    name: string;
    type: string;
    src: string;
    elementId: string;
    currentSlidePosition: string;
    ismultipleimage: boolean;
}

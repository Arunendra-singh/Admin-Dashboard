export interface IImageUploadPayload {
    filename: string;
    filesize: number;
    formData: any;
    basketItemGuid: string;
}

export interface IUploadArtworkResponse {
    statuscode: number;
    message: string;
    data: IUploadArtworkData;
}

export interface IUploadArtworkData {
    success: string;
    name: string;
    type: string;
    src: string;
    ispofileattach: string;
    elementid: string;
    currentslideposition: string;
    websiteguid: string;
    basketguid: string;
    filepath: string;
    languageguid: string;
    submitpoguid: string;
    artvaultguid: string;
    size: number;
    status: any;
    info: any;
    saveresult: any;
}

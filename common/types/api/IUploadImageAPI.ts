export interface IUploadImageAPIResponse {
    statuscode: number;
    message: string;
    data: IUploadImageAPIData;
}

export interface IUploadImageAPIData {
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

export interface IUploadImageAPIPayload {
    qquuid: number;
    qqtotalfilesize: number;
    fileName: string;
    BasketDetailGuid: string;
}

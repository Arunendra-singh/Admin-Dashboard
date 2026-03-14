export interface IGetPresentationBase64Res {
    statuscode: number;
    message: string;
    data: string;
}

export interface IGetPresentationBase64Req {
    urlkey: string;
}

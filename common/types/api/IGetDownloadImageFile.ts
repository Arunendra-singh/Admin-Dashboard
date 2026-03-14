export interface IGetDownloadImageFileResponse {
    statuscode: number;
    message: string;
    data: IGetDownloadImageFileData;
}

export interface IGetDownloadImageFileData {
    FileContents: string;
    ContentType: string;
    FileDownloadName: string;
    LastModified: any;
    EntityTag: any;
    EnableRangeProcessing: boolean;
}

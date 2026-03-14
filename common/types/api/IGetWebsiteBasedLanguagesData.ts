export interface IGetLanguageListResponse {
    statuscode: number;
    message: string;
    data: ILanguageData[];
}

export interface ILanguageData {
    languageguid: string;
    languagename: string;
    languagealias: string;
    culturecode: string;
}

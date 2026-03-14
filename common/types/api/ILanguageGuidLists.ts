// ILanguageGuidLists
export interface ILanguageGuidListsResponse {
    statuscode: number;
    message: string;
    data: ILanguageGuidListsData;
}

export interface ILanguageGuidListsData {
    languagelist: Languagelist[];
    defaultlanguageguid: string;
    languageguid: string;
    resources: Resources;
}

export interface Languagelist {
    languageguid: string;
    languagename: string;
    languagealias: string;
    culturecode: string;
}

export interface Resources {
    selectlanguage: string;
}

export interface IGetOrderMockupData {
    WebsiteGuid: string;
    LanguageGuid: string;
    defaultLanguageGuid: string;
    FilterFromDateName: string;
    FilterFromDateValue: string;
    FilterToDateName: string;
    FilterToDateValue: string;
    FilterEmaillAddress: string;
    FilterEmailAddValue: string;
}

export interface IGetOrderMockupResData {
    fileGuid: string;
    fileName: string;
}

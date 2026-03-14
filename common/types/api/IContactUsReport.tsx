export interface IGetContactUsData {
    Filters: Filter[];
}

export interface Filter {
    FilterFromDateName: string;
    FilterFromDateValue: string;
    FilterToDateName: string;
    FilterToDateValue: string;
    FilterEmailName: string;
    FilterEmailValue: string;
    FilterContactOrderName: string;
    FilterContactOrderValue: string;
    FilterCompanyName: string;
    FilterCompanyValue: string;
    pageNo: string;
    SortName: string;
    ViewName: string;
}

export interface IGetContactUsResData {
    fileGuid: string;
    fileName: string;
}

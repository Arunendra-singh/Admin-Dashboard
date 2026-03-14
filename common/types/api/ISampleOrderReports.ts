export interface ISampleOrderReport {
    Filters: Filter[];
}

export interface Filter {
    UserGuid: string;
    FilterFromDateValue: string;
    FilterToDateValue: string;
    FilterProductValue: string;
    pageNo: string;
    PageSize: string;
}

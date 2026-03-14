export interface ISaveMarcomPageHitsResponseData {
    pageHitGuid: number;
    websiteGuid: string;
    languageGuid: string;
    currencyGuid: string;
    device: string;
    browserData: string;
    pageURL: string;
    guid: string;
    pageName: string;
    name: string;
    sessionId: string;
    action: string;
    mappingGuid: string;
    emailAddress: string;
    productGuid: string;
    actionDetail: string;
    catalogName: string;
    catalogType: string;
    catalogCreatedDate: string;
    productName: string;
    role: string;
    searchType: string;
    to: string;
    pageNo: string;
    searchText: string;
    sortOrder: string;
    sortName: string;
    pageSize: string;
    filterName: string;
    filterValue: string;
    startDate: string;
    endDate: string;
    enabledCatalogTypes: string;
    isActive: string;
    ipAddress: string;
    createdBy: string;
    createdDateUtc: string;
    modifiedBy: string;
    modifiedDateUtc: string
}

export interface MarcomListSendObject {
    Action: string;
    EmailAddress: string;
    ProductGuid: string;
    GUID: string;
    ActionDetail: string;
    CatalogName: string;
    CatalogType: string;
    To: string;
    CreatedBy: boolean;
    ProductName: string;
    PageURL: string;
}

export interface ISaveMarcomPageHitsResponse {
    statuscode: number;
    message: string;
    data: ISaveMarcomPageHitsResponseData[];
}

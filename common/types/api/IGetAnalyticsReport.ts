export interface IGetAnalyticsReports {
    statuscode: number;
    message: string;
    data: AnalyticsReportFromDatabase;
}
export type AnalyticsReportPayload = AnalyticsReportObject[];

export interface AnalyticsReportObject {
    CreatedBy: string;
    StartDate: string;
    EndDate: string;
    CatalogName: string;
    SortName: string;
    PageNo: number;
    Role: string;
    SearchType: string;
    EnabledCatalogTypes: [];
}

export interface AnalyticsReportFromDatabase {
    analyticreport: AnalyticReport[];
    analyticsfilteredcount: number;
    enabledcatalogtypes: [];
    from: number;
    isflipenable: boolean;
    pageno: number;
    pagesize: number;
    randomno: number;
    reportcount: ReportCount;
    summary: string;
    to: number;
    totalcount: number;
}

export interface AnalyticReport {
    addtowishlist: number;
    catalogname: string;
    catalogopen: number;
    catalogshare: number;
    catalogtype: string;
    clicktowebsite: number;
    count: number;
    createdby: string;
    createddate: number;
    email: boolean;
    emailopen: number;
    emailsent: number;
    facebookcount: number;
    firstname: string;
    googlepluscount: number;
    guid: string;
    lastviewed: any;
    linkedincount: number;
    pinterestcount: number;
    previewurl: any;
    productname: any;
    productshare: number;
    to: boolean;
    twittercount: number;
}

export interface ReportCount {
    addtowishlist: number;
    catalogopen: number;
    catalogshare: number;
    clickTowebsite: number;
    emailopen: number;
    emailsent: number;
    flip: number;
    flyer: number;
    pdf: number;
    productshare: number;
}

export interface useGetUserPopupOnCount {
    statuscode: number;
    message: string;
    data: GetCatalogCountUser[];
}
export interface GetCatalogCountUser {
    action: string;
    catalogcreateddate: string;
    emailaddress: string;
    guid: string;
    to: string;
}

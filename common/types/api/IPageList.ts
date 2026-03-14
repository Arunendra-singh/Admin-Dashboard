export interface IPageListResponse {
    pageGuid: string;
    pageType: string;
    image: string;
    pageLayout: string;
    type: string;
    websiteGuid: string;
    layoutGuid: string;
    isAdminCreated: boolean,
    languageGuid: string;
    isDeleted: boolean,
    templateName: string;
    isActive: boolean,
    ipAddress: string;
    createdBy: string;
    createdDateUtc: string;
    modifiedBy: string;
    modifiedDateUtc: string;
}
export interface IPageListPayload {
    PageLayout: string;
    PageType: string;
    Type: string;
    TemplateName: string;
}

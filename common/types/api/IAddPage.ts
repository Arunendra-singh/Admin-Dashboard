export interface IAddPage {
    pageGuid: string,
    pageType: string,
    image: string,
    pageLayout: string,
    type: string,
    websiteGuid: string,
    layoutGuid: string,
    isAdminCreated: boolean,
    languageGuid: string,
    isDeleted: string,
    templateName: string,
    isActive: boolean,
    ipAddress: string,
    createdBy: string,
    createdDateUtc: string,
    modifiedBy: string,
    modifiedDateUtc: string
}
export type AddPagePayload = AddPageObject[];

export interface AddPageObject {
    PageGuid: string,
    PageType: string,
    Image: string,
    PageLayout: string,
    Type: string,
    TemplateName: string
}

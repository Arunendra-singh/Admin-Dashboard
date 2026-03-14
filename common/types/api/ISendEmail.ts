export interface ISendEmail {
    statuscode: number;
    message: string;
    data: any;
}

export type SendEmailDetailPayload = SendEmailDetailObject[];

export interface SendEmailDetailObject {
    EmailTemplateGuid: string;
    CatalogGuid: string;
    EmailTemplateName: string;
    FromEmailId: string;
    CCEmailId: string;
    BCCEmailId: string;
    EmailHeaderFooterGUID: string;
    Subject: string;
    AttachmentFile: string;
    FromName: string;
    HTML: any;
    WebsiteGuid: string;
    LanguageGuid: string;
    Recipient: string;
    RecipientDetails: string;
    FrontInnerImageSrc: string;
    CreatedBy: string;
    CaptchaResponse: string;
}

export interface IGetCatalogEmailTemplateResponse {
    statuscode: number;
    message: string;
    data: IEmailTempalteData;
    urldata: IURLData[];
    resources: IEmailTempalteResources[];
    productskusdata: Productskuobject[];
}

export interface IEmailTempalteData {
    emailtemplateid: string;
    emailtemplateguid: string;
    emailtemplatename: string;
    fromemailid: string;
    ccemailid: string;
    bccemailid: string;
    settingvalue: string;
    emailheaderfooterguid: string;
    languageguid: string;
    subject: string;
    body: string;
    attachmentfile: string;
    ishtml: string;
    isactive: string;
    createddateutc: string;
    createdby: string;
    lastmodifieddateutc: string;
    modifiedby: string;
    emailheaderfooterid: string;
    headerfootername: string;
    html: string;
    name: string;
    emailid: string;
    websiteguid: string;
    recipient: string;
    frontinnerimagesrc: string;
    recipientdetail: string;
    catalogpages: [];
    catalogtype: string;
    layoutimagesrc: string;
    redirect: string;
    websiteurl: string;
    websitename: string;
    catalogname: string;
    fulldescription: string;
    customergroupguids: string;
}

export interface IEmailTempalteResources {
    pageheading: string;
    fromname: string;
    toemail: string;
    fromemail: string;
    subject: string;
    previewtext: string;
    sendemailbuttontext: string;
    message: string;
    strsuccess: string;
    strfail: string;
    pdf: string;
    ppt: string;
    flyer: string;
    flip: string;
    multipleemailstr: string;
    strvalidnamefrom: string;
    strvalidemails: string;
    strvalidsubject: string;
    strvalidemailmessage: string;
    stristrackeronmsg: string;
}

export interface IURLData {
    url: string;
    catalogname: string;
    catalogtype: string;
}
export interface Productskuobject {
    skuGuid: string;
    skuImage: string;
    skuurl: string;
    logoURL: string;
    logoName: string;
    locationJson: string;
    curvature: number;
    rotation: number;
    imprintMethodName: string;
    base64Img: any;
    samelogo: boolean;
    skuImage_OG: string;
}

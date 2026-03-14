export interface IUploadArtWorkResponse {
    statuscode: number;
    message: string;
    data: IUploadArtWorkData;
}

export interface IUploadArtWorkData {
    resources: Resources;
    globalsettings: Globalsettings;
    objartvaultdetails: Objartvaultdetail[];
}

export interface Resources {
    fileextensions: string;
    uploadbuttontext: string;
    maxqtyerrormsg: any;
    setupcharge: any;
}

export interface Globalsettings {
    artvaultimagesize: string;
    ewizaiwebsiteguid: any;
}

export interface Objartvaultdetail {
    isactive: any;
    ipaddress: any;
    createdby: string;
    createddateutc: string;
    modifiedby: any;
    modifieddateutc: any;
    artvaultguid: string;
    artvaultname: string;
    artvaulttype: string;
    artvaulturl: string;
    languageguid: string;
    websiteguid: string;
    sessionguid: string;
    artvaultfilename: string;
    userguid: any;
    isuploadedbyadmin: boolean;
    ismappedtobasket: boolean;
    ppai: any;
    company: any;
    po: any;
    contactname: any;
    emailid: any;
    note: any;
    firstname: any;
    lastname: any;
    address1: any;
    address2: any;
    address3: any;
    city: any;
    state: any;
    zipcode: any;
    country: any;
    phone: any;
    artworkfor: any;
    artworkrelatedtoorder: any;
    orderdate: any;
    artworkfilesname: any;
    artworkfilesurl: any;
    captcharesponse: any;
    filters: any;
    aptsuite: any;
    productcode: any;
    productname: any;
    createddateutcunix: number;
    modifieddateutcunix: number;
}

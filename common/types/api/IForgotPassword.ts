export interface IForgotPasswordProps {
    EmailAddress: string;
    CaptchaResponse: string;
}

export interface IForgotPasswordResponse {
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    logindetails: Logindetail[];
    resources: Resources;
    featuresettings: any;
    globalsettings: any;
}

export interface Logindetail {
    userguid: any;
    emailaddress: string;
    firstname: any;
    middlename: any;
    lastname: any;
    phone: any;
    countryguid: any;
    lastlogin: string;
    languageid: number;
    isactive: boolean;
    roleid: number;
    usergroupid: number;
    usertype: any;
    websiteguid: any;
    rolename: any;
    permissionguids: any;
    permissiondetailguids: any;
    isguestuser: any;
    adminmenu: any;
    rememberme: any;
    rememberexpirationtime: any;
    isotplogin: boolean;
    isphonenumberregister: boolean;
    registrationtype: any;
    lastloginunix: number;
}

export interface Resources {
    "email.notregistered": string;
    "mail.sent": string;
}

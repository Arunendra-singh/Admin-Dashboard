export interface ILoginHandlerProps {
    EmailAddress: string;
    Password: string;
    UserGuid: string;
}
export interface IUserLoginResponse {
    statuscode: number;
    message: string;
    data: UserLoginResponseData;
}

export interface UserLoginResponseData {
    logindetails: Logindetail[];
    resources: Resources;
    featuresettings: Featuresettings;
    globalsettings: Globalsettings;
}

export interface Logindetail {
    userguid: string;
    emailaddress: string;
    firstname: string;
    middlename: any;
    lastname: string;
    phone: string;
    countryguid: string;
    lastlogin: string;
    languageid: number;
    isactive: boolean;
    roleid: number;
    usergroupid: number;
    usertype: string;
    websiteguid: string;
    rolename: string;
    permissionguids: Permissionguid[];
    permissiondetailguids: Permissiondetailguid[];
    isguestuser: any;
    adminmenu: any;
    rememberme: boolean;
    rememberexpirationtime: any;
    isotplogin: boolean;
    isphonenumberregister: boolean;
    registrationtype: any;
    lastloginunix: number;
}

export interface Permissionguid {
    permissionguid: string;
    rights: string;
}

export interface Permissiondetailguid {
    permissionguid: string;
    permissiongroupguid: Permissiongroupguid[];
    permissionresourcekey: string;
    aliasname: string;
    parentpermissionid: any;
    dependentpermissionid: any;
    url: string;
    level: any;
    iconname: any;
    sequence: any;
    controllername: string;
    actionname: string;
    methodname: string;
    isvisible: boolean;
}

export interface Permissiongroupguid {
    permissionguid: string;
    rights: string;
}

export interface Resources {
    "login.success": string;
}

export interface Featuresettings {
    iscompassintegrationenabled: boolean;
    isnavisionfeatureenable: boolean;
    terrytowncustomershippingenable: boolean;
    isfeatureusernameenable: boolean;
    iscustomerautoapproval: boolean;
    isguestuser: boolean;
}

export interface Globalsettings {
    customershippingapiurl: any;
    sapusername: any;
    sappassword: any;
    sapkey: any;
    strloginattempts: string;
}

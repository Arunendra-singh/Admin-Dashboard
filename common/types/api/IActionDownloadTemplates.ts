export interface IActionDownloadTemplatesResponse {
    statuscode: number;
    message: string;
    data: IActionDownloadTemplatesData;
}

export interface IActionDownloadTemplatesData {
    websiteguid: string;
    languageguid: string;
    defaultlanguageguid: any;
    sourcefolder: any;
    amazon_webservice_url: any;
    amazon_webservice_cdnurl: any;
    templatefiles: any;
    productcode: any;
    amazonefilepath: any;
    userguid: string;
    isloggedin: boolean;
    istemplatefound: boolean;
    saas_product_microservice_url: string;
    fileversion: string;
    resource: IActionDownloadTemplatesResource;
}

export interface IActionDownloadTemplatesResource {
    actiondownload_templates: string;
    downloadtemplateuserlogin: string;
}

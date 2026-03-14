import type { ICallOptions, Tokens } from "../types";

declare global {
    interface Window {
        languageuid: string;
        websiteguid: string;
        WebsiteURL: string;
        SiteCssVersion: string;
        cookiedetails: string;
        currencyguid: string;
        tokens: Tokens;

        cdnURL: string;
        betacdnURL: string;
        UserEmail: string;
        UserGuid: string;
        UserType: string;
        SessionGuid: string;
        currencysymbol: string;
        defaultlanguageguid: string;
        defaultcurrencyguid: string;
        FrontEndPermissionGuids: string;
        IsAIFeatureEnabled: boolean;
        IsPromoshopDistributors: boolean;
        RealTimeCADPrice: string;
        RemembermeEmail: string;
        fepermission: string;

        CampaignGuid: string;
        ClientIP: string;
        PopupLabelInfo: string;

        SaaS_Analytics_Microservice_URL: string;
        SaaS_Basket_Microservice_URL: string;
        SaaS_Catalog_Microservice_URL: string;
        SaaS_Configuration_Microservice_URL: string;
        SaaS_ERPIntegration_Microservice_URL: string;
        SaaS_Freight_Microservice_URL: string;
        SaaS_GlobalElements_Microservice_URL: string;
        SaaS_HTMLConfigurator_Microservice_URL: string;
        SaaS_Order_Microservice_URL: string;
        SaaS_Product_Microservice_URL: string;
        SaaS_GlobalElements_URL: string;
        SaaS_ProductAdmin_Microservice_URL: string;
        SaaS_ProductDetails_Microservice_URL: string;
        SaaS_ProductImportExport_Microservice_URL: string;
        SaaS_ProductListing_Microservice_URL: string;
        SaaS_ReviewManagement_Microservice_URL: string;
        SaaS_User_Microservice_URL: string;
        SaaS_Users_Microservice_URL: string;
        SaaS_VirtualSample_Microservice_URL: string;
        SaaS_ControlPanel_Microservice_URL: string;
        SaaS_ProductGE_URL: string;
        SaaS_FtpUpload_Microservice_URL: string;
        CallApi: (options: ICallOptions) => void;
        defaultLazyImgClass: string;
        defaultLazyImgFillColor: string;
    }
}

export {};

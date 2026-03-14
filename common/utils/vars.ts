import { GetCookie } from "./Cookies";
/* eslint-disable prefer-const */
import "./../interfaces/IGlobalVars";
import type { CookieDetails, MicroServices, Tokens } from "../types";

export const CAMPAIGN_GUID = window.CampaignGuid;
export const CDN_URL = window.cdnURL;
export const CLIENT_IP = window.ClientIP;
export let COOKIE_DETAILS_STR = window.cookiedetails;
export let COOKIE_DETAILS: CookieDetails = JSON.parse(window.cookiedetails);
const _CurrencyGuid = window.websiteguid === "B0CDADFD-F477-4E18-94A3-110C470D6097" ? GetCookie("_currencyguid") : GetCookie("currencyguid");
export let CURRENCY_GUID = _CurrencyGuid !== "" ? _CurrencyGuid : window.currencyguid;
export const CURRENCY_GUID_DEFAULT = window.defaultcurrencyguid;
export let CURRENCY_SYMBOL = window.currencysymbol;
const _LanguageGuid = GetCookie("languageuid");
export let LANGUAGE_GUID = _LanguageGuid !== "" ? _LanguageGuid : window.languageuid;
export const LANGUAGE_GUID_DEFAULT = window.defaultlanguageguid;
export const POPUP_LABEL_INFO = window.PopupLabelInfo;
export let SITE_CSS_VERSION = window.SiteCssVersion;
export const STATIC_IMG_DIR = window.cdnURL + "/" + window.websiteguid + "/StaticImages";
export const REACT_APP_API_ENDPOINT = "https://admin.ewizsaas.com/";
export const TOKENS: Tokens = window.tokens;
export let USER_EMAIL = window.UserEmail;
export let USER_GUID = window.UserGuid;
export let USER_TYPE = window.UserType;
export const WEBSITE_GUID = window.websiteguid;
export const WEBSITE_URL = window.WebsiteURL;
export let QUERY_KEY_VERSION = `${window.SiteCssVersion}_${window.languageuid}_${window.currencysymbol}`;
export let SESSION_GUID = window.SessionGuid;
export let RECAPTHCA_KEY = "6LdfDiAoAAAAAGSuz2LqvS_Mqf4rnHBriRLTntpl";
export const FSPERMISSION = window.fepermission;

export const MS_URL: MicroServices = {
    ANALYTICS: window.SaaS_Analytics_Microservice_URL,
    BASKET: window.SaaS_Basket_Microservice_URL,
    CATALOG: window.SaaS_Catalog_Microservice_URL,
    CONFIGURATION: window.SaaS_Configuration_Microservice_URL,
    ERP_INTEGRATION: window.SaaS_ERPIntegration_Microservice_URL,
    FREIGHT: window.SaaS_Freight_Microservice_URL,
    GLOBAL_ELEMENTS: window.SaaS_GlobalElements_Microservice_URL,
    HTML_CONFIGURATOR: window.SaaS_HTMLConfigurator_Microservice_URL,
    ORDER: window.SaaS_Order_Microservice_URL,
    PRODUCT: window.SaaS_Product_Microservice_URL,
    PRODUCT_ADMIN: window.SaaS_ProductAdmin_Microservice_URL,
    PRODUCT_DETAILS: window.SaaS_ProductDetails_Microservice_URL,
    PRODUCT_IMPORT_EXPORT: window.SaaS_ProductImportExport_Microservice_URL,
    PRODUCT_LISTING: window.SaaS_ProductListing_Microservice_URL,
    REVIEW_MANAGEMENT: window.SaaS_ReviewManagement_Microservice_URL,
    USER: window.SaaS_User_Microservice_URL,
    USERS: window.SaaS_Users_Microservice_URL,
    VIRTUAL_SAMPLE: window.SaaS_VirtualSample_Microservice_URL,
    PRODUCT_GE: window.SaaS_ProductGE_URL,
    FTPUPLOAD: window.SaaS_FtpUpload_Microservice_URL,
    CONTROLPANEL: window.SaaS_ControlPanel_Microservice_URL
};

export const SET_COOKIE_DETAILS = (data: CookieDetails): void => {
    Object.keys(COOKIE_DETAILS).forEach((key) => {
        const lowercaseKey = key.toLowerCase();
        if (data[lowercaseKey] !== undefined) {
            COOKIE_DETAILS[key] = data[lowercaseKey];
        }
    });
    COOKIE_DETAILS_STR = JSON.stringify(COOKIE_DETAILS);
    USER_EMAIL = COOKIE_DETAILS.EmailAddress;
    USER_TYPE = COOKIE_DETAILS.UserType;
    USER_GUID = COOKIE_DETAILS.UserGuid;
};

export const INITIAL_COOKIE_DETAILS = '{"UserGuid":null,"EmailAddress":null,"FirstName":null,"MiddleName":null,"LastName":null,"WebsiteURL":null,"SessionGuid":"ea691eb1-ab43-41ad-8ef2-73c6ae2583e0","Phone":null,"CountryGUID":null,"LastLogin":"0001-01-01T00:00:00","LanguageId":0,"IsActive":false,"RoleId":0,"UserType":null,"WebsiteGuid":null,"RoleName":null,"PermissionGuids":null,"PermissionDetailGuids":null,"AdminMenu":null,"IsGuestUser":null,"RememberMe":null,"RememberExpirationTime":null,"IsOrderEdit":false,"EditOrder_CustomerGuid":null,"EditCurrencyGuid":null,"EditOrderGuid":null,"IsOTPLogin":false}';

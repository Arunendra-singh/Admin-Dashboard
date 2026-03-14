import type { ICallOptions, IHeaders } from "../types";
import { COOKIE_DETAILS_STR, CURRENCY_GUID, LANGUAGE_GUID, SITE_CSS_VERSION, TOKENS, WEBSITE_GUID, WEBSITE_URL, LANGUAGE_GUID_DEFAULT, CURRENCY_GUID_DEFAULT } from "./vars";
/**
 * This function is used to fetch data from various MicroServices
 * @author Rohan Gaikwad <rohan.gaikwad@powerweave.com>
 * @example CallApi({
 *  url: SaaS_ProductListing_Microservice_URL + 'api/Products/GetAll'
 *  type: "GET",
 *  headers: {LanguageGuid: LanguageGuid, WebsiteGuid: WebsiteGuid},
 *  isAsync: true,
 *  MicroserviceName: "SaaS_ProductListing_Microservice",
 *  OnSuccess: (data) => console.log(data),
 *  OnError: (data) => console.error(data),
 * })
 */
export const CallApi = (obj: ICallOptions): void => {
    const defaultHeaders = {
        LanguageGuid: LANGUAGE_GUID,
        WebsiteGuid: WEBSITE_GUID,
        "content-type": "application/json;charset=utf-8",
        CookieDetails: COOKIE_DETAILS_STR,
        CurrencyGuid: CURRENCY_GUID,
        WebsiteURL: WEBSITE_URL,
        DefaultLanguageGuid: LANGUAGE_GUID_DEFAULT,
        DefaultCurrencyGuid: CURRENCY_GUID_DEFAULT,
        WebsiteName: WEBSITE_URL
    };

    const xhr = new XMLHttpRequest();
    const { url, type, data, isAsync, headers: _headers } = obj;
    const headers = Object.assign(defaultHeaders, _headers);

    const async = isAsync ?? true;

    if (url.includes(".html")) {
        headers.Accept = "text/html";
    } else {
        const key = obj.MicroserviceName + "_Token";
        headers.Authorization = "Bearer " + TOKENS[key];
    }
    if (SITE_CSS_VERSION !== undefined) {
        headers.SiteCssVersion = SITE_CSS_VERSION;
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let _response = xhr.response;

            if (xhr.status === 200) {
                const responseContentType = xhr.getResponseHeader("content-type") ?? "";
                if (responseContentType.includes("application/json")) {
                    _response = JSON.parse(_response);
                }
                obj.OnSuccess(_response);
            } else {
                obj.OnError?.(_response);
            }
        }
    };

    xhr.open(type, url, async);
    for (const key in headers) {
        const headerVal = headers[key as keyof IHeaders];
        if (headerVal !== "") {
            xhr.setRequestHeader(key, headerVal);
        }
    }
    xhr.send(data);
};
window.CallApi = CallApi;

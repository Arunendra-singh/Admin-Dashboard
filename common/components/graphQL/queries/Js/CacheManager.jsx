import { COOKIE_DETAILS, LANGUAGE_GUID, WEBSITE_GUID, TOKENS, LANGUAGE_GUID_DEFAULT } from "common/utils/vars";

export function UpdateFileVersion () {
    const UrlArray = [];
    const microserviceUrls = {
        SaaS_GlobalElements_Microservice: "https://globalelements.ewizsaas.com/",
        SaaS_Configuration_Microservice: "https://configuration.ewizsaas.com/",
        SaaS_HTMLConfigurator_Microservice: "https://htmlconfigurator.ewizsaas.com/",
        SaaS_ProductAdmin_Microservice: "https://productadmin.ewizsaas.com/",
        SaaS_ProductDetails_Microservice: "https://productdetails.ewizsaas.com/",
        SaaS_ProductImportExport_Microservice: "https://importexport.ewizsaas.com/",
        SaaS_ProductListing_Microservice: "https://Productlisting.ewizsaas.com/",
        SaaS_Product_GlobalElements_Microservice: "https://productge.ewizsaas.com/",
        SaaS_Product_Microservice: "https://product.ewizsaas.com/",
        SaaS_Catalog_Microservice: "https://catalog.ewizsaas.com/"
    };

    Object.keys(microserviceUrls).forEach((key) => {
        if (microserviceUrls[key]) {
            UrlArray?.push({
                key: `${microserviceUrls[key]}api/GlobalSetting/UpdateFileVersioning`,
                val: key
            });
        }
    });

    UrlArray?.forEach((urlObj) => {
        fetch(urlObj?.key, {
            method: "GET",
            headers: {
                WebsiteGuid: WEBSITE_GUID,
                "Content-Type": "application/json;charset=utf-8"
            }
        });
        // .then((response) => response?.json())
        // .then((data) => {})
        // .catch(() => {});
    });
}
export async function ClearCache () {
    const UrlArray = [{ key: "https://admin.ewizsaas.com/", val: "SaaS_ControlPanel_Microservice" }];
    const keys = `Categories_${WEBSITE_GUID}_${LANGUAGE_GUID}`;
    const results = await Promise.all(
        UrlArray.map(async (urlObj) => {
            const url = `${urlObj?.key}home/ClearCacheByKey/${keys}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        LanguageGuid: LANGUAGE_GUID,
                        WebSiteGuid: WEBSITE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                return await response.json();
            } catch {
                return null;
            }
        })
    );

    return results;
}
export async function ClearCacheFeature () {
    const UrlArray = [{ key: "https://admin.ewizsaas.com/", val: "SaaS_ControlPanel_Microservice" }];
    const keys = `GetAllFeatureData_${WEBSITE_GUID}_${LANGUAGE_GUID}`;
    const results = await Promise.all(
        UrlArray.map(async (urlObj) => {
            const url = `${urlObj?.key}home/ClearCacheByKey/${keys}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        LanguageGuid: LANGUAGE_GUID,
                        WebSiteGuid: WEBSITE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                return await response.json();
            } catch {
                return null;
            }
        })
    );

    return results;
}
export async function ClearCacheGlobalsetting () {
    const UrlArray = [{ key: "https://admin.ewizsaas.com/", val: "SaaS_ControlPanel_Microservice" }];
    const keys = `GlobalSettings_${WEBSITE_GUID}_${LANGUAGE_GUID}`;
    const results = await Promise.all(
        UrlArray.map(async (urlObj) => {
            const url = `${urlObj?.key}home/ClearCacheByKey/${keys}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        LanguageGuid: LANGUAGE_GUID,
                        WebSiteGuid: WEBSITE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                return await response.json();
            } catch {
                return null;
            }
        })
    );

    return results;
}
// Function to clear category cache
export async function ClearCategoryCache () {
    // UpdateFileVersion();
    ClearCache();
    const keys = `Categories_${WEBSITE_GUID}_${LANGUAGE_GUID}`;

    const UrlArray = [
        { key: "https://productge.ewizsaas.com/", val: "SaaS_Product_GlobalElements_Microservice" },
        { key: "https://product.ewizsaas.com/", val: "SaaS_Product_Microservice" },
        { key: "https://Productlisting.ewizsaas.com/", val: "SaaS_ProductListing_Microservice" },
        { key: "https://productadmin.ewizsaas.com/", val: "SaaS_ProductAdmin_Microservice" },
        { key: "https://productdetails.ewizsaas.com/", val: "SaaS_ProductDetails_Microservice" },
        { key: "https://importexport.ewizsaas.com/", val: "SaaS_ProductImportExport_Microservice" },
        { key: "https://admin.ewizsaas.com/", val: "SaaS_ControlPanel_Microservice" }
    ];

    const results = await Promise.all(
        UrlArray.map(async (urlObj) => {
            const url = `${urlObj?.key}home/ClearCacheByKey/${keys}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        LanguageGuid: LANGUAGE_GUID,
                        WebSiteGuid: WEBSITE_GUID,
                        CookieDetails: COOKIE_DETAILS,
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                return await response.json();
            } catch {
                return null;
            }
        })
    );

    return results;
}
export async function ClearCacheProductAdmin () {
    const keys = `Categories_${WEBSITE_GUID}_${LANGUAGE_GUID}`;

    const UrlArray = [
        { key: "https://productadmin.ewizsaas.com/", val: "SaaS_ProductAdmin_Microservice" },
        { key: "https://admin.ewizsaas.com/", val: "SaaS_ControlPanel_Microservice" }
    ];

    const results = await Promise.all(
        UrlArray.map(async (urlObj) => {
            const url = `${urlObj?.key}home/ClearCacheByKey/${keys}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        LanguageGuid: LANGUAGE_GUID,
                        WebSiteGuid: WEBSITE_GUID,
                        CookieDetails: JSON.stringify(COOKIE_DETAILS),
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                return await response.json();
            } catch {
                return null;
            }
        })
    );

    return results;
}

// Function to clear global elements cache by key
export function ClearGlobalElementsCacheByKey (Cachekey) {
    if (Cachekey && Cachekey !== "" && Cachekey !== "undefined") {
        const UrlArray = [{ key: "https://globalelements.ewizsaas.com/Home/ClearCacheByKey/" }, { key: "https://globalelements.ewizsaas.com/Home/ClearCacheByKey/" }];

        let Urls = "";
        UrlArray?.forEach((urlObj) => {
            Urls += `<img src='${urlObj?.key}${Cachekey}' alt='' /> `;
        });

        const div = document.createElement("div");
        div.style.display = "none";
        div.innerHTML = Urls;
        document.body.appendChild(div);
    }
}

// Function to update category product count
export async function UpdateCategoryProductCount () {
    const url = "https://importexport.ewizsaas.com/api/ProductImportExport/UpdateCategoriesProductCountNew";
    let check = false;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                WebSiteGuid: WEBSITE_GUID,
                LanguageGuid: LANGUAGE_GUID,
                CookieDetails: JSON.stringify(COOKIE_DETAILS),
                Authorization: `Bearer ${TOKENS.SaaS_ProductImportExport_Microservice_Token}`
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            await response.json(); // Assuming you want to consume the response here
            check = true;
        }
    } catch (error) {
    }

    return check; // Return check to indicate success or failure
}

export async function checkAliasExists (alias) {
    if (!alias) {
        return false;
    }

    try {
        const url = `https://productadmin.ewizsaas.com/api/categories/CheckAliasExists/${alias}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                LanguageGuid: LANGUAGE_GUID,
                WebSiteGuid: WEBSITE_GUID,
                Authorization: `Bearer ${TOKENS.SaaS_ProductAdmin_Microservice_Token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return !!data;
    } catch (error) {
        return false;
    }
}
export async function checkCategory (parentguid) {
    let check;
    if (parentguid !== "") {
        const url = `https://productadmin.ewizsaas.com/api/categories/CheckCategoryhasProducts/${parentguid}`;
        const headers = {
            "Content-Type": "application/json;charset=utf-8",
            LanguageGuid: LANGUAGE_GUID,
            WebSiteGuid: WEBSITE_GUID,
            Authorization: `Bearer ${TOKENS.SaaS_ProductAdmin_Microservice_Token}`
        };

        try {
            const response = await fetch(url, {
                method: "GET",
                headers
            });

            if (response.ok) {
                const data = await response.json();
                check = data;
            } else {
                check = false;
            }
        } catch (error) {}
    } else {
        check = false;
    }

    return check;
}
export async function UpdateCategoriesProductCount (payloadnew) {
    const url = "https://productadmin.ewizsaas.com/api/categories/UpdateCategoriesProductCount";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                WebSiteGuid: WEBSITE_GUID,
                LanguageGuid: LANGUAGE_GUID,
                DefaultLanguageGuid: LANGUAGE_GUID_DEFAULT,
                CookieDetails: JSON.stringify(COOKIE_DETAILS),
                Authorization: `Bearer ${TOKENS.SaaS_ProductAdmin_Microservice_Token}`
            },
            body: JSON?.stringify(payloadnew)
        });

        if (response.ok) {
            await response?.json();
            // const data = await response.json();
            ClearCategoryCache(WEBSITE_GUID, LANGUAGE_GUID, COOKIE_DETAILS);
        } else {
            /* empty */
        }
    } catch (error) {}
}

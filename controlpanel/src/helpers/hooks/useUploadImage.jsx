import { useMutation } from "@tanstack/react-query";
import { CallApi, ObjKeysToLowerCase } from "common/utils";
// import { MS_URL } from "common/utils/vars";

export default function useUploadImage() {
    return useMutation({
        mutationKey: ["UploadImage"],
        mutationFn: async (payload) =>
            new Promise((resolve) => {
                CallApi({
                    // url: `${MS_URL.PRODUCT_LISTING}api/Products/ImageUpload`,
                    url: " https://admin.ewizsaas.com/api/fileupload/UploadFile",
                    type: "POST",
                    data: JSON.stringify(payload),
                    // headers: { WebSiteGuid: websiteguid, LanguageGuid: languageuid, CookieDetails: cookiedetails, CurrencyGuid: currencyguid },
                    MicroserviceName: "SaaS_ProductListing_Microservice_URL",
                    contentType: false,
                    OnSuccess: (res) => {
                        console.log(JSON.parse(res), "?????");
                        const _data = JSON.parse(res);
                        _data.forEach((p, i) => {
                            _data[i] = ObjKeysToLowerCase(p);
                        });
                        resolve(_data);
                    }
                });
            })
    });
}

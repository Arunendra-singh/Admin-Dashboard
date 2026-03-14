/* eslint-disable */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, WEBSITE_GUID, USER_GUID, LANGUAGE_GUID } from "../../../utils/vars";
import type { IUploadImageAPISalesFlyerLogoData, IUploadImageAPISalesFlyerLogoRes } from "~/types/api/IUploadImageAPISalesFlyerLogo";

export function useUploadImageAPISalesFlyerLogo(): UseMutationResult<IUploadImageAPISalesFlyerLogoData, Error, void, unknown> {
    return useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async ({ filename, filesize, qquuid, formData }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/upload/uploadimageAPI?action=add&type=SalesFlyerLogo&WebsiteGuid=${WEBSITE_GUID}&LanguageGuid=${LANGUAGE_GUID}&fileName=${filename}&qquuid=${qquuid}&qqtotalfilesize=${filesize}&qqfile=${filename}&CurrentSlidePosition=1`,
                    type: "POST",
                    headers: { "content-type": "" },
                    data: formData,
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnSuccess: (result: IUploadImageAPISalesFlyerLogoRes) => {
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

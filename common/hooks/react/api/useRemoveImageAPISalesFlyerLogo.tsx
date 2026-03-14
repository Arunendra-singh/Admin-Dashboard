/* eslint-disable */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, WEBSITE_GUID, USER_GUID, LANGUAGE_GUID } from "../../../utils/vars";

export function useRemoveImageAPISalesFlyerLogo(): UseMutationResult<any, Error, void, unknown> {
    return useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async ({ Guid }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/upload/UploadImageAPI?action=remove&type=SalesFlyerLogo&Guid=${Guid}&WebsiteGuid=${WEBSITE_GUID}`,
                    type: "POST",
                    headers: { "content-type": "" },
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    contentType: "multipart/form-data;charset=utf-8",
                    OnSuccess: (result) => {
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

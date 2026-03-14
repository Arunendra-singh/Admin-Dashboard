/* eslint-disable */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IUploadImageAPIData, IUploadImageAPIResponse } from "~/types/api/IUploadImageAPI";
import { CallApi } from "../../../utils";
import { MS_URL, WEBSITE_GUID, USER_GUID, LANGUAGE_GUID } from "../../../utils/vars";

export function useUploadImageAPI(): UseMutationResult<IUploadImageAPIData, Error, void, unknown> {
    return useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async ({ filename, filesize, basketItemGuid, formData }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/upload/uploadimageAPI?action=add&BasketDetailGuid=${basketItemGuid}&WebsiteGuid=${WEBSITE_GUID}&UserGuid=${USER_GUID}&LanguageGuid=${LANGUAGE_GUID}&type=SubmitPO&fileName=${filename}&qquuid=&qqtotalfilesize=${filesize}&qqfile=${filename}&CurrentSlidePosition=1`,
                    type: "POST",
                    headers: { "content-type": "" },
                    data: formData,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (result: IUploadImageAPIResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

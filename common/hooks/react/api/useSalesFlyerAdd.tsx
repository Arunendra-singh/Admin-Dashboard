/* eslint-disable */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IUploadLogoAPIPresentationData, IUploadLogoAPIPresentationRes } from "~/types/api/IUploadLogoAPIPresentation";

export function useSalesFlyerAdd(): UseMutationResult<IUploadLogoAPIPresentationRes, Error, void, unknown> {
    return useMutation({
        mutationKey: ["uploadimagejson"],
        mutationFn: async ({ filename, filesize, qquuid, formData, type }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CONTROLPANEL}api/upload/uploadimagejson?action=add&type=${type}&qqtotalfilesize=${filesize}&qqfile=${filename}`,
                    type: "POST",
                    headers: { "content-type": "" },
                    data: formData,
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnSuccess: (result: IUploadLogoAPIPresentationRes) => {
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            });
        }
    });
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import type { GetCatalogCountUser } from "~/types/api/IGetAnalyticsReport";
import { CallApi } from "../../../utils";
import { LANGUAGE_GUID, MS_URL, WEBSITE_GUID } from "../../../utils/vars";

export function useGetUserPopupOnCountClick(): UseMutationResult<GetCatalogCountUser, Error, void, unknown> {
    return useMutation({
        mutationKey: ["catalogGuid"],
        mutationFn: async ({ catalogGuid, Type, userguid }) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ANALYTICS}api/PageHits/GetDataforPopUp/${catalogGuid}/${Type}/${userguid}`,
                    type: "GET",
                    headers: { LanguageGuid: LANGUAGE_GUID, WebsiteGuid: WEBSITE_GUID, UserGuid: window.UserGuid },
                    MicroserviceName: "SaaS_Analytics_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: GetCatalogCountUser) => {
                        resolve(res);
                    }
                });
            })
    });
}

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { MarcomListSendObject, ISaveMarcomPageHitsResponse } from "~/types/api/ISaveMarcomPageHits";

export function useSaveMarcomPageHits(): UseMutationResult<ISaveMarcomPageHitsResponse, Error, MarcomListSendObject, unknown> {
    return useMutation({
        mutationKey: ["SaveAllPresentationDetails "],
        mutationFn: async (presentationDetailsForm) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ANALYTICS}api/PageHits/SaveMarcommPageHits`,
                    type: "POST",
                    data: JSON.stringify(presentationDetailsForm),
                    MicroserviceName: "SaaS_Analytics_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISaveMarcomPageHitsResponse) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

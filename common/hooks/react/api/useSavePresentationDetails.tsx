import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ISavePresentationDetails, PresentationDetailsPayload } from "~/types/api/ISavePresentationDetails";

export function useSavePresentationDetails(): UseMutationResult<ISavePresentationDetails, Error, PresentationDetailsPayload, unknown> {
    return useMutation({
        mutationKey: ["SaveAllPresentationDetails "],
        mutationFn: async (presentationDetailsForm) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/SaveAllPresentationDetails `,
                    type: "POST",
                    data: JSON.stringify(presentationDetailsForm),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISavePresentationDetails) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

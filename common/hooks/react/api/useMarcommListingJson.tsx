import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { MarcomPresentationPayload, IMarcomPresentation } from "~/types/api/IMarcomPresentation";

export function useMarcommListingJson(): UseMutationResult<IMarcomPresentation, Error, MarcomPresentationPayload, unknown> {
    return useMutation({
        mutationKey: ["MarcommListingPresentation"],
        mutationFn: async (MarcommPresentation) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/MarcommListingJson`,
                    type: "POST",
                    data: JSON.stringify(MarcommPresentation),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IMarcomPresentation) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

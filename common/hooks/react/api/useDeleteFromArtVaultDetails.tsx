import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, SITE_CSS_VERSION } from "../../../utils/vars";
import type { IArtworkDataPayload, IDeleteFromArtVaultResponse } from "~/types/api/IDeleteFromArtVaultDetails";

export function useDeleteFromArtVaultDetails(): UseMutationResult<boolean, Error, IArtworkDataPayload[], unknown> {
    return useMutation({
        mutationKey: ["deleteFromArtVaultDetails", SITE_CSS_VERSION],
        mutationFn: async (payload) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/artvault/DeleteFromArtVaultDetailsAPI`,
                    type: "POST",
                    data: JSON.stringify(payload),
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: (res: IDeleteFromArtVaultResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            })
    });
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
export function useCopyMarcomm(): UseMutationResult<unknown, Error, unknown, unknown> {
    return useMutation({
        mutationKey: ["deleteBasketItem"],
        mutationFn: async (CatalogGuid) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/CopyMarcomm/${CatalogGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: reject,
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            });
        }
    });
}

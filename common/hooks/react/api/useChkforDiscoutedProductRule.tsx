import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useChkforDiscoutedProductRule(): UseMutationResult<boolean, Error, string, unknown> {
    return useMutation({
        mutationKey: ["chkforDiscoutedProductRule"],
        mutationFn: async (promoCode: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT}api/Promotions/ChkforDiscoutedProductRule/${promoCode}`,
                    type: "GET",
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnError: () => reject,
                    OnSuccess: (res: boolean) => {
                        resolve(res);
                    }
                });
            })
    });
}

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IFlyerListingAsyncResponse, IFlyerListingAsyncProps, IFlyerListingAsyncData } from "~/types/api/IFlyerListingAsync";
import { CallApi } from "../../../utils";
import { CURRENCY_SYMBOL, MS_URL } from "../../../utils/vars";

export const useFlyerListingAsync = (type: string): UseMutationResult<IFlyerListingAsyncData, Error, any, unknown> => {
    return useMutation({
        mutationKey: ["FlyerListingAsync", type],
        mutationFn: async (postData: IFlyerListingAsyncProps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/SalesFlyer/FlyerListingAsyncAPI`,
                    type: "POST",
                    headers: { CurrencySymbol: CURRENCY_SYMBOL },
                    data: JSON.stringify(postData),
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: () => reject,
                    OnSuccess: (res: IFlyerListingAsyncResponse) => {
                        if (typeof res !== "string" && res.statuscode === 500) reject(res);
                        else {
                            resolve(res.data);
                        }
                    }
                });
            })
    });
};

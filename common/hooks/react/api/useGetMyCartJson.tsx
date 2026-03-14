import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { BasketListData, BasketListDataResponse } from "~/types/api/IMyCartJson";
import { CallApi } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

export function useGetMyCartJson(cacheTime: number = 5 * 60 * 1000): UseQueryResult<BasketListData, Error> {
    return useQuery({
        queryKey: ["refetchData", "myCartData", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/MyCartJsonAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: BasketListDataResponse) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

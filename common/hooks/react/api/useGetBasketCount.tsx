import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type CountData, type IBasketCountResponse } from "~/types/api/IGetBasketCount";

export function useGetBasketCount(): UseQueryResult<CountData, Error> {
    return useQuery({
        queryKey: ["refetchData", "basketCount", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/BasketCountJson`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: (res: IBasketCountResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            });
        }
    });
}

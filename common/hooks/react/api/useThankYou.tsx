import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IThankYou, IThankYouResponse } from "~/types/api/IThankYouResponse";
import { CallApi, ObjKeysToLowerCase } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

export function useThankYou(orderGUID: string, cacheTime: number = 5 * 60 * 1000): UseQueryResult<IThankYou[], Error> {
    return useQuery({
        queryKey: ["refetchData", "ThankYouData", orderGUID, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/ThankYouPageAPI/${orderGUID}`,
                    type: "GET",
                    headers: {
                        Url: "orderreport"
                    },
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res: IThankYouResponse) => {
                        const _data = ObjKeysToLowerCase(res);
                        resolve(_data.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

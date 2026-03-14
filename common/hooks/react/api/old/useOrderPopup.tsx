import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IOrderPopupResponse, Data } from "~/types/api/IOrderPopup";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { CURRENCY_GUID, MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

export function useOrderPopup(orderId: string, cacheTime: number = 5 * 60 * 1000): UseQueryResult<Data, Error> {
    return useQuery({
        queryKey: ["orderPopup", orderId, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/OrderPopupJson/${orderId}/${CURRENCY_GUID}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IOrderPopupResponse) => {
                        if (res.statusCode === 500) reject(res);
                        else {
                            resolve(ObjKeysToLowerCase(res.data));
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

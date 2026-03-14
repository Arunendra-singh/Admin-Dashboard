import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IBillingAddress, IBillingAddressResponse } from "~/types/api/IGetBillingAddress";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";

export function useGetBillingAddress(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IBillingAddress[], Error> {
    return useQuery({
        queryKey: ["getBillingAddress", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/user/GetBillingAddressAPI`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IBillingAddressResponse) => {
                        if (res.statusCode === 500) reject(res.statusCode);
                        else {
                            resolve(res);
                            // if (_data.billingAddressLists !== undefined) {
                            //     _data?.billingAddressLists?.forEach((p, i) => {
                            //         _data.billingAddressLists[i] = ObjKeysToLowerCase(p);
                            //     });
                            //     resolve(_data.billingAddressLists);
                            // }
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

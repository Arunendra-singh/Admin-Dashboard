import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IGetShippingAddressData, IGetShippingAddressResponse } from "~/types/api/IGetShippingAddress";
import { CallApi } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

export function useGetShippingAddress(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IGetShippingAddressData, Error> {
    return useQuery({
        queryKey: ["getShippingAddress", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/GetAllShippingAddressesAPI`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetShippingAddressResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IWalletTransactionListResponse } from "~/types/api/IWalletTransactions";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, QUERY_KEY_VERSION, USER_GUID } from "../../../../utils/vars";

export function useMyWallet(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IWalletTransactionListResponse, Error> {
    return useQuery({
        queryKey: ["myWalletReport", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetWalletTransactionsOfCustomer/${USER_GUID}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res: IWalletTransactionListResponse) => {
                        if (res.statusCode === 500) reject(res);
                        else {
                            const temp = ObjKeysToLowerCase(res);
                            resolve(temp);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5
    });
}

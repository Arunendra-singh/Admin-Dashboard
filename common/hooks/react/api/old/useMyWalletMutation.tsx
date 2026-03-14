import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IWalletTransactionListResponse } from "~/types/api/IWalletTransactions";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, USER_GUID } from "../../../../utils/vars";

export function useMyWalletMutation(): UseMutationResult<IWalletTransactionListResponse, Error, string, unknown> {
    return useMutation({
        mutationKey: ["useWalletMutation"],
        mutationFn: async (isRefund) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetWalletTransactionsOfCustomer/${USER_GUID}/${isRefund}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res: IWalletTransactionListResponse) => {
                        if (res.statusCode === 500) reject(res);
                        else {
                            const temp = [res];
                            temp.forEach((p, i) => {
                                temp[i] = ObjKeysToLowerCase(p);
                            });
                            resolve(temp[0]);
                        }
                    }
                });
            })
    });
}

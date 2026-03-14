import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IUserOrderFilterDetailsPorps, IUserOrderFilterDetailsResponse } from "~/types/api/IUserOrderFilterDetails";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useUserOrderFilterDetails(): UseMutationResult<IUserOrderFilterDetailsResponse, Error, IUserOrderFilterDetailsPorps, unknown> {
    return useMutation({
        mutationKey: ["useUserOrderFilter"],
        mutationFn: async (productBasketVM: IUserOrderFilterDetailsPorps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/OrderReportFilterDetailsAPI`,
                    type: "POST",
                    data: JSON.stringify(productBasketVM),
                    OnSuccess: (result: IUserOrderFilterDetailsResponse) => {
                        if (result.statusCode === "500") reject(result);
                        else {
                            resolve(result);
                        }
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            })
    });
}

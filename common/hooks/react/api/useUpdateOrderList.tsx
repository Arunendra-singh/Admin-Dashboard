import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function useUpdateOrderList(): UseMutationResult<IReportOrderData, Error, { orderguid: string; status: string }, unknown> {
    return useMutation({
        mutationKey: ["UpdateOrderList"],
        mutationFn: async ({ orderguid, status }: { orderguid: string; status: string }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/UpdateOrderList/${orderguid}/${status}`,
                    type: "POST",
                    isAsync: true,
                    contentType: "application/json;charset=utf-8",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IReportOrderResponse) => {
                        if (res.statusCode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            });
        }
    });
}

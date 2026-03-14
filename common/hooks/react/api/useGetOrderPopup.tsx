import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function GetOrderPopup(): UseMutationResult<IReportOrderData, Error, { orderguid: string }, unknown> {
    return useMutation({
        mutationKey: ["OrderPopup"],
        mutationFn: async ({ orderguid }: { orderguid: string }) => {
            return await new Promise<IReportOrderData>((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/OrderPopup/${orderguid}`,
                    type: "GET",
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

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function GetProductDataFromReOrder(): UseMutationResult<IReportOrderData, Error, { orderguid: string; currencyguid: string; ordernumber: string }, unknown> {
    return useMutation({
        mutationKey: ["GetProductDataFromReOrder"],
        mutationFn: async ({ orderguid, currencyguid, ordernumber }: { orderguid: string; currencyguid: string; ordernumber: string }) => {
            return await new Promise<IReportOrderData>((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/GetProductDataFromReOrder/${orderguid}/${currencyguid}/${ordernumber}`,
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

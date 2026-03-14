import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function useUpdateRequestQuoteStatus(): UseMutationResult<IReportOrderData, Error, { requestQuoteGuid: string; status: string }, unknown> {
    return useMutation({
        mutationKey: ["UpdateRequestQuoteStatus"],
        mutationFn: async ({ requestQuoteGuid, status }: { requestQuoteGuid: string; status: string }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/RequestQuote/UpdateRequestQuoteStatus/${requestQuoteGuid}/${status}`,
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

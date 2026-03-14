import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function useGetOrderReport(PageNo: number, PageSize: number): UseMutationResult<IReportOrderData, Error, string, unknown> {
    return useMutation({
        mutationKey: ["orderReport"],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ReportOrderAPI`,
                    type: "GET",
                    headers: { PageNo, PageSize },
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (result: IReportOrderResponse) => {
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            })
    });
}

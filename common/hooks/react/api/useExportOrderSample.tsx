import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IGetOrderSampleData, IGetOrderSampleResData } from "~/types/api/IGetExportOrderSample";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useExportOrderSample(): UseMutationResult<IGetOrderSampleResData, Error, IGetOrderSampleData, unknown> {
    return useMutation({
        mutationKey: ["ExportOrderSample"],
        mutationFn: async (filterData) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ExportOrderSample`,
                    type: "POST",
                    isAsync: true,
                    data: JSON.stringify(filterData),
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result) => {
                        resolve(result);
                    }
                });
            });
        }
    });
}

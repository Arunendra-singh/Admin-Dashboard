import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IGetOrderMockupData, IGetOrderMockupResData } from "~/types/api/IGetExportOrderMockup";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
export function useExportMockUpOrderReport(): UseMutationResult<IGetOrderMockupResData, Error, IGetOrderMockupData, unknown> {
    return useMutation({
        mutationKey: ["ExportOrderMockup"],
        mutationFn: async (filterData) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ExportMockUpOrderReport`,
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

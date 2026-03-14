import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IGetPurchaseOrderData, IGetPurchaseOrderResData } from "~/types/api/IGetExportPurchaseOrder";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useExportPurchaseOrder(): UseMutationResult<IGetPurchaseOrderResData, Error, IGetPurchaseOrderData, unknown> {
    return useMutation({
        mutationKey: ["ExportPurchaseOrderReport"],
        mutationFn: async (filterData) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ExportPurchaseOrderReport`,
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

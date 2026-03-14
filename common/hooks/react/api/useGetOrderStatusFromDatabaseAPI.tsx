import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IGetOrderStatusFromDatabaseAPIData, IGetOrderStatusFromDatabaseAPIPayload, IGetOrderStatusFromDatabaseAPIResponse } from "~/types/api/IGetOrderStatusFromDatabaseAPI";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useGetOrderStatusFromDatabaseAPI(): UseMutationResult<IGetOrderStatusFromDatabaseAPIData, Error, void, unknown> {
    return useMutation({
        mutationKey: ["GetOrderStatusFromDatabase"],
        mutationFn: async (payload: IGetOrderStatusFromDatabaseAPIPayload) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetOrderStatusFromDatabaseAPI`,
                    type: "POST",
                    data: JSON.stringify(payload),
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (result: IGetOrderStatusFromDatabaseAPIResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            });
        }
    });
}

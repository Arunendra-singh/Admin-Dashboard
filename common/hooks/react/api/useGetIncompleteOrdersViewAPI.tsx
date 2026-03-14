import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useGetIncompleteOrdersView(productCount: number): UseMutationResult<any, Error, string, unknown> {
    return useMutation({
        mutationKey: ["pendingorders"],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/products/GetIncompleteOrdersViewAPI/${productCount}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (result: any) => {
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            })
    });
}

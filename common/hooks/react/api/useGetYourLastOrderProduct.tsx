/* eslint-disable no-undef */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useGetYourLastOrderProduct(ProductCount: string): UseMutationResult<string, Error, string, unknown> {
    return useMutation({
        mutationKey: ["GetYourLastOrderProductAPI"],
        mutationFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetYourLastOrderProductAPI/${ProductCount}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: any) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

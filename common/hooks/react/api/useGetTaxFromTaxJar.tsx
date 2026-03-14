import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { TaxJarAPIPayload } from "~/types/api/IGetTaxFromTaxJar";

export function useGetTaxFromTaxJar(): UseMutationResult<Error, TaxJarAPIPayload, unknown> {
    return useMutation({
        mutationKey: ["GetTaxFromTaxJar"],
        mutationFn: async (postData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetTaxFromTaxJar`,
                    type: "POST",
                    headers: { "content-type": "application/json;charset=utf-8" },
                    data: JSON.stringify(postData),
                    OnSuccess: (result) => {
                        if (result?.statuscode === 500) reject(result?.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            })
    });
}

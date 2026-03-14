import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IGetColorSizeResponse, type Data } from "~/types/api/IGetColorsSize";

export function useColorSize(): UseMutationResult<string, Data[], Error, unknown> {
    return useMutation({
        mutationKey: ["colors"],
        mutationFn: async (payload: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_ADMIN}api/Products/GetProductColorSizeAPI/${payload}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductAdmin_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: IGetColorSizeResponse) => {
                        if (result?.statuscode === 500) reject(result?.message);
                        else resolve(result?.data);
                    },
                    OnError: (err) => {
                        resolve(err);
                    }
                });
            })
    });
}

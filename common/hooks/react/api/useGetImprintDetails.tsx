import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IProductImprintResponse, type IProductImprintData } from "~/types/api/IGetProductImprintResponse";

export function useGetImprintDetails(): UseMutationResult<IProductImprintData, string, Error, unknown> {
    return useMutation({
        mutationKey: ["imprintMethodDetails"],
        mutationFn: async (payload: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/GetImprintMethodDetails/${payload}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: IProductImprintResponse) => {
                        if (result?.statuscode === 500) reject(result?.message);
                        resolve(result?.data);
                    },
                    OnError: (err) => {
                        resolve(err);
                    }
                });
            })
    });
};

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IFilterData, RequestQuoteData } from "~/types/api/IRequestQuote";

export function useMyRequestQuote(): UseMutationResult<RequestQuoteData, Error, IFilterData, unknown> {
    return useMutation({
        mutationKey: ["MyRequestQuote"],
        mutationFn: async (postData) =>
            await new Promise((resolve, reject) => {
                const pagesize = 10;
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ReportRequestQuote`,
                    type: "GET",
                    headers: { pagesize, "content-type": "application/json;charset=utf-8" },
                    data: JSON.stringify(postData),
                    OnSuccess: (result) => {
                        if (result?.statuscode === 500) {
                            reject(result?.message);
                        } else {
                            resolve(result);
                        }
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

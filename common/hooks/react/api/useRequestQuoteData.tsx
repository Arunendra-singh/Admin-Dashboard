import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";
import type { IRequestQuotePayload, IRequestQuoteResponse } from "~/types/api/IRequestQuoteData";

export const useRequestQuoteData = (): UseMutationResult<IRequestQuoteResponse, Error, IRequestQuotePayload, unknown> => {
    return useMutation({
        mutationKey: ["RequestQuoteData"],
        mutationFn: async (uservalues) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/RequestQuotePostApi`,
                    type: "POST",
                    data: JSON.stringify(uservalues),
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: () => reject,
                    OnSuccess: (result: IRequestQuoteResponse) => {
                        if (result?.statusCode === 500) reject(result?.message);
                        else resolve(result);
                    }
                });
            })
    });
};

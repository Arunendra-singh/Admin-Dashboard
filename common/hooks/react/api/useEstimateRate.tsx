import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type IEstimateRate } from "~/types/api/IEstimateRate";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const useEstimateRate = (): UseMutationResult<IEstimateRate, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["useEstimateRate"],
        mutationFn: async (postData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/EstimateRatePost`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    OnSuccess: (result: IEstimateRate) => {
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
};

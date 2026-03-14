import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IPriceCalculation, PriceData } from "~/types/api/IPriceCalculation";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const usePriceCalculation = (): UseMutationResult<PriceData, Error, string, unknown> => {
    const pagesize = 10;
    return useMutation({
        mutationKey: ["PriceCalculation"],
        mutationFn: async (payLoad) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/PricecalculationAPI`,
                    type: "POST",
                    data: JSON.stringify(payLoad),
                    headers: { pagesize },
                    OnSuccess: (result: IPriceCalculation) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
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

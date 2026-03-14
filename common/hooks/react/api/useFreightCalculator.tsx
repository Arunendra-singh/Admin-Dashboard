import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type FreightCalcultorResponse, type FreightCalcultorPayload } from "~/types/api/IFreightCalculator";

export function useFreightCalculator(): UseMutationResult<FreightCalcultorResponse, Error, FreightCalcultorPayload, unknown> {
    return useMutation({
        mutationKey: ["useFreightCalculator"],
        mutationFn: async (FreightValues) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.FREIGHT}api/FreightRates/CalculateFreightAPI`,
                    type: "POST",
                    isAsync: true,
                    data: JSON.stringify(FreightValues),
                    MicroserviceName: "SaaS_Freight_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result?.data);
                    }
                });
            });
        }
    });
}

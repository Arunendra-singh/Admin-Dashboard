import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ProcessAuthTokenPorps } from "~/types/api/IProcessAuthToken";
import { CallApi } from "./../../../../utils";
import { MS_URL } from "./../../../../utils/vars";

export function useProcessAuthToken(): UseMutationResult<any, Error, ProcessAuthTokenPorps, unknown> {
    return useMutation({
        mutationKey: ["ProcessAuthToken"],
        mutationFn: async (payLoad: ProcessAuthTokenPorps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/FaceBookLogin?authprv=${payLoad.provider}&access_token=${payLoad.token}`,
                    type: "GET",
                    OnError: reject,
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: (data: any) => {
                        resolve(data);
                    }
                });
            })
    });
}

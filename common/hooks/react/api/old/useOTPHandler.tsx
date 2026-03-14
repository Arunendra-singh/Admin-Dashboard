import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IOTPHandlerResponse } from "~/types/api/IOTPHandler";
import { CallApi } from "./../../../../utils";
import { MS_URL, SITE_CSS_VERSION } from "./../../../../utils/vars";

export function useOTPHandler(): UseMutationResult<boolean, Error, string, unknown> {
    return useMutation({
        mutationKey: ["OTPHandlerSaveDataJsonAPI", SITE_CSS_VERSION],
        mutationFn: async (mobileNumber: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}mboplgin/Login/${mobileNumber}`,
                    type: "GET",
                    OnError: reject,
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnSuccess: ({ ismobileno_exists: isMobileNoexists }: IOTPHandlerResponse) => {
                        resolve(isMobileNoexists);
                    }
                });
            })
    });
}

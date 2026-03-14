import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IValidateOTPProps, IValidateOTPResponse } from "~/types/api/IValidateOTP";
import { CallApi } from "./../../../../utils";
import { MS_URL } from "./../../../../utils/vars";

export function useValidateOTP(): UseMutationResult<IValidateOTPResponse, Error, IValidateOTPProps, unknown> {
    return useMutation({
        mutationKey: ["ValidateOTPSaveDataJsonAPI"],
        mutationFn: async (payLoad: IValidateOTPProps) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}mbopvdte/Login/${payLoad.otp}/${payLoad.mobileNumber}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: IValidateOTPResponse) => {
                        resolve(result);
                    }
                });
            })
    });
}

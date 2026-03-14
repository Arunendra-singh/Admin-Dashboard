import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IForgotPasswordProps, IForgotPasswordResponse } from "~/types/api/IForgotPassword";

export function useForgotPassword(): UseMutationResult<IForgotPasswordResponse, Error, IForgotPasswordProps, unknown> {
    return useMutation({
        mutationKey: ["ForgotPassword"],
        mutationFn: async (payLoad) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/ForgotPasswordAPI`,
                    type: "POST",
                    MicroserviceName: "SaaS_Users_Microservice",
                    data: JSON.stringify(payLoad),
                    OnSuccess: (result) => {
                        resolve(result);
                    }
                });
            })
    });
}

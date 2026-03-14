import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type IUseResetPassword } from "~/types/api/IUseResetPassword";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const useResetPassword = (): UseMutationResult<IUseResetPassword, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["ResetPassword"],
        mutationFn: async (payLoad) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    type: "POST",
                    url: `${MS_URL.USER}api/ResetPasswordAPI`,
                    data: JSON.stringify(payLoad),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: IUseResetPassword) => {
                        resolve(result);
                    }
                });
            })
    });
};

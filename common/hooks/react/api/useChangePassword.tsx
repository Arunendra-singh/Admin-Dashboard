import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ChangePasswordPorps, ChangePasswordResponse } from "~/types/api/IChangePassword";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useChangePassword(): UseMutationResult<ChangePasswordResponse, Error, ChangePasswordPorps, unknown> {
    return useMutation({
        mutationKey: ["ChangePassword"],
        mutationFn: async (payLoad: ChangePasswordPorps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/ChangePasswordAPI`,
                    type: "POST",
                    data: JSON.stringify(payLoad),
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Users_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            })
    });
}

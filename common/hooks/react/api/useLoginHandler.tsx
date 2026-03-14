import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IUserLoginResponse } from "~/types/api/ILoginHandler";

export const useLoginHandler = (): UseMutationResult<IUserLoginResponse, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["Login"],
        mutationFn: async (payLoad) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/UserLoginAPI`,
                    type: "POST",
                    data: JSON.stringify(payLoad),
                    headers: { "content-type": "application/json;charset=utf-8" },
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: IUserLoginResponse) => {
                        resolve(result);
                    }
                });
            })
    });
};

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IRegistrationPorps, IRegistrationResponse } from "~/types/api/IRegistration";

export const useRegistration = (): UseMutationResult<IRegistrationResponse, Error, IRegistrationPorps, unknown> => {
    return useMutation({
        mutationKey: ["RegisterUserJson"],
        mutationFn: async (registerValues) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/UserRegistrationAPI`,
                    type: "POST",
                    headers: { CookieDetails: "{}" },
                    data: JSON.stringify(registerValues),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (res: IRegistrationResponse) => {
                        resolve(res);
                    }
                });
            })
    });
};

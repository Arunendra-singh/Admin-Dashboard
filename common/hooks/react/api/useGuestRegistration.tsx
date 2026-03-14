import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGuestRegistrationProps, IGuestRegistrationResponse } from "~/types/api/IGuestRegistrationProps";

export const useGuestRegistration = (): UseMutationResult<IGuestRegistrationResponse, Error, IGuestRegistrationProps, unknown> => {
    return useMutation({
        mutationKey: ["GuestRegisterUserJson"],
        mutationFn: async (registerValues) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/GuestCustomerRegistration`,
                    type: "POST",
                    // headers: { CookieDetails: "{}" },
                    data: JSON.stringify(registerValues),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (res: IGuestRegistrationResponse) => {
                        resolve(res);
                    }
                });
            })
    });
};

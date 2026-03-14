import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

type UpdateUserGuidParams = {
    UserGuid: string;
    SessionGuid: string;
};

export function useUpdateUserGuidLogin(): UseMutationResult<unknown, Error, UpdateUserGuidParams> {
    return useMutation({
        mutationKey: ["UserGuidPostLogin"],
        mutationFn: async ({ UserGuid, SessionGuid }: UpdateUserGuidParams) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/UpdateUserGuidPostLogin/${SessionGuid}/${UserGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: resolve
                });
            });
        }
    });
}

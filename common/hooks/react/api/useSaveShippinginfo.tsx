import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useSaveShippingInfo(): UseMutationResult<unknown, Error, unknown> {
    return useMutation({
        mutationKey: ["saveShippingInfo"],
        mutationFn: async (sendSavedShippingInfo) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/SaveShippingInformationAPI`,
                    type: "POST",
                    data: JSON.stringify(sendSavedShippingInfo),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
}

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useValidatePinCode(): UseMutationResult<boolean, Error, number, unknown> {
    return useMutation({
        mutationKey: ["validatePinCode"],
        mutationFn: async (zipcode) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/ValidatePinCode/${zipcode}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (result) => {
                        resolve(true);
                    }
                });
            })
    });
}

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../../utils";
import { COOKIE_DETAILS, MS_URL } from "../../../../utils/vars";

export function useRemoveB2CShippingInformation(): UseMutationResult<boolean, Error, string, unknown> {
    return useMutation({
        mutationKey: ["removeB2CShippingInformation"],
        mutationFn: async (addressGuid) =>
            await new Promise((resolve) => {
                const payload = {
                    AddressGuid: addressGuid
                };
                CallApi({
                    url: `${MS_URL.ORDER}api/order/RemoveB2CShippingInformation/${COOKIE_DETAILS.UserGuid}/${addressGuid}`,
                    type: "POST",
                    data: JSON.stringify(payload),
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
}

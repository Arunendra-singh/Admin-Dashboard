import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { COOKIE_DETAILS, MS_URL } from "./../../../utils/vars";

interface IAddressData {
    shippingFirstName: string;
    shippingLastName: string;
    shippingPhone: string;
    shippingAddress1: string;
    shippingAddress2: string;
    shippingCity: string;
    shippingState: string;
    shippingCountryGUID: string;
    shippingEmailId: string;
    shippingZip: string;
    shippingName: string;
    addressGuid: string;
    shippingISDCode: string;
}

export function useSaveB2CShippingInformation(): UseMutationResult<string, Error, IAddressData, unknown> {
    return useMutation({
        mutationKey: ["saveB2CShippingInformation"],
        mutationFn: async (addressData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/SaveB2CShippingInformation/${COOKIE_DETAILS.UserGuid}`,
                    type: "POST",
                    data: JSON.stringify(addressData),
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res) => {
                        const status = res.split("|")[0];
                        if (status === false) reject(res);
                        else resolve(res);
                    }
                });
            })
    });
}

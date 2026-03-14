import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useDeleteShippingAddress(AddressGuid: string): UseMutationResult<boolean, Error, string, unknown> {
    return useMutation({
        mutationKey: ["deleteShippingAddress"],
        mutationFn: async (AddressGuidVal) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/user/DeleteShippingAddressAPI`,
                    type: "GET",
                    headers: { AddressGuid: AddressGuidVal },
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
}

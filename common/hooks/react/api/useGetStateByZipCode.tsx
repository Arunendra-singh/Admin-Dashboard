import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IZipcodeResponse, IZipcodeData, IZipCodePayload } from "~/types/api/IZipcode";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useGetCityStateAndCountryDetailsByZipCode(): UseMutationResult<IZipcodeData, Error, IZipCodePayload, unknown> {
    return useMutation({
        mutationKey: ["useGetCityStateAndCountryDetailsByZipCode"],
        mutationFn: async ({ zipCode, country }) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetCityStateAndCountryDetailsByZipCodeAPI/${zipCode}/${country}`,
                    type: "GET",
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IZipcodeResponse) => {
                        if (res.statuscode === 200) resolve(res.data);
                        else reject(res);
                    }
                });
            })
    });
}

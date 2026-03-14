/* eslint-disable */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, WEBSITE_GUID, USER_GUID, LANGUAGE_GUID } from "../../../utils/vars";

export function useSaveEmailSalesFlyerAPINew(): UseMutationResult<any, Error, void, unknown> {
    return useMutation({
        mutationKey: ["SaveEmailSalesFlyer"],
        mutationFn: async (payload) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/SalesFlyer/SaveEmailSalesFlyer`,
                    type: "POST",
                    data: JSON.stringify(payload),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

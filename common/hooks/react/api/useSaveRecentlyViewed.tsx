/* eslint-disable no-undef */
import { useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useSaveRecentlyViewed() {
    return useMutation({
        mutationKey: ["SaveRecentlyViewedAPI"],
        mutationFn: async (Guid) => {
            // console.log(Guid, "Guid");
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT}api/RecentlyViewed/SaveRecentlyViewedAPI`,
                    type: "GET",
                    headers: { ProductGuid: Guid },
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Product_Microservice",
                    contentType: "application/json; charset=utf-8"
                });
            });
        }
    });
}

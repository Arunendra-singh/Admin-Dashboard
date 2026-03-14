import { useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IBrowsingHistory } from "~/types/api/IBrowsingHistory";

export function useYourBrowingHistory(browsingHistory: IBrowsingHistory) {
    return useQuery({
        queryKey: ["YourBrowingHistory"],
        enabled: false,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/YourBrowsingHistory`,
                    type: "GET",
                    headers: { IsCarouselEnable: browsingHistory.IsCarouselEnable, ProductCount: browsingHistory.ProductCount, pageno: browsingHistory.pageno, isPagination: browsingHistory.isPagination },
                    OnSuccess: (result: any) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result?.data);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            });
        }
    });
}

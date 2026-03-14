import { useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useGetRelatedToItemsYouHaveViewed(productguid: string) {
    return useQuery({
        queryKey: ["useGetRelatedToItemsYouHaveViewed"],
        enabled: false,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/GetRelatedToItemsYouHaveViewed`,
                    type: "GET",
                    headers: { ProductGuid: productguid, ViewedProductCount: 24 },
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

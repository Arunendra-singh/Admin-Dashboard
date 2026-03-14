import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IGroupDiscount } from "~/types/api/IGetDiscountedCategories";

export function useGetDiscountedCategories(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IGroupDiscount, Error> {
    return useQuery({
        queryKey: ["categoryDiscountMenuData", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetDiscountedCategoriesListAPI`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGroupDiscount) => {
                        if (res.statuscode === 500) reject(res.message);
                        else {
                            resolve(res.data);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime
    });
}

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IGetCategoryMenuResponse, type CategoryMenuData } from "~/types/api/IGetCategoryMenuResponse";

export function useGetCategoryMenu(cacheTime: number = 5 * 60 * 1000): UseQueryResult<CategoryMenuData, Error> {
    return useQuery({
        queryKey: ["categoryMenuData", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/categories/GetCategoryMenuAPI`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetCategoryMenuResponse) => {
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

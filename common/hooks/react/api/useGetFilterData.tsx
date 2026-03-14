import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IFilterResponse, IProductFilter } from "~/types/api/IFilterData";
import type { IFilterData } from "~/types/api/IGetProductsWithOptimizeSearchNew";
import { CallApi } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

export function useGetFilterData(filterData: IFilterData, cacheTime: number = 5 * 60 * 1000): UseQueryResult<IProductFilter, Error> {
    return useQuery({
        queryKey: [filterData, filterData.CategoryGuid, QUERY_KEY_VERSION],
        refetchOnWindowFocus: false,
        enabled: false,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetFiltersJsonAPI`,
                    type: "POST",
                    data: JSON.stringify(filterData),
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnSuccess: (res: IFilterResponse) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else {
                            resolve(res.data?.productfilters);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

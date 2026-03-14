import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { ICategoryDetailResponse, ICategoryDetails } from "~/types/api/IGetCategoriesDetails";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

export function useTopCategoriesDetails(aliasName: string, cacheTime: number = 5 * 60 * 1000): UseQueryResult<ICategoryDetails, Error> {
    return useQuery({
        queryKey: ["categoriesDetails", aliasName, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetCategoriesDetails/${aliasName}`,
                    type: "GET",
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnSuccess: (res: ICategoryDetailResponse) => {
                        if (res.statusCode === 500) reject(res.message);
                        else {
                            const _data = [res.data];
                            _data.forEach((p, i) => {
                                _data[i] = ObjKeysToLowerCase(p);
                            });
                            resolve(_data[0]);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

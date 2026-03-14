import { useInfiniteQuery, type UseInfiniteQueryResult } from "@tanstack/react-query";
import type { IFilterData, ProductListingResponse, ProductListingWithLazyLoadResolve } from "~/types/api/IGetProductsWithOptimizeSearchNew";
import { CallApi } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

export function useGetProductsWithOptimizeSearchNewWithLazyoad(filterData: IFilterData, wishlistCount: number, _totalPages: number, cacheTime: number = 5 * 60 * 1000): UseInfiniteQueryResult<ProductListingWithLazyLoadResolve, Error> {
    return useInfiniteQuery({
        queryKey: ["productListingData", filterData.CategoryGuid, QUERY_KEY_VERSION],
        queryFn: async ({ pageParam = 1 }) => {
            return await new Promise((resolve, reject) => {
                const Filterdata = {
                    ...filterData
                };
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetProductsWithOptimizeSearchNew`,
                    type: "POST",
                    data: JSON.stringify(Filterdata),
                    headers: { WishlistCount: wishlistCount },
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnSuccess: (res: ProductListingResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else {
                            const result = {
                                productData: res?.data?.productlstdata,
                                nextPage: parseInt(pageParam) + 1,
                                totalPages: _totalPages,
                                productCount: res?.data?.productcount
                            };
                            resolve(result);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime, // 5 minutes
        getNextPageParam: (lastPage: any) => {
            if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
            return false;
        }
    });
}

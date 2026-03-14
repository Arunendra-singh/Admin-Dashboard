import { useInfiniteQuery } from "@tanstack/react-query";
import { CallApi } from "common/utils";
// import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "common/utils/vars";
// import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
export function useGetProductListingWithLazyMax(filterData: any, wishlistCount: number, _totalPages: any, cacheTime = 5 * 60 * 1000) {
    return useInfiniteQuery({
        queryKey: ["productListingData", filterData, QUERY_KEY_VERSION],
        queryFn: async ({ pageParam = 1 }) => {
            return await new Promise((resolve, reject) => {
                const filterDataA = filterData;
                filterDataA.PageNo = pageParam;
                const Filterdata = {
                    ...filterDataA
                };
                if (Filterdata.MaxPrice > 0) {
                    CallApi({
                        url: `${MS_URL.PRODUCT_LISTING}api/Products/GetProductsWithOptimizeSearchAPI`,
                        type: "POST",
                        data: JSON.stringify(Filterdata),
                        headers: { WishlistCount: wishlistCount ?? 0 },
                        MicroserviceName: "SaaS_ProductDetails_Microservice",
                        OnSuccess: (res) => {
                            if (res.statuscode === 500) reject(res);
                            else {
                                localStorage.setItem("totalCount", res.totalProductCount);
                                const result = {
                                    productData: res?.data?.productlstdata,
                                    nextPage: parseInt(pageParam) + 1,
                                    totalPages: _totalPages,
                                    productCount: res?.data?.productcount,
                                    resource: res?.data?.resource
                                };
                                resolve(result);
                            }
                        }
                    });
                }
            });
        },
        staleTime: cacheTime, // 5 minutes
        getNextPageParam: (lastPage: any) => {
            if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
            return false;
        }
    });
}

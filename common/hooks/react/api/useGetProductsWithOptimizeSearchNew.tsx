import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type GetProductsWithOptimizeSearchNewResult, type ProductListingResponse, type IFilterData } from "~/types/api/IGetProductsWithOptimizeSearchNew";

export function useGetProductsWithOptimizeSearchNew(filterData: IFilterData, wishlistCount: number, isMediaData: boolean = true, isFurtherDescription: boolean = true, isSKUVM: boolean = true, isEventThemes: boolean = true, isIndustries: boolean = true, cacheTime: number = 5 * 60 * 1000): UseQueryResult<GetProductsWithOptimizeSearchNewResult, Error> {
    return useQuery({
        queryKey: ["refetchData", "productListingData", filterData.CategoryGuid, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                const Filterdata = {
                    ...filterData
                };
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetProductsWithOptimizeSearchAPI`,
                    type: "POST",
                    data: JSON.stringify(Filterdata),
                    headers: { WishlistCount: wishlistCount ?? 0, isMediaData, isFurtherDescription, isSKUVM, isEventThemes, isIndustries },
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnSuccess: (res: ProductListingResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else {
                            let result;
                            if (res.totalProductCount !== undefined) {
                                result = {
                                    resource: res?.data?.resource,
                                    productData: res?.data?.productlstdata,
                                    productcount: res?.data?.productcount,
                                    collectionguids: res?.data?.collectionguids,
                                    totalProductCount: res?.totalProductCount,
                                    pricefilter: res?.pricefilter
                                };
                            } else {
                                result = {
                                    resource: res?.data?.resource,
                                    productData: res?.data?.productlstdata,
                                    productcount: res?.data?.productcount,
                                    collectionguids: res?.data?.collectionguids,
                                    totalProductCount: res?.data.totalProductCount,
                                    pricefilter: res?.data?.pricefilter
                                };
                            }
                            resolve(result);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime, // 5 minutes
        onError: () => {}
    });
}

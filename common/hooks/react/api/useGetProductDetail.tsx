import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IProductDetailsResponse, type IProductDetailsData } from "~/types/api/IProductDetails";

export function useGetProductDetail(ProductGuid: string, WishlistCount: number = 0): UseQueryResult<IProductDetailsData, Error> {
    return useQuery({
        queryKey: ["ProductDetailData", ProductGuid, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/GetProductDetails`,
                    type: "GET",
                    headers: { ProductGuid, WishlistCount },
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnSuccess: (res: IProductDetailsResponse) => {
                        resolve(res.data);
                    },
                    OnError: (reason) => {
                        reject(reason);
                    }
                });
            });
        }
    });
}

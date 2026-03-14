/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import type { IAllSimilarProductsResponse } from "~/types/api/IAllSimilarProducts";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";

export const useGetAllSimilarProducts = (ProductGuid: string, ProductCount: number, wishlistCount: number) => {
    return useQuery({
        queryKey: ["refetchData", ProductGuid, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/similarproducts`,
                    type: "GET",
                    headers: { Productguid: ProductGuid, Productcount: ProductCount, WishlistCount: wishlistCount ?? 0 },
                    OnSuccess: (response: IAllSimilarProductsResponse) => {
                        if (response.statuscode === 500) {
                            reject(response.message);
                        } else {
                            resolve(response.data);
                        }
                    },
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice"
                });
            });
        }
    });
};

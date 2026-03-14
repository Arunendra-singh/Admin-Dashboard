import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import type { IProductWishlistData, IProductWishlistResponse } from "~/types/api/IProductWishlist";

export function useGetProductWishlistJson(postData: any): UseQueryResult<IProductWishlistData, Error> {
    return useQuery({
        queryKey: ["refetchData", "getProductWishlist", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/Wishlist/GetProductWishlistAPI`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    headers: { WishlistCount: 5 },
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IProductWishlistResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else {
                            resolve(res.data);
                        }
                    }
                });
            });
        }
    });
}

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IGetWishlistNamesResponse, Wishlist } from "~/types/api/IGetWishlistNamesResponse";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

export function useGetWishlistNames(cacheTime: number = 5 * 60 * 1000): UseQueryResult<Wishlist[], Error> {
    return useQuery({
        queryKey: ["refetchData", "WishlistNames", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/Wishlist/GetWishlistNameJson`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetWishlistNamesResponse) => {
                        const _data = ObjKeysToLowerCase(res);
                        resolve(_data.wishlist);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

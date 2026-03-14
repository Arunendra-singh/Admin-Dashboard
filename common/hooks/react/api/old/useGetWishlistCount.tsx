import { useQuery } from "@tanstack/react-query";
import { CallApi } from "./../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../../utils/vars";

export function useGetWishlistCount() {
    return useQuery({
        queryKey: ["refetchData", "wishlistCount", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/BasketCountJson`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: ({ statusCode, data, message }) => {
                        if (statusCode === 500) reject(message);
                        else resolve(data);
                    }
                });
            });
        }
    });
}

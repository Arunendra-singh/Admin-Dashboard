import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IPresentationProducts } from "~/types/api/IGetPresentationProducts";
export function useGetPresentationProductsAPI(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IPresentationProducts, Error> {
    return useQuery({
        queryKey: ["PresentationCount", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Presentation/PresentationCount`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IPresentationProducts) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else {
                            resolve(res);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

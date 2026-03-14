import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../utils/vars";

/**
 * @param {number} [cacheTime=5 * 60 * 1000] Default cache time is 5 * 60 * 1000 = 5 minutes
 */
export function useGetSEODetails(cacheTime: number = 5 * 60 * 1000): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: ["SEODetails", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CONFIGURATION}api/Seo/GetSEODetailsAPI`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    OnError: reject,
                    OnSuccess: (res: any) => {
                        resolve(res?.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

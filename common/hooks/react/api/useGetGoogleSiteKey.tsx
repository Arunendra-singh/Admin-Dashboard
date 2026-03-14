import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useGetGoogleSiteKey(): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: [],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/GetGoogleSiteKey`,
                    type: "GET",
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnSuccess: (result) => {
                        resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    }
                });
            });
        }
    });
}

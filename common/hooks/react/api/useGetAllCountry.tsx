import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IGetAllCountryResponse } from "~/types/api/IGetAllCountry";
export function useGetAllCountry(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IGetAllCountryResponse, Error> {
    return useQuery({
        queryKey: ["getCountry", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CONFIGURATION}api/Countries/GetAllCountriesAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetAllCountryResponse) => {
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

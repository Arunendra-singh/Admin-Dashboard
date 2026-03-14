import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import type { IGetWebsiteCurrenciesData, IGetWebsiteCurrenciesResponse } from "~/types/api/IGetWebsiteCurrencies";

export const useGetWebsiteBasedCarrencyData = (): UseQueryResult<IGetWebsiteCurrenciesData, Error> => {
    return useQuery({
        queryKey: ["useCurrencyList", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CONFIGURATION}api/Websites/GetWebsiteCurrenciesAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    OnSuccess: (res: IGetWebsiteCurrenciesResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else resolve(res.data);
                    }
                });
            });
        }
    });
};

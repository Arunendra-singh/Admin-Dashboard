import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IApplicablePromocodes } from "~/types/api/IGetApplicablePromoCodes";
export function useApplicablePromoCodesAPI(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IApplicablePromocodes, Error> {
    return useQuery({
        queryKey: ["getPromoCodes", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/ApplicablePromoCodesAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IApplicablePromocodes) => {
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

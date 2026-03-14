import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IMyGiftOrderReport, IMyGiftOrderReportResponse } from "~/types/api/IMyGiftOrderReport";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

export function useMyGiftOrderReport(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IMyGiftOrderReport[], Error> {
    return useQuery({
        queryKey: ["myGiftOrderReport", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT}api/Promotions/MyGiftOrderReport`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res: IMyGiftOrderReportResponse) => {
                        if (res.status === 500) reject(res);
                        else if (typeof res.data !== "object") reject(res);
                        else {
                            const _data = res.data;
                            _data.forEach((p, i) => {
                                _data[i] = ObjKeysToLowerCase(p);
                            });
                            resolve(_data);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

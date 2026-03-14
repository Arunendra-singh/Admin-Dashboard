import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useImproveYourRecommendations(collectionType: string, pageno: number, pagesize: number): UseQueryResult<string, Error> {
    return useQuery({
        queryKey: ["ImproveYourRecommendations"],
        enabled: false,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/${collectionType}`,
                    type: "GET",
                    headers: { pageno, pagesize, IsConsiderForRecomm: false },
                    isAsync: true,
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: reject,
                    OnSuccess: (res: any) => {
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

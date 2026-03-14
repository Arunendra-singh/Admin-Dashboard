import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IUpdateRecommendations } from "~/types/api/IUpdateRecommendations";

export function useUpdateRecommendation(updateRecommendations: IUpdateRecommendations): UseQueryResult<string, Error> {
    return useQuery({
        queryKey: [updateRecommendations.ProductGuid],
        enabled: false,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/UpdateRecommendation`,
                    type: "GET",
                    headers: { pageno: 1, pagesize: 10, IsConsiderForRecomm: updateRecommendations.IsConsiderForRecomm, ProductGuid: updateRecommendations.ProductGuid, RecommendationType: updateRecommendations.RecommendationType },
                    isAsync: true,
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: reject,
                    OnSuccess: (res: any) => {
                        if (res.statuscode === 500) reject(res.message);
                        else {
                            resolve(res);
                        }
                    }
                });
            });
        }
    });
}

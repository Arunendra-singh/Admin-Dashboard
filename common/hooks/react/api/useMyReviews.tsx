import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useMyReviews(pageno: number): UseQueryResult<number, Error> {
    return useQuery({
        queryKey: ["MyReviews"],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.REVIEW_MANAGEMENT}api/Reviews/MyReviewAPI`,
                    type: "GET",
                    headers: { pageno },
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

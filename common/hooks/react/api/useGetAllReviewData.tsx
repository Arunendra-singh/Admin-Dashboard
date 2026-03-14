import { useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IGetAllReviewDataResponse } from "~/types/api/IGetAllReviewData";

export function useGetAllReviewData(productCode: string) {
    return useQuery({
        queryKey: ["AllReviewData"],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.REVIEW_MANAGEMENT}api/Reviews/GetAllReviewsListAPI`,
                    type: "GET",
                    headers: { IsSeeAll: true, ProductGuid: productCode, pageno: 2, isPagination: true },
                    OnSuccess: (result: IGetAllReviewDataResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result?.data);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_ReviewManagement_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            });
        }
    });
}

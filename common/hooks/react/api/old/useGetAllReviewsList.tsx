import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IGetAllReviewsListResponse, Listreview } from "~/types/api/IGetAllReviewsListResponse";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

interface IFilterData {
    productguid: string;
    productcode: string;
    isReviewPage: boolean;
    isAdvanceReviewListing: string;
}

export function useGetAllReviewsList(filterData: IFilterData, cacheTime: number = 5 * 60 * 1000): UseQueryResult<Listreview[], Error> {
    const { productguid, productcode, isReviewPage, isAdvanceReviewListing } = filterData;
    const isProductData = "true";

    return useQuery({
        queryKey: ["allReviewsList", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.REVIEW_MANAGEMENT}api/Reviews/GetAllReviewsListJson/${productguid}/${productcode}/${isProductData}/${isAdvanceReviewListing}`,
                    type: "POST",
                    headers: { pageno: 1, pagesize: !isReviewPage ? 2 : 20 },
                    MicroserviceName: "SaaS_ReviewManagement_Microservice",
                    OnSuccess: (res: IGetAllReviewsListResponse) => {
                        const _data = [res];
                        _data.forEach((p, i) => {
                            _data[i] = ObjKeysToLowerCase(p);
                        });
                        resolve(_data[0]);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

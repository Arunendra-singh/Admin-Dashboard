import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";
import { type IGetAllQaCategoryProductResponse } from "~/types/api/IGetAllQaCategoryProducts"; // Assuming a similar response interface

const API_URL = `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/GetSearchResultsUsingCodeExpression`; // Corrected URL

export function useGetQACategoryProductData(
    categoryGuid: string = "", // Default value for categoryGuid
    keyword: string = "", // Default search keyword
    cacheTime: number = 5 * 60 * 1000 // Default cache time
): UseQueryResult<IGetAllQaCategoryProductResponse, Error> {
    return useQuery<IGetAllQaCategoryProductResponse, Error>({
        queryKey: ["IGetSearchResults", categoryGuid, keyword],
        queryFn: async () => {
            const url = `${API_URL}?categoryGuid=${categoryGuid}&Keyword=${keyword}`;
            return await new Promise<IGetAllQaCategoryProductResponse>((resolve, reject) => {
                CallApi({
                    url, // GET request URL with parameters
                    type: "GET", // GET request
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetAllQaCategoryProductResponse) => {
                        if (res.statuscode === 200 || res.statuscode === 0) resolve(res);
                        else { reject(new Error()); }
                    }
                });
            });
        },
        staleTime: cacheTime, // Cache the result for 5 minutes
        enabled: keyword !== "" // Only run the query if categoryGuid and keyword are defined
    });
}

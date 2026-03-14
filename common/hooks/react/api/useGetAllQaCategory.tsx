import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";
import { type IGetAllQaCategoryResponse } from "~/types/api/IGetAllQaCategory";

const API_URL = `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/GetCategoryData`; // Updated API URL

export function useGetAllQaCategoryData(
    cacheTime: number = 5 * 60 * 1000 // Default cache time
): UseQueryResult<IGetAllQaCategoryResponse, Error> {
    return useQuery<IGetAllQaCategoryResponse, Error>({
        queryKey: ["GetCategoryData"],
        queryFn: async () => {
            return await new Promise<IGetAllQaCategoryResponse>((resolve, reject) => {
                CallApi({
                    url: API_URL,
                    type: "GET", // Since we're retrieving data
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetAllQaCategoryResponse) => {
                        if (res.statuscode === 500) reject(new Error(`Server error: ${res.statuscode}`));
                        else {
                            resolve(res);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // Cache the result for 5 minutes
    });
}

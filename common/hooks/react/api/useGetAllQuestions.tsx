import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";
import { type IGetAllQuestionsResponse } from "~/types/api/IGetAllQuestions"; // Corrected import

const API_URL = `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/GetFilteredData`; // Corrected the URL

export function useGetAllQuestions(
    pageNo: number = 1,
    searchKey: string = "",
    productGuid: string = "",
    cacheTime: number = 5 * 60 * 1000 // Default cache time
): UseQueryResult<IGetAllQuestionsResponse, Error> {
    return useQuery<IGetAllQuestionsResponse, Error>({
        queryKey: ["IGetAllQuestions", pageNo, searchKey, productGuid],
        queryFn: async () => {
            const requestData = {
                pageNo,
                searchKey,
                productGuid
            };

            return await new Promise<IGetAllQuestionsResponse>((resolve, reject) => {
                CallApi({
                    url: API_URL,
                    type: "POST", // POST request as we are sending data
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    data: JSON.stringify(requestData), // Convert the object to a JSON string
                    OnError: reject,
                    OnSuccess: (res: IGetAllQuestionsResponse) => {
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

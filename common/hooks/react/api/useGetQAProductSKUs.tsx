import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";

export function useGetQAProductSKUs(productGuid: string): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: ["ProductSKUs", productGuid], // Ensure that the query key includes the productGuid for caching
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/GetProductSKUs/${productGuid}`, // Use productGuid in the URL
                    type: "GET",
                    headers: {}, // Add any required headers here
                    isAsync: true,
                    MicroserviceName: "SaaS_ControlPanel_Microservice", // You can adjust this as necessary
                    contentType: "application/json;charset=utf-8",
                    OnError: reject,
                    OnSuccess: (res: any) => {
                        if (res.statuscode === 500) {
                            reject(res.message);
                        } else {
                            resolve(res.data); // Resolve with the desired data
                        }
                    }
                });
            });
        },
        enabled: productGuid !== "" // Ensure that the query only runs if productGuid is available
    });
}

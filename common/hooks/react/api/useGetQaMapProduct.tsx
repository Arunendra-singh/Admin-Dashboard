import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";

interface IQAProductMappingResponse {
    data: any;
    statuscode: number;
    message: string;
}

export function useQAMapProductData(): UseMutationResult<any, Error, string, unknown> {
    return useMutation({
        mutationKey: ["useQAMapProductData"],
        mutationFn: async (QuestionGuid: string) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/MapToProducts/${QuestionGuid}`,
                    type: "POST",
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (err) => {
                        reject(err);
                    },
                    OnSuccess: (res: IQAProductMappingResponse) => {
                        if (res.statuscode === 500) {
                            reject(res.message);
                        } else {
                            resolve(res.data);
                        }
                    }
                });
            });
        }
    });
}

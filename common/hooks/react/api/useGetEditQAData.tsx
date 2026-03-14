import { useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";

export function useGetQuestionData(QuestionGuid: string) {
    return useQuery({
        queryKey: ["QuestionData", QuestionGuid],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/Edit/${QuestionGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    isAsync: true,
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result?.data);
                    },
                    OnError: (err) => {
                        reject(err);
                    }
                });
            });
        }
    });
}

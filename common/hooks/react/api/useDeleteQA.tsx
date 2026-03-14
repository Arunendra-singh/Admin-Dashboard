import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "../../../utils/vars";
import type { IDeleteQAItemResponse } from "~/types/api/IDeleteQAItem";

export function useDeleteQuestionAnswer(QuestionAnswerGuid: string): UseMutationResult<IDeleteQAItemResponse, Error, string, unknown> {
    return useMutation({
        mutationKey: ["deleteQuestionAnswer"],
        mutationFn: async (QuestionAnswerGuidVal) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/DeleteRecord/${QuestionAnswerGuidVal}`,
                    type: "POST",
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    OnSuccess: (res: IDeleteQAItemResponse) => {
                        resolve(res);
                    },
                    OnError: (err) => {
                        reject(err);
                    }
                });
            })
    });
}

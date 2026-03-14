import { useMutation } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { REACT_APP_API_ENDPOINT } from "./../../../utils/vars";

export const useSaveQuestionAnswerData = () => {
    return useMutation({
        mutationKey: ["SaveQuestionAnswerData"],
        mutationFn: async (questionAnswerData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/SaveData`,
                    type: "POST",
                    data: JSON.stringify(questionAnswerData),
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    OnError: () => reject,
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
};

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { REACT_APP_API_ENDPOINT } from "./../../../utils/vars";
import type { IProductQuestionMappingSave, ProductQuestionMappingSavePayload } from "~/types/api/IProductQuestionMappingSave";

export function useSaveQAProductMapping(): UseMutationResult<IProductQuestionMappingSave, Error, ProductQuestionMappingSavePayload, unknown> {
    return useMutation({
        mutationKey: ["productQuestionMappingSave"],
        mutationFn: async (productQuestionMappingDetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${REACT_APP_API_ENDPOINT}api/QuestionAnswer/ProductQuestionMappingSave`,
                    type: "POST",
                    data: JSON.stringify(productQuestionMappingDetails),
                    MicroserviceName: "SaaS_ControlPanel_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IProductQuestionMappingSave) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

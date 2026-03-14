import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type IMultilingualCustomTextResponse } from "~/types/api/IMultilingualCustomTextData";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useGetMultilingualCustomTextData(): UseMutationResult<IMultilingualCustomTextResponse, Error, string, unknown> {
    return useMutation({
        mutationKey: ["getWebsiteBasedLanguagesData"],
        mutationFn: async (customTextGuidList: string) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/CustomText/GetMultilingualCustomTextData`,
                    type: "POST",
                    data: JSON.stringify(customTextGuidList),
                    isAsync: true,
                    MicroserviceName: "SaaS_GlobalElements_Microservice",
                    OnSuccess: (data: IMultilingualCustomTextResponse) => {
                        resolve(data);
                    }
                });
            })
    });
}

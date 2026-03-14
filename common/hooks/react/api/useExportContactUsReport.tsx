import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetContactUsData, IGetContactUsResData } from "~/types/api/IContactUsReport";

export function useContactUsReport(): UseMutationResult<IGetContactUsResData, Error, IGetContactUsData, unknown> {
    return useMutation({
        mutationKey: ["ExportContactUsReport"],
        mutationFn: async (filterData) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/ContactUss/ExportContactUsReport`,
                    type: "POST",
                    isAsync: true,
                    data: JSON.stringify(filterData),
                    MicroserviceName: "SaaS_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result) => {
                        resolve(result);
                    }
                });
            });
        }
    });
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type ISelectedTemplate } from "~/types/api/ISelectedTemplate";

export function useGetSelectedTemplate(): UseMutationResult<ISelectedTemplate, Error, void, unknown> {
    return useMutation({
        mutationKey: ["TemplateGuid"],
        mutationFn: async (TemplateGuid) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Template/GetSelectedTemplate/${TemplateGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISelectedTemplate) => {
                        resolve(res);
                    }
                });
            })
    });
}

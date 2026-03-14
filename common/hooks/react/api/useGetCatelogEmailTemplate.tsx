/* eslint-disable no-undef */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IGetCatalogEmailTemplateResponse } from "~/types/api/IGetCatalogEmailTemplate";

export function useGetCatalogEmailTemplate(): UseMutationResult<IGetCatalogEmailTemplateResponse, Error, string, unknown> {
    return useMutation({
        mutationKey: ["CreateEmailJson"],
        mutationFn: async (catelogGuid: string) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/CreateEmailJson/${catelogGuid}`,
                    type: "GET",
                    isAsync: false,
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: IGetCatalogEmailTemplateResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            });
        }
    });
}

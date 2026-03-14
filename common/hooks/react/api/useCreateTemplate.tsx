import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ICreateTemplatedPayload, ICreateTemplatedResponse } from "~/types/api/ICreateTemplated";

export function useCreateTemplate(): UseMutationResult<ICreateTemplatedResponse, Error, ICreateTemplatedPayload, unknown> {
    return useMutation({
        mutationKey: ["CreateTemplatedata"],
        mutationFn: async (CreateTemplatedatafrom) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Template/CreateTemplateForCatalog`,
                    type: "POST",
                    data: JSON.stringify(CreateTemplatedatafrom),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ICreateTemplatedResponse) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

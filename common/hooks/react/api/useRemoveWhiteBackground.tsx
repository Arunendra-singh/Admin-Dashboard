import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IRemoveWhiteBackground, IRemoveWhiteBackgroundPayload } from "~/types/api/IRemoveWhiteBackground";

export function useRemoveWhiteBackground(): UseMutationResult<IRemoveWhiteBackground, Error, IRemoveWhiteBackgroundPayload, unknown> {
    return useMutation({
        mutationKey: ["sendEmaildetails"],
        mutationFn: async (sendEmaildetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/CatalogRemoveWhiteBackground`,
                    type: "POST",
                    data: JSON.stringify(sendEmaildetails),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IRemoveWhiteBackground) => {
                        resolve(res);
                    }
                });
            })
    });
}

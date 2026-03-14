import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const useSalesflyerGetBase64Image = (): UseMutationResult<string, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["GetBase64"],
        mutationFn: async (imageSrc: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    type: "POST",
                    url: `${MS_URL.CATALOG}api/salesflyer/GetBase64`,
                    data: JSON.stringify({ UrlKey: imageSrc }),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: string) => {
                        resolve(result);
                    }
                });
            })
    });
};

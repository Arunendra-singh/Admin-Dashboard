import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetPresentationCatelog, ProductCatelogPayload } from "~/types/api/IGetPresentationCatelog";

export function useGetCatelogDetails(): UseMutationResult<IGetPresentationCatelog, Error, ProductCatelogPayload, unknown> {
    return useMutation({
        mutationKey: ["GetAllPresentationDetailsJson"],
        mutationFn: async (productPresentation) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Template/GetAllPresentationDetailsJson`,
                    type: "POST",
                    data: JSON.stringify(productPresentation),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IGetPresentationCatelog) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

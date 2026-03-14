import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ProductPresentationPayload, IAddToPresentation } from "~/types/api/IAddToPresentation";

export function useAddToPresentation(): UseMutationResult<IAddToPresentation, Error, ProductPresentationPayload, unknown> {
    return useMutation({
        mutationKey: ["AddToPresentation"],
        mutationFn: async (productPresentation) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Presentation/AddToPresentation`,
                    type: "POST",
                    data: JSON.stringify(productPresentation),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddToPresentation) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

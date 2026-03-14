import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ProductPresentationCatalogPayload, IAddToPresentationCatalog } from "~/types/api/IAddToPresentationCatalog";

export function useAddToPresentationCatalog(): UseMutationResult<IAddToPresentationCatalog, Error, ProductPresentationCatalogPayload, unknown> {
    return useMutation({
        mutationKey: ["AddToPresentationCatalog"],
        mutationFn: async (productPresentationCatalog) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/CatalogDetail`,
                    type: "POST",
                    data: JSON.stringify(productPresentationCatalog),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddToPresentationCatalog) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

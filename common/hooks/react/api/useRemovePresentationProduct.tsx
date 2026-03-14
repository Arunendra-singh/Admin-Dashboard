import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IRemovePresentationProducts, PresentationRemoveProductObject } from "~/types/api/IRemovePresentationProducts";

export function useRemovePresentationProducts(presentationDetailsForm: PresentationRemoveProductObject): UseMutationResult<IRemovePresentationProducts, Error, PresentationRemoveProductObject, unknown> {
    return useMutation({
        mutationKey: ["DeleteProduct", presentationDetailsForm.CatalogGuid, presentationDetailsForm.ProductGuid],
        mutationFn: async (presentationDetailsForm) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/DeleteCatalogProduct/${presentationDetailsForm.CatalogGuid}/${presentationDetailsForm.ProductGuid}`,
                    type: "POST",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IRemovePresentationProducts) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

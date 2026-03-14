import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ISaveEditPresentationProducts, PresentationEditSaveObject } from "~/types/api/ISaveEditPresentationProducts";

export function useSaveEditPresentationProducts(): UseMutationResult<ISaveEditPresentationProducts, Error, PresentationEditSaveObject, unknown> {
    return useMutation({
        mutationKey: ["EditProductUpdate"],
        mutationFn: async (presentationDetailsForm) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/EditProductUpdate`,
                    type: "POST",
                    data: JSON.stringify(presentationDetailsForm),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISaveEditPresentationProducts) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

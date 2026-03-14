import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ISaveThumbnailImage } from "~/types/api/ISaveThumbnailImage";

export function useSaveThumbnailImage(): UseMutationResult<unknown, Error, ISaveThumbnailImage, unknown> {
    return useMutation({
        mutationKey: ["sendEmaildetails"],
        mutationFn: async (sendEmaildetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/SaveThumbnailImage`,
                    type: "POST",
                    data: JSON.stringify(sendEmaildetails),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
}

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IUploadPayload } from "~/types/api/IUploadVSImage";

export function useUploadVSImage(): UseMutationResult<unknown, Error, IUploadPayload, unknown> {
    return useMutation({
        mutationKey: ["UploadimageDetails"],
        mutationFn: async (uploaddetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/UploadVSImage`,
                    type: "POST",
                    data: JSON.stringify(uploaddetails),
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

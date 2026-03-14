import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from ".././../../../utils";
import { MS_URL, SESSION_GUID } from ".././../../../utils/vars";
import type { IImageUploadPayload, IUploadArtworkData, IUploadArtworkResponse } from "~/types/api/IUploadArtWork";

export const useUploadArtWork = (): UseMutationResult<IUploadArtworkData, Error, IImageUploadPayload, unknown> => {
    return useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async ({ filename, filesize, basketItemGuid, formData }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/upload/uploadimageAPI?action=add&BasketDetailGuid=${basketItemGuid}&ArtVaultGuid=&SessionGuid=${SESSION_GUID}&type=ArtWorkFormat&fileName=${filename}&qquuid=9559041c-0a17-49c6-b693-c56f9025a059&qqtotalfilesize=${filesize}&qqfile=${filename}&CurrentSlidePosition=1`,
                    type: "POST",
                    headers: { "content-type": "" },
                    data: formData,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (result: IUploadArtworkResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
};

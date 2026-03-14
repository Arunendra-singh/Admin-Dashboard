import type { IUploadImagesResponse } from "~/types/api/IUploadImage";
import { useMutation } from "@tanstack/react-query";
import { CallApi, ObjKeysToLowerCase } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export const useUploadImage = () => {
    return useMutation({
        mutationKey: ["uploadImage"],
        mutationFn: async (filedata: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetImageURLGUIDAPI`,
                    type: "POST",
                    data: filedata,
                    headers: { Accept: "application/json", "content-type": "" },
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductListing_Microservice_URL",

                    OnSuccess: (res: IUploadImagesResponse) => {
                        const _dataArray = [res.data];
                        _dataArray.forEach((p, i) => {
                            _dataArray[i] = ObjKeysToLowerCase(p);
                        });
                        resolve(_dataArray[0]);
                    }
                });
            })
    });
};

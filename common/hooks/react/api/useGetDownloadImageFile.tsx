/* eslint-disable no-undef */
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetDownloadImageFileResponse } from "~/types/api/IGetDownloadImageFile";

export function useGetDownloadImageFile(): UseMutationResult<IGetDownloadImageFileResponse, Error, any, unknown> {
    return useMutation({
        mutationKey: ["GetDownloadImageFile"],
        mutationFn: async (imageData) => {
            // console.log(imageData, "imageData");
            return await new Promise((resolve, reject) => {
                const FileName = imageData.p_value;
                const ProductName = imageData.productname;
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/DownloadImageFileApi`,
                    type: "GET",
                    headers: { FileName, ImageType: "Products", ImageSize: "HighRes", DownloadFileName: imageData.p_key, ProductName },
                    OnSuccess: (result) => {
                        // console.log(result, "test");
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            });
        }
    });
}

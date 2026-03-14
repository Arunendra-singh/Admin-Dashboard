import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type GetImageURLGUIDResponse } from "~/types/api/IGetImageURLGUID";
import { CallApi } from "./../../../../utils";
import { MS_URL } from "./../../../../utils/vars";

export function useGetImageURLGUID(): UseMutationResult<GetImageURLGUIDResponse, Error, string, unknown> {
    return useMutation({
        mutationKey: ["GetImageURLGUID"],
        mutationFn: async (fileUrl: string) =>
            await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetImageURLGUID?ImageURL=${fileUrl}`,
                    type: "POST",
                    MicroserviceName: "SaaS_ProductListing_Microservice_URL",
                    OnSuccess: (res: GetImageURLGUIDResponse) => {
                        resolve(res);
                    }
                });
            })
    });
}

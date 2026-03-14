import { useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
export function useHighResImageList() {
    return useMutation({
        mutationKey: ["highResImageList"],
        mutationFn: async (ProductGuid: string) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/ActionDownload_ImageListApi/${ProductGuid}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result) => {
                        // console.log(result.data, "result");
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

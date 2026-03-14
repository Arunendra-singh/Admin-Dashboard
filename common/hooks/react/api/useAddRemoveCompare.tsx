import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IAddRemoveCompare } from "~/types/api/IAddRemoveCompare";

export function useAddRemoveCompare(ProductGuid: string): UseMutationResult<string, Error, void, unknown> {
    const postData = {};
    return useMutation({
        mutationKey: ["addRemoveCompare", ProductGuid],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/CompareAddorRemoveApi/${ProductGuid}`,
                    type: "GET",
                    data: JSON.stringify(postData),
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddRemoveCompare) => {
                        if (res.statuscode === 200) resolve(res.message);
                        else reject(res.message);
                    }
                });
            })
    });
}

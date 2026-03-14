import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IAddRemovePresentation } from "~/types/api/IAddRemovePresentation";

export function useAddRemovePresentation(ProductCode: string, addRemove: boolean): UseMutationResult<boolean, Error, void, unknown> {
    const postData = {};
    return useMutation({
        mutationKey: ["addRemovePresentation", ProductCode, addRemove],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/AddPresentationAddorRemoveApi/${ProductCode}/${addRemove ? "true" : "false"}`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddRemovePresentation) => {
                        if (res.statuscode === 200) resolve(addRemove);
                        else reject(res.message);
                    }
                });
            })
    });
}

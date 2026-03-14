import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ICheckInventoryResponse, ICheckInventoryData } from "~/types/api/ICheckInventory";

export function useCheckInventory(ProductGuid: string, ProductCode: string): UseMutationResult<ICheckInventoryData[], Error, void, unknown> {
    return useMutation({
        mutationKey: ["CheckInventory", ProductGuid, ProductCode],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT}api/Products/PromostandardsInventoryApi/${ProductGuid}/${ProductCode}/false/true`,
                    type: "GET",
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ICheckInventoryResponse) => {
                        if (res.statusCode === 200) resolve(res.data);
                        else reject(res.message);
                    }
                });
            })
    });
}

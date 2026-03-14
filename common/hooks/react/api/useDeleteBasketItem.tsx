import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IDeleteBasketItemResponse, IDeleteBasketItemPayload, IDeleteBasketItemData } from "~/types/api/IDeleteBasketItem";

export function useDeleteBasketItem(): UseMutationResult<IDeleteBasketItemData, Error, IDeleteBasketItemPayload, unknown> {
    return useMutation({
        mutationKey: ["deleteBasketItem"],
        mutationFn: async ({ itemGuid, qty }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/DeleteBasketItemAPI/${itemGuid}/${qty}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IDeleteBasketItemResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            });
        }
    });
}

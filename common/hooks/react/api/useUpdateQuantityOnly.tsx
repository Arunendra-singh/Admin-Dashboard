import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UpdateQuantityPorps, UpdateQuantityResponse } from "~/types/api/UpdateQuantityOnly";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useUpdateQuantityOnly(): UseMutationResult<number, Error, UpdateQuantityPorps, unknown> {
    return useMutation({
        mutationKey: ["updateQuantityOnly"],
        mutationFn: async (item: UpdateQuantityPorps) => {
            const header: any = {
                basketDetailGuid: item.basketdetailsguid,
                quantity: item.quantity,
                productguid: item.productguid,
                skuguid: item.skuguid
            };
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/UpdateCartQuantity`,
                    type: "GET",
                    headers: header,
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: UpdateQuantityResponse) => {
                        resolve(parseInt(res.statusCode, 10));
                    }
                });
            });
        }
    });
}

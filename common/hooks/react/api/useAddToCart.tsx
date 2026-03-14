import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ProductBasketDetailVMPayload, IAddToCart } from "~/types/api/IAddToCart";

export function useAddToCart(): UseMutationResult<number, Error, ProductBasketDetailVMPayload, unknown> {
    return useMutation({
        mutationKey: ["addToCart"],
        mutationFn: async (productBasketDetailVM) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/basket/AddToBasketAPI`,
                    type: "POST",
                    data: JSON.stringify(productBasketDetailVM),
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddToCart) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res.statuscode);
                    }
                });
            })
    });
}

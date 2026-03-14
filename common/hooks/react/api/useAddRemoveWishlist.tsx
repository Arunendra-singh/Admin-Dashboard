import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IAddRemoveWishlist } from "~/types/api/IAddRemoveWishlist";

export function useAddRemoveWishlist(productGuid: string, addRemove: boolean): UseMutationResult<boolean, Error, void, unknown> {
    const postData = {
        ProductGuid: productGuid
    };
    return useMutation({
        mutationKey: ["addToCart", productGuid, addRemove],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/Wishlist/AddRemoveWishlistAPI/${addRemove ? "true" : "false"}`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddRemoveWishlist) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(addRemove);
                    }
                });
            })
    });
}

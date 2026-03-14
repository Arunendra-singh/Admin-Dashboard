import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IMoveProducttoDifferentListProps, IMoveProducttoDifferentListResponse } from "~/types/api/IMoveProducttoDifferentList";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { MS_URL } from "../../../../utils/vars";

export function useMoveProducttoDifferentList(): UseMutationResult<IMoveProducttoDifferentListResponse, Error, IMoveProducttoDifferentListProps, unknown> {
    return useMutation({
        mutationKey: ["UpdateWishlistname"],
        mutationFn: async ({ moveTo, productGuid, selectedListName }: IMoveProducttoDifferentListProps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/Wishlist/UpdateWishlistnameJSON/${productGuid}/${moveTo}/${selectedListName}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: (res: IMoveProducttoDifferentListResponse) => {
                        if (res.statusCode === 500) reject(res);
                        else resolve(ObjKeysToLowerCase(res));
                    }
                });
            })
    });
}

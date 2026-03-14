import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type IComparePopUpListData, type IComparePopUpListResponse } from "~/types/api/IComparePopUpList";

interface IComparePopUpListPayload {
    ProductGuid: string;
    IsShowReviewCount: boolean;
    isShowSavePrice: boolean;
    wishlistCount: number;
}

export function useComparePopUpList(payLoad: IComparePopUpListPayload): UseMutationResult<IComparePopUpListData, Error, void, unknown> {
    return useMutation({
        mutationKey: ["ComparePopUpList", payLoad],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/CompareListViewApi`,
                    type: "POST",
                    data: JSON.stringify(payLoad),
                    headers: { WishlistCount: payLoad.wishlistCount },
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (result: IComparePopUpListResponse) => {
                        if (result?.statuscode === 200) resolve(result?.data);
                        else reject(result?.message);
                    }
                });
            })
    });
}

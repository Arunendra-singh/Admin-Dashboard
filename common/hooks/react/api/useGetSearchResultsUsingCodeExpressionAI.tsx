import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { CURRENCY_SYMBOL, MS_URL } from "../../../utils/vars";
import type { IGetSearchResultsUsingCodeExpressionAIData, IGetSearchResultsUsingCodeExpressionAIResponse } from "../../../types/api/IGetSearchResultsUsingCodeExpressionAI";

export function useGetSearchResultsUsingCodeExpressionAI(catGuid: string = "", PageNo: number): UseMutationResult<IGetSearchResultsUsingCodeExpressionAIData[], Error, string, unknown> {
    const header = {
        IsUserLoggedIn: false,
        CurrencySymbol: CURRENCY_SYMBOL,
        categoryGuid: catGuid
    };
    return useMutation({
        mutationKey: ["SearchResultsUsingCodeExpressionAI"],
        mutationFn: async (keyword: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetSearchResultsUsingCodeExpressionAIAPI`,
                    type: "GET",
                    headers: { ...header, Keyword: keyword, pageno: PageNo },
                    isAsync: true,
                    MicroserviceName: "SaaS_Product_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IGetSearchResultsUsingCodeExpressionAIResponse) => {
                        if (res.data === undefined) reject(res.message);
                        else resolve(res.data);
                    }
                });
            })
    });
}

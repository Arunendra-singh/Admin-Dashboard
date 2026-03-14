import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { CURRENCY_SYMBOL, MS_URL } from "../../../utils/vars";
import type { IGetSearchResultsUsingCodeExpressionAIData, IGetSearchResultsUsingCodeExpressionAIResponse } from "../../../types/api/IGetSearchResultsUsingCodeExpressionAI";

export function useGetSearchResultsUsingCodeExpression(keyword: string = ""): UseMutationResult<IGetSearchResultsUsingCodeExpressionAIData[], Error, string, unknown> {
    const header = {
        IsUserLoggedIn: false,
        CurrencySymbol: CURRENCY_SYMBOL
    };
    return useMutation({
        mutationKey: ["SearchResultsUsingCodeExpressionAI"],
        mutationFn: async (keyword: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetSearchResultsUsingCodeExpressionAPI/?Keyword=${keyword}`,
                    type: "GET",
                    headers: { ...header },
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

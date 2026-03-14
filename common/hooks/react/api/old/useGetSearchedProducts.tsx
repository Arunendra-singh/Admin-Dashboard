import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import type { Productlstdaum } from "~/types/api/IGetProductsWithOptimizeSearchNew";
import { MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";
import type { IGetOptimizerSearch } from "~/types/api/IGetOptimizerSearch";

const GetProductGuids = async (searchText: string): Promise<string[]> => {
    const guids: string[] = await new Promise((resolve) => {
        CallApi({
            url: `${MS_URL.PRODUCT_LISTING}api/Products/GetOnlysearchedProductGUID?categoryGuid=&Keyword=${searchText}&PricingRange=`,
            type: "GET",
            MicroserviceName: "SaaS_ProductListing_Microservice",
            OnSuccess: (res: string[]) => {
                resolve(res);
            },
            OnError: () => {
                resolve([]);
            }
        });
    });
    return guids ?? [];
};

export function useGetSearchedProducts(searchText: string, payload: any): UseQueryResult<Productlstdaum[], Error> {
    const searchTerm = searchText.toLocaleLowerCase().trim();
    return useQuery({
        queryKey: ["search", searchTerm, QUERY_KEY_VERSION],
        queryFn: async () => {
            const productGuids = await GetProductGuids(searchText);
            return await new Promise((resolve) => {
                if (productGuids.length > 0) {
                    payload.SearchResults = productGuids.join(",");

                    CallApi({
                        url: MS_URL.PRODUCT_LISTING + "api/Products/GetProductsWithOptimizeSearchAPI",
                        type: "POST",
                        headers: { WishlistCount: 0 },
                        data: JSON.stringify(payload),
                        MicroserviceName: "SaaS_ProductListing_Microservice",
                        OnError: () => {
                            resolve([]);
                        },
                        OnSuccess: (res: IGetOptimizerSearch) => {
                            if (res.statuscode === 500) resolve([]);
                            else resolve(ObjKeysToLowerCase(res.data));
                        }
                    });
                } else {
                    resolve([]);
                }
            });
        }
    });
}

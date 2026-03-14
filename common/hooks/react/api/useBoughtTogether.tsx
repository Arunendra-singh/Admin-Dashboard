import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import { type IBoughtTogetherData, type IBoughtTogetherResponse } from "~/types/api/IBoughtTogether";

export function useBoughtTogether(productguid: string): UseQueryResult<IBoughtTogetherData, Error> {
    const header = {
        ProductGuid: productguid,
        ProductCount: 4,
        IsCarouselEnable: true
    };

    return useQuery({
        queryKey: ["BoughtTogetherData", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/ProductsFrequentlyBoughtTogether`,
                    type: "GET",
                    headers: header,
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
                    OnSuccess: (res: IBoughtTogetherResponse) => {
                        if (res.statuscode === 200) resolve(res.data);
                        else reject(res.message);
                    }
                });
            });
        }
    });
}

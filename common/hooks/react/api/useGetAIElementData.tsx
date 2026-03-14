import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { AiElement, IAiElementResponse } from "~/types/api/IAIElement";
import { CallApi, ObjKeysToLowerCase } from "./../../../utils";
import { MS_URL, QUERY_KEY_VERSION, USER_GUID } from "./../../../utils/vars";

interface IFilterData {
    ElementName: string;
    CollectionName: string;
    City: null;
    PageSize: null;
}

export function useGetAIElementData(filterData: IFilterData, cacheTime: number = 5 * 60 * 1000): UseQueryResult<AiElement[], Error> {
    return useQuery({
        queryKey: ["refetchData", "aIElementData", filterData.ElementName, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                const Filterdata = {
                    PageNo: 1,
                    sort: "",
                    UserGuid: USER_GUID !== "" ? USER_GUID : "",
                    ...filterData
                };
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/AIElements`,
                    type: "POST",
                    data: JSON.stringify(Filterdata),
                    headers: { WishlistCount: 30 },
                    OnError: reject,
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnSuccess: (res: IAiElementResponse) => {
                        if (res.StatusCode === 500) reject(res);
                        else {
                            res.data.forEach((p, i) => {
                                res.data[i] = ObjKeysToLowerCase(p);
                            });
                            resolve(res.data[0]?.productdetails);
                        }
                    }
                });
            });
        }
    });
}

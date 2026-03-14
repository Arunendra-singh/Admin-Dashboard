import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IActionDownloadTemplatesData, IActionDownloadTemplatesResponse } from "~/types/api/IActionDownloadTemplates";

import { CallApi, ObjKeysToLowerCase } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";

export function useGetActionDownloadTemplates(ProductGuid: string, cacheTime: number = 5 * 60 * 1000): UseQueryResult<IActionDownloadTemplatesData, Error> {
    return useQuery({
        queryKey: ["refetchData", "ActionDownloadTemplates", ProductGuid, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_DETAILS}api/Products/ActionDownload_TemplatesApi`,
                    type: "GET",
                    headers: { ProductGuid },
                    OnError: reject,
                    MicroserviceName: "SaaS_ProductDetails_Microservice",
                    OnSuccess: (res: IActionDownloadTemplatesResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else {
                            resolve(ObjKeysToLowerCase(res.data));
                            // res.data.forEach((p, i) => {
                            //     res.data[i] = ObjKeysToLowerCase(p);
                            // });
                            // resolve(res.data[0]?.productdetails);
                        }
                    }
                });
            });
        }
    });
}

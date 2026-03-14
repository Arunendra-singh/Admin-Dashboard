import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetPriceEditJson } from "~/types/api/IGetPriceEditJson";

export function useGetPriceEditAPIJson(CatalogGuid: string): UseMutationResult<IGetPriceEditJson, Error, void, unknown> {
    return useMutation({
        mutationKey: ["CatalogGuid", CatalogGuid],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/GetPriceEditAPIJson/${CatalogGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (result: IGetPriceEditJson) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            })
    });
}

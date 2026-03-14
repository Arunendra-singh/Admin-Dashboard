import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useResetBulkPrice(CatalogGuid: string): UseMutationResult<unknown, Error, void, unknown> {
    return useMutation({
        mutationKey: ["CatalogGuid", CatalogGuid],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/ResetBulkPrice?CatalogGuid=${CatalogGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (err) => {
                        reject(err);
                    },
                    OnSuccess: (res) => {
                        resolve(200);
                    }
                });
            })
    });
}

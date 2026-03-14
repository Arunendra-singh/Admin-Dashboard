import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useDeleteMarcomm(): UseMutationResult<unknown, Error, string, unknown> {
    return useMutation({
        mutationKey: ["categorieguid"],
        mutationFn: async (catelogGuid: string) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/DeleteMarcomm/${catelogGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (err) => {
                        reject(err);
                    },
                    OnSuccess: (res) => {
                        resolve(200);
                    }
                });
            });
        }
    });
}

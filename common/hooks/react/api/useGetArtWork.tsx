import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, SITE_CSS_VERSION } from "../../../utils/vars";
import type { IUploadArtWorkData, IUploadArtWorkResponse } from "~/types/api/IArtVaultApi";

export function useGetArtWork(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IUploadArtWorkData, Error> {
    return useQuery({
        queryKey: ["getArtWork", SITE_CSS_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/artvault/ArtVaultAPI`,
                    type: "GET",
                    // headers: { artVaultGuid },
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnError: reject,
                    OnSuccess: (res: IUploadArtWorkResponse) => {
                        if (res.statuscode === 500) reject(res.message);
                        else resolve(res.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

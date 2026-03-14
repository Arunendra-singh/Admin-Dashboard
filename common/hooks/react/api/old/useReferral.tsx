import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IReferral, IReferralResponse } from "~/types/api/IReferral";
import { CallApi, ObjKeysToLowerCase } from "../../../../utils";
import { COOKIE_DETAILS_STR, MS_URL, QUERY_KEY_VERSION } from "../../../../utils/vars";

export function useReferral(cacheTime: number = 5 * 60 * 1000): UseQueryResult<IReferral, Error> {
    return useQuery({
        queryKey: ["referral", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/MyReferrals`,
                    type: "GET",
                    headers: { WishlistCount: 0, CookieDetails: COOKIE_DETAILS_STR },
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnSuccess: (res: IReferralResponse) => {
                        if (res.statusCode === "500") reject(res);
                        else {
                            const _data = ObjKeysToLowerCase(res.data);
                            resolve(_data);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

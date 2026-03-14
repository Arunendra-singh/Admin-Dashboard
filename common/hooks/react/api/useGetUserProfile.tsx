/* eslint-disable no-undef */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { COOKIE_DETAILS, MS_URL, QUERY_KEY_VERSION, USER_GUID } from "../../../utils/vars";
import { type UserProfileResponse } from "~/types/api/iGetUserProfile";

export function useGetUserProfile(isEnabled = true): UseQueryResult<UserProfileResponse[], Error> {
    return useQuery({
        queryKey: ["getUserProfile", USER_GUID, QUERY_KEY_VERSION],
        enabled: isEnabled,
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/GetUserProfileAPI/${COOKIE_DETAILS.UserGuid}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: () => reject,
                    OnSuccess: (result: UserProfileResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

/* eslint-disable no-undef */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useGetAddOrDeleteUserInterestedInAPI(): UseMutationResult<string, Error, string, unknown> {
    return useMutation({
        mutationKey: ["GetAddOrDeleteUserInterestedInAPI`,"],
        mutationFn: async (addDeleteInterested) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/categories/
                    AddOrDeleteUserInterestedInAPI`,
                    type: "GET",
                    data: JSON.stringify(addDeleteInterested),
                    isAsync: true,
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: any) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

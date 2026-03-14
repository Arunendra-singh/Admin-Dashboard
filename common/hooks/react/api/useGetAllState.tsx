/* eslint-disable no-undef */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import { type StateData, type IGetAllStateResponse } from "~/types/api/IGetAllState";

export function useGetAllState(): UseMutationResult<StateData[], Error, string, unknown> {
    return useMutation({
        mutationKey: ["GetAllStatesAPI"],
        mutationFn: async (countryGuid: string) => {
            // console.log(countryGuid, "countryGuid");
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CONFIGURATION}api/States/GetAllStatesAPI/${countryGuid}`,
                    type: "GET",
                    isAsync: true,
                    MicroserviceName: "SaaS_Configuration_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnSuccess: (result: IGetAllStateResponse) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            });
        }
    });
}

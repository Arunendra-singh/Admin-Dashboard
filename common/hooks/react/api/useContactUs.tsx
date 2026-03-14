import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IContactUsPorps, IContactUsResponse } from "~/types/api/IContactUs";

export function useContactUs(): UseMutationResult<IContactUsResponse, Error, IContactUsPorps, unknown> {
    return useMutation({
        mutationKey: ["ContactUsSaveDataJsonAPI"],
        mutationFn: async (contactsValues) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/ContactUss/ContactUsSaveDataAPI`,
                    type: "POST",
                    data: JSON.stringify(contactsValues),
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_GlobalElements_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            });
        }
    });
}

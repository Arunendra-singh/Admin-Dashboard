/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
// import type { IRemoveTemplated } from "~/types/api/IRemoveTemplated";

export function useRemovePages(): UseMutationResult<unknown, Error, void, unknown> {
    return useMutation({
        mutationKey: ["removepage"],
        mutationFn: async ({ PageType, PageGuid, Type, Orientation }) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Page/RemovePages/${PageType}/${PageGuid}/${Type}/${Orientation}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            });
        }
    });
}

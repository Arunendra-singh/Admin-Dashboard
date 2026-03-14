import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IPageListPayload, IPageListResponse } from "~/types/api/IPageList";

export function usePageList(): UseMutationResult<IPageListResponse, Error, IPageListPayload, unknown> {
    return useMutation({
        mutationKey: ["PageList"],
        mutationFn: async (PageListfrom) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Template/PageLists`,
                    type: "POST",
                    data: JSON.stringify(PageListfrom),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IPageListResponse) => {
                        resolve(res);
                    }
                });
            })
    });
}

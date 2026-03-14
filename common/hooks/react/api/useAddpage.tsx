import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { AddPagePayload, IAddPage } from "~/types/api/IAddPage";

export function useAddpage(): UseMutationResult<IAddPage, Error, AddPagePayload, unknown> {
    return useMutation({
        mutationKey: ["AddPage"],
        mutationFn: async (AddPage) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Page/AddPages`,
                    type: "POST",
                    data: JSON.stringify(AddPage),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IAddPage) => {
                        resolve(res);
                    }
                });
            })
    });
}

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { SaveCatelogPayload, ISaveNewTemplated } from "~/types/api/ISaveNewTemplated";

export function useSaveNewTemplated(): UseMutationResult<ISaveNewTemplated, Error, SaveCatelogPayload, unknown> {
    return useMutation({
        mutationKey: ["savenewtemplated "],
        mutationFn: async (savenewtemplated) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Template/EditTemplate`,
                    type: "POST",
                    data: JSON.stringify(savenewtemplated),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISaveNewTemplated) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetGlobalSettings, GlobalSettingsPayload } from "~/types/api/IGetGlobalSettings";

export function useGetGlobalSettings(): UseMutationResult<IGetGlobalSettings, Error, GlobalSettingsPayload, unknown> {
    return useMutation({
        mutationKey: ["GetGlobalSettingForCatalog "],
        mutationFn: async (globalSettingForm) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/GetGlobalSettingForCatalog `,
                    type: "POST",
                    data: JSON.stringify(globalSettingForm),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IGetGlobalSettings) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

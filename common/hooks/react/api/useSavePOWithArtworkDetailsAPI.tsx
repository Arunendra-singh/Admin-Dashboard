import type { ISavePOWithArtworkDetailsResponse } from "~/types/api/ISavePOWithArtworkDetails";
import { useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, USER_GUID } from "../../../utils/vars";

export const useSavePOWithArtworkDetailsAPI = (): UseMutationResult<string, Error, void, unknown> => {
    return useMutation({
        mutationKey: ["SavePOWithArtworkDetails"],
        mutationFn: async (filedata: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/SavePOWithArtworkDetailsAPI/${USER_GUID}`,
                    type: "POST",
                    data: filedata,
                    headers: { Accept: "application/json", "content-type": "application/json;charset=utf-8" },
                    isAsync: true,
                    MicroserviceName: "SaaS_ProductListing_Microservice_URL",
                    OnSuccess: (res: ISavePOWithArtworkDetailsResponse) => {
                        resolve(res.data);
                    }
                });
            })
    });
};

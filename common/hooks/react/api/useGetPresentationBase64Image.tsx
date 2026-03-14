import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IGetPresentationBase64Res, IGetPresentationBase64Req } from "~/types/api/IGetPresentationBase64Image";

export function useGetPresentationBase64Image(): UseMutationResult<IGetPresentationBase64Res, Error, IGetPresentationBase64Req, unknown> {
    return useMutation({
        mutationKey: ["GetBase64API"],
        mutationFn: async (imageURL) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/GetBase64API`,
                    type: "POST",
                    data: JSON.stringify(imageURL),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IGetPresentationBase64Res) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

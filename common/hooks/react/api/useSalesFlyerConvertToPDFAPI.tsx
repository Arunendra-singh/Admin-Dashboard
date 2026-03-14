import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

interface ISalesFlyerConvertToPDFAPIPayload {
    EmailGuid: string;
    imgfinalcount: string;
}

export const useSalesFlyerConvertToPDFAPI = (): UseMutationResult<string, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["ConvertToPDF"],
        mutationFn: async (payload: ISalesFlyerConvertToPDFAPIPayload) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    type: "POST",
                    headers: { EmailGuid: payload?.EmailGuid, imgfinalcount: payload?.imgfinalcount },
                    url: `${MS_URL.CATALOG}api/SalesFlyer/ConvertToPDFAPI`,
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg: string) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: string) => {
                        resolve(result);
                    }
                });
            })
    });
};

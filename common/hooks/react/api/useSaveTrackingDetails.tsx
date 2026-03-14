import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function SaveTrackingDetails(): UseMutationResult<string, Error, unknown> {
    return useMutation({
        mutationKey: ["SaveTrackingDetails"],
        mutationFn: async (payLoad) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/SaveTrackingDetails`,
                    type: "POST",
                    data: JSON.stringify(payLoad),
                    contentType: "application/json;charset=utf-8",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (res: string) => {
                        if (res === "") reject(res);
                        else resolve(res);
                    }
                });
            });
        }
    });
}

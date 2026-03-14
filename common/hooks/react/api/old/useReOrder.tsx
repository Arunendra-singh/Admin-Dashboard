import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../../utils";
import { MS_URL } from "../../../../utils/vars";

export function useReOrder(): UseMutationResult<string, Error, string, unknown> {
    return useMutation({
        mutationKey: ["reOrder"],
        mutationFn: async (orderGuid) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/POSReOrder/${orderGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: string) => {
                        resolve(res);
                    }
                });
            })
    });
}

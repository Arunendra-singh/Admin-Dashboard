import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function usePrintData(): UseMutationResult<string, Error, { orderguid: string; userguid: string }, unknown> {
    return useMutation({
        mutationKey: ["SendShippingEmailWithPDF"],
        mutationFn: async ({ orderguid, userguid }: { orderguid: string; userguid: string }) => {
            return await new Promise<string>((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/Order/SendShippingEmailWithPDF/${orderguid}/${userguid}/null/true`,
                    type: "POST",
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: reject,
                    OnSuccess: (res: string) => {
                        resolve(res);
                    }
                });
            });
        }
    });
}

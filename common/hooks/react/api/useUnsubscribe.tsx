import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ISubscriptionPayload } from "~/types/api/ISubscription";

export function useUnsubscribe(): UseMutationResult<any, Error, ISubscriptionPayload, unknown> {
    return useMutation({
        mutationKey: ["UpdateUseUnsubscribeJson"],
        mutationFn: async (subscription: ISubscriptionPayload) => {
            return await new Promise((resolve) => {
                CallApi({
                    url: `${MS_URL.USER}api/NewsLetter/ManageNewsletterSubscription`,
                    type: "POST",
                    data: JSON.stringify(subscription),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            });
        }
    });
}

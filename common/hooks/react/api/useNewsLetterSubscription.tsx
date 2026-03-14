import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, SITE_CSS_VERSION } from "../../../utils/vars";
import type { INewsLetterSubscriptionProps, INewsLetterSubscriptionResponse } from "~/types/api/INewsLetterSubscription";

export const useNewsLetterSubscription = (): UseMutationResult<number, Error, INewsLetterSubscriptionProps, unknown> => {
    return useMutation({
        mutationKey: ["NewsLetterSubscription", SITE_CSS_VERSION],
        mutationFn: async (registerValues) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/NewsLetter/NewsLetterSubscriptionAPI`,
                    type: "POST",
                    data: JSON.stringify(registerValues),
                    MicroserviceName: "SaaS_Users_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: INewsLetterSubscriptionResponse) => {
                        if (res.statusCode === 500) reject(res.statusCode);
                        else {
                            resolve(res);
                        }
                    }
                });
            })
    });
};

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ISendInvitationProps } from "~/types/api/ISendInvitation";
import { CallApi } from "../../../../utils";
import { SITE_CSS_VERSION } from "../../../../utils/vars";

export function useSendInvitation(): UseMutationResult<string, Error, ISendInvitationProps, unknown> {
    return useMutation({
        mutationKey: ["sendinvitation", SITE_CSS_VERSION],
        mutationFn: async (itemGuid: ISendInvitationProps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: "https://b2cuserbeta.ewizsaas.com/api/User/SendInvitation",
                    type: "POST",
                    data: JSON.stringify(itemGuid),
                    MicroserviceName: "SaaS_User_Microservice",
                    OnError: reject,
                    OnSuccess: (res: string) => {
                        resolve(res);
                    }
                });
            })
    });
}

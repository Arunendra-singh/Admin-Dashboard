import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { SendEmailDetailPayload, ISendEmail } from "~/types/api/ISendEmail";

export function useSaveEmailDetails(): UseMutationResult<ISendEmail, Error, SendEmailDetailPayload, unknown> {
    return useMutation({
        mutationKey: ["sendEmaildetails"],
        mutationFn: async (sendEmaildetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/SaveEmailDetailsJson`,
                    type: "POST",
                    data: JSON.stringify(sendEmaildetails),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: ISendEmail) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IMicroserviceName } from "~/types";
import { type IUseSendEmail, type IUserSendMailProps } from "~/types/api/IUseSendEmail";

export const UseSendEmail = (): UseMutationResult<IUseSendEmail, Error, IUserSendMailProps, unknown> => {
    return useMutation({
        mutationKey: ["useSendEmail"],
        mutationFn: async ({ postData, endPoint, baseUrl, serviceName }: IUserSendMailProps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL[baseUrl]}api/Products/${endPoint}`,
                    type: "POST",
                    isAsync: true,
                    data: JSON.stringify(postData),
                    MicroserviceName: serviceName as IMicroserviceName,
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result: IUseSendEmail) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            })
    });
};

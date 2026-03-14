import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useMultilingual(): UseMutationResult<any, Error, string, unknown> {
    return useMutation({
        mutationFn: async (payLoad: string) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.FTPUPLOAD}api/Globalization/GetPageResourceList/${payLoad}`,
                    type: "POST",
                    OnSuccess: (result) => {
                        resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Users_Microservice",
                    contentType: "multipart/form-data;charset=utf-8"
                });
            })
    });
}

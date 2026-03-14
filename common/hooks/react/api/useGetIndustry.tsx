import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
export function useGetIndustry(): UseMutationResult<string, Error, string, unknown> {
    return useMutation({
        mutationKey: ["industry"],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/User/GetIndustryAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_Users_Microservice",
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

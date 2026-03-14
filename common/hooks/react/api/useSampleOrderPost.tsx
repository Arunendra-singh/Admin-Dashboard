import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type IUserSampleOrderFilter } from "~/types/api/IUserSampleOrderFilter";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const UserSampleOrderFilter = (): UseMutationResult<IUserSampleOrderFilter, Error, string, unknown> => {
    return useMutation({
        mutationKey: ["useSampleOrderFilter"],
        mutationFn: async (postData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/OrderSamplePostApi`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    OnSuccess: (result: IUserSampleOrderFilter) => {
                        // if (result.statuscode === 500) reject(result);
                        // else {
                        //     resolve(result);
                        // }
                        if (result?.statuscode === 500) reject(result?.message);
                        else resolve(result);
                    },
                    OnError: (err) => {
                        reject(err);
                    },
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            })
    });
};

import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { IPlaceOrderPayload } from "~/types/api/IPlaceOrder";

export const usePlaceOrder = (): UseMutationResult<number, Error, IPlaceOrderPayload, unknown> => {
    return useMutation({
        mutationKey: ["placeOrder"],
        mutationFn: async (postData) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/SaveOrdersdataAPI`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: reject,
                    OnSuccess: (res) => {
                        if (res.statuscode === "500") reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
};

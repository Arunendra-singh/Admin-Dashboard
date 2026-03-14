import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ICheckOutPagePricingPorps, ICheckOutPagePricingResponseNoGateway, ICheckoutPricingResult } from "~/types/api/ICheckOutPagePricing";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export function useCheckOutPagePricing(): UseMutationResult<ICheckoutPricingResult, Error, ICheckOutPagePricingPorps, unknown> {
    return useMutation({
        mutationKey: ["checkOutPagePricing"],
        mutationFn: async (checkoutPricingObj: ICheckOutPagePricingPorps) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/CheckOutPagePricingJson`,
                    type: "POST",
                    data: JSON.stringify(checkoutPricingObj),
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnError: () => reject,
                    OnSuccess: (res: ICheckOutPagePricingResponseNoGateway | string) => {
                        if (typeof res !== "string" && res.statusCode === "500") reject(res);
                        else if (checkoutPricingObj.PaymentGateway === "") {
                            resolve({
                                paymentgateway: checkoutPricingObj?.PaymentGateway,
                                resdata: res
                            });
                        } else {
                            resolve({
                                paymentgateway: checkoutPricingObj?.PaymentGateway,
                                resdata: res
                            });
                        }
                    }
                });
            })
    });
}

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { LANGUAGE_GUID, MS_URL, WEBSITE_GUID } from "../../../utils/vars";
import { type IReportOrderData, type IReportOrderResponse } from "~/types/api/IReportOrder";

export function useGetOrderReportNetSuite(): UseMutationResult<IReportOrderData, Error, string, unknown> {
    return useMutation({
        mutationKey: ["orderReport"],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ORDER}api/order/GetOrderDataFromNetSuite`,
                    type: "GET",
                    MicroserviceName: "SaaS_Order_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    headers: { LanguageGuid: LANGUAGE_GUID, WebsiteGuid: WEBSITE_GUID, UserGuid: window.UserGuid },
                    OnSuccess: (result: IReportOrderResponse) => {
                        // console.log({ result });
                        if (result.statusCode === 500) reject(result.message);
                        else resolve(result.data);
                    }
                });
            })
    });
}

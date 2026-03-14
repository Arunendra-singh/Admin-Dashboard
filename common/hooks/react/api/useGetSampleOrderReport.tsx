import { useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { ISampleOrderReport } from "~/types/api/ISampleOrderReports";

export const useSampleOrder = (sampleOrderPayload: ISampleOrderReport) => {
    return useMutation({
        mutationKey: ["OrderSample"],
        mutationFn: async () =>
            await new Promise((resolve, reject) => {
                const postData = {
                    Filters: [
                        {
                            UserGuid: sampleOrderPayload?.Filters[0]?.UserGuid,
                            FilterFromDateName: "Search",
                            FilterFromDateValue: sampleOrderPayload?.Filters[0]?.FilterFromDateValue,
                            FilterToDateName: "Search",
                            FilterToDateValue: sampleOrderPayload?.Filters[0]?.FilterToDateValue,
                            FilterProductName: "Search",
                            FilterProductValue: sampleOrderPayload?.Filters[0]?.FilterProductValue,
                            FilterFirstName: "Search",
                            FilterFirstNameValue: "",
                            FilterLastName: "Search",
                            FilterLastNameValue: "",
                            FilterPhoneNumber: "Search",
                            FilterPhoneNumberValue: "",
                            FilterEmail: "Search",
                            FilterEmailValue: "",
                            FilterProductCode: "Search",
                            FilterProductCodeValue: "",
                            RequestType: "OrderSample",
                            pageNo: sampleOrderPayload?.Filters[0]?.pageNo,
                            SortName: "",
                            PageSize: sampleOrderPayload?.Filters[0]?.PageSize
                        }
                    ]
                };
                CallApi({
                    url: `${MS_URL.ORDER}api/order/OrderSampleReportAPI`,
                    type: "POST",
                    data: JSON.stringify(postData),
                    headers: { pagesize: +sampleOrderPayload.Filters[0].PageSize },
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result.data);
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

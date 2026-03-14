import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import type { AnalyticsReportPayload, IGetAnalyticsReports } from "~/types/api/IGetAnalyticsReport";
import { CallApi } from "../../../utils";
import { LANGUAGE_GUID, MS_URL, WEBSITE_GUID } from "../../../utils/vars";

export function useGetAnalyticsReport(): UseMutationResult<IGetAnalyticsReports, Error, AnalyticsReportPayload, unknown> {
    return useMutation({
        mutationKey: ["AnalyticsReportPayload"],
        mutationFn: async (AnalyticsReportPayloaddata) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.ANALYTICS}api/PageHits/GetAllFlipCatalogHitJson`,
                    type: "POST",
                    data: JSON.stringify(AnalyticsReportPayloaddata),
                    headers: { LanguageGuid: LANGUAGE_GUID, WebsiteGuid: WEBSITE_GUID, UserGuid: window.UserGuid },
                    MicroserviceName: "SaaS_Analytics_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IGetAnalyticsReports) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

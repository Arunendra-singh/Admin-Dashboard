import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { IGetNewsLetterData, IGetNewsLetterResData } from "~/types/api/IExportNewsletterReports";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export function useExportNewsletterReports(): UseMutationResult<IGetNewsLetterResData, Error, IGetNewsLetterData, unknown> {
    return useMutation({
        mutationKey: ["ExportNewsletterReports"],
        mutationFn: async (filterData) => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.USER}api/NewsLetter/ExportNewsletterReports/true`,
                    type: "POST",
                    isAsync: true,
                    data: JSON.stringify(filterData),
                    MicroserviceName: "SaaS_User_Microservice",
                    contentType: "application/json;charset=utf-8",
                    OnError: (msg) => {
                        resolve(msg);
                    },
                    OnSuccess: (result) => {
                        resolve(result);
                    }
                });
            });
        }
    });
}

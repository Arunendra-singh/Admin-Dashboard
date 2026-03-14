import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import type { ILanguageGuidListsData, ILanguageGuidListsResponse } from "~/types/api/ILanguageGuidLists";

export const useGetWebsiteBasedLanguagesData = (): UseQueryResult<ILanguageGuidListsData, Error> => {
    return useQuery({
        queryKey: ["getWebsiteBasedLanguagesData", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}Home/LanguageGuidListsAPI`,
                    type: "GET",
                    MicroserviceName: "SaaS_GlobalElements_Microservice",
                    OnSuccess: (res: ILanguageGuidListsResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else resolve(res.data);
                    }
                });
            });
        }
    });
};

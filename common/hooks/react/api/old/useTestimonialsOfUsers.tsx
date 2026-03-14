import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { CallApi, ObjKeysToLowerCase } from "./../../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "./../../../../utils/vars";
import type { ITestimonialsOfUsersResponse, ITestimonialsOfUsersResponseData } from "~/types/api/ITestimonialsOfUsers";

export function useTestimonialsOfUsers(TestimonialUserCount: number, cacheTime: number = 5 * 60 * 1000): UseQueryResult<ITestimonialsOfUsersResponseData, Error> {
    return useQuery({
        queryKey: ["TestimonialsOfUsers", TestimonialUserCount, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/Products/GetProductSectionAPI/TestimonialsOfUsers`,
                    type: "GET",
                    headers: { ReviewCount: TestimonialUserCount },
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (res: ITestimonialsOfUsersResponse) => {
                        const _data = ObjKeysToLowerCase(res);
                        resolve(_data.data);
                    }
                });
            });
        },
        staleTime: cacheTime // 5 minutes
    });
}

import { useQuery } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";

export const useGetTestimonialsOfUsers = ({ ReviewCount, categoryAlias }: { ReviewCount: number; categoryAlias: string }) => {
    return useQuery({
        queryKey: ["Testimonials of User for Listing Page", ReviewCount, categoryAlias, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.PRODUCT_LISTING}api/Products/GetTestimonialsOfUsersAPI/${ReviewCount}`,
                    type: "GET",
                    headers: { categoryAlias },
                    MicroserviceName: "SaaS_ProductListing_Microservice",
                    OnSuccess: (res) => {
                        if (res?.statuscode === 200) {
                            resolve(res?.data);
                        }
                    }
                });
            });
        },
        onError: () => {}
    });
};

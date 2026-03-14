import { useMutation } from "@tanstack/react-query";
import { CallApi } from "./../../../utils";
import { MS_URL } from "./../../../utils/vars";

export const useReviewSaveData = () => {
    return useMutation({
        mutationKey: ["ReviewSaveData"],
        mutationFn: async (uservalues) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.REVIEW_MANAGEMENT}api/Reviews/ReviewSaveDataAPI`,
                    type: "POST",
                    data: JSON.stringify(uservalues),
                    MicroserviceName: "SaaS_ReviewManagement_Microservice",
                    OnError: () => reject,
                    OnSuccess: (res) => {
                        resolve(res);
                    }
                });
            })
    });
};

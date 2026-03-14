import { useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";

export const UseSaveUploadArtwork = () => {
    return useMutation({
        mutationKey: ["save"],
        mutationFn: async (postData: any) => {
            // console.log(postData, "postData");
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/Basket/SaveToBasketDetailsAPI`,
                    type: "POST",
                    headers: { BasketDetailsGuid: postData?.basketGuid },
                    data: JSON.stringify(postData?.saveArtwork),
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    },
                    OnError: (err) => { reject(err); },
                    isAsync: true,
                    MicroserviceName: "SaaS_Basket_Microservice",
                    contentType: "application/json;charset=utf-8"
                });
            });
        }
    });
};

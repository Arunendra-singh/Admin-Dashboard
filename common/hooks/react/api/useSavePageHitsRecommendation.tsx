import { CallApi } from "./../../../utils";
import { CLIENT_IP, MS_URL } from "./../../../utils/vars";

export function useSavePageHitsRecommendation(): void {
    CallApi({
        url: `${MS_URL.PRODUCT_GE}api/Products/SavePageHitsRecommendation`,
        type: "POST",
        headers: {},
        data: JSON.stringify({
            Action: null,
            IPAddress: CLIENT_IP,
            PageURL: window.location.href
        }),
        MicroserviceName: "SaaS_Product_GlobalElements_Microservice",
        OnSuccess: () => {}
    });
}

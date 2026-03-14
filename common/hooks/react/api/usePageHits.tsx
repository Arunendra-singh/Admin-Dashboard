import { CallApi } from "./../../../utils";
import { CLIENT_IP, MS_URL } from "./../../../utils/vars";

export function usePageHits(): void {
    CallApi({
        url: `${MS_URL.ANALYTICS}api/PageHits`,
        type: "POST",
        headers: {},
        data: JSON.stringify({
            Action: null,
            IPAddress: CLIENT_IP,
            PageURL: window.location.href
        }),
        MicroserviceName: "SaaS_Analytics_Microservice",
        OnSuccess: () => {}
    });
}

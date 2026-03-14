import { useMutation } from "@tanstack/react-query";
import { CallApi } from ".././../../../utils";
import { MS_URL, COOKIE_DETAILS } from ".././../../../utils/vars";

export const useSaveArtVault = () => {
    const header = {
        UserGuid: COOKIE_DETAILS.UserGuid
    };
    return useMutation({
        mutationKey: ["saveArtVault"],
        mutationFn: async (payload) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/artvault/SaveToArtVaultDetailsAPI`,
                    type: "POST",
                    headers: header,
                    data: JSON.stringify(payload),
                    isAsync: true,
                    MicroserviceName: "SaaS_Order_Microservice",
                    OnSuccess: (result) => {
                        if (result.statuscode === 500) reject(result.message);
                        else resolve(result);
                    }
                });
            })
    });
};

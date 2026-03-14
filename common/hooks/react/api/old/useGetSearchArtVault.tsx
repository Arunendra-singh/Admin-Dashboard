import { useQuery } from "@tanstack/react-query";
import { CallApi } from "./../../../../utils";
import { MS_URL, QUERY_KEY_VERSION, SESSION_GUID } from "./../../../../utils/vars";
interface IFilterData {
    ArtVaultFileType: string;
    isImageDisplay: string;
    ArtVaultFileName: string;
    BasketDetailsGuid: string;
}
export function useGetSearchArtVault(ArtVaultData: IFilterData) {
    return useQuery({
        queryKey: ["refetchData", "SearchArtVault", QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.BASKET}api/artvault/SearchArtVaultListAPI?ArtVaultFileType=${ArtVaultData?.ArtVaultFileType}&isImageDisplay=${ArtVaultData?.isImageDisplay}&ArtVaultFileName=${ArtVaultData?.ArtVaultFileName}&BasketDetailsGuid=${ArtVaultData?.BasketDetailsGuid}`,
                    type: "GET",
                    headers: {
                        SessionGuid: SESSION_GUID
                    },
                    MicroserviceName: "SaaS_Basket_Microservice",
                    OnSuccess: ({ statusCode, data, message }) => {
                        if (statusCode === 500) reject(message);
                        else resolve(data);
                    }
                });
            });
        }
    });
}

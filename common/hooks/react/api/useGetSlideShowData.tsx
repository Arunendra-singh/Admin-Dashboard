import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { CallApi, SVGImageURI } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";
import type { IGetSlideShowDataResponse, Slideshowimage } from "~/types/api/ISlideshowResponse";

export function useGetSlideShowData(slideShowGuid: string, cacheTime: number = 5 * 60 * 1000): UseQueryResult<Slideshowimage[], Error> {
    return useQuery({
        queryKey: ["slideshowData", slideShowGuid, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.GLOBAL_ELEMENTS}api/SlideShows/GetSlideShowJson/${slideShowGuid}`,
                    type: "GET",
                    MicroserviceName: "SaaS_GlobalElements_Microservice",
                    OnSuccess: (res: IGetSlideShowDataResponse) => {
                        if (res.statuscode === 500) reject(res);
                        else if (res.data === null) reject(res);
                        else {
                            resolve(res.data?.slideshowdetails.slideshowimages);
                        }
                    }
                });
            });
        },
        staleTime: cacheTime, // 5 minutes
        placeholderData: [
            {
                slideshowimageguid: "a49bfasdas689-5ca0-4f3f-a8c0-637bfdd5a937",
                imagename: "test.jpg",
                navigateurl: "",
                alttext: "",
                overlaytext: "",
                imageurl: SVGImageURI(1920, 425, "#f1f1f1")
            }
        ]
    });
}

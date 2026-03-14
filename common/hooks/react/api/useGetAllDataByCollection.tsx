/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import type { IAllDataByCollectionResponse } from "~/types/api/IAllDataByCollection";
import { CallApi } from "../../../utils";
import { MS_URL, QUERY_KEY_VERSION } from "../../../utils/vars";

interface IHeader {
    ProductCount?: number;
    IsCarouselEnable?: boolean;
    pageno?: number;
    CategoryGuid?: string;
    NoofSwatches?: number;
    IsSwatchesEnabled?: boolean;
    PriceType?: string;
    ReviewCount?: number;
    ProductEachSlide?: number;
    TradeCount?: number;
    WishlistCount: number;
}

export const useGetAllDataByCollection = (sectionname: string, header: IHeader) => {
    const defaultHeader = {
        IsCarouselEnable: true,
        IsSortbyPopularity: true,
        SortByDirection: true
    };

    return useQuery({
        queryKey: ["refetchData", sectionname, header, QUERY_KEY_VERSION],
        queryFn: async () => {
            return await new Promise((resolve, reject) => {
                const _headers = Object.assign(defaultHeader, header);
                CallApi({
                    url: `${MS_URL.PRODUCT_GE}api/Products/GetProductSectionAPI/${String(sectionname)}`,
                    type: "GET",
                    headers: _headers,
                    OnSuccess: (response: IAllDataByCollectionResponse) => {
                        if (response.statuscode === 500) {
                            reject(response.message);
                        } else {
                            resolve(response.data);
                        }
                    },
                    MicroserviceName: "SaaS_Product_GlobalElements_Microservice"
                });
            });
        }
    });
};

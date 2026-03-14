import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { CallApi } from "../../../utils";
import { MS_URL } from "../../../utils/vars";
import type { BulkPriceEditPayload, IBulkPriceEdit } from "~/types/api/IBulkPriceEdit";

export function useBulkPriceEdit(): UseMutationResult<IBulkPriceEdit, Error, BulkPriceEditPayload, unknown> {
    return useMutation({
        mutationKey: ["sendEmaildetails"],
        mutationFn: async (sendEmaildetails) =>
            await new Promise((resolve, reject) => {
                CallApi({
                    url: `${MS_URL.CATALOG}api/Catalog/BulkPriceEdit`,
                    type: "POST",
                    data: JSON.stringify(sendEmaildetails),
                    MicroserviceName: "SaaS_Catalog_Microservice",
                    OnError: (msg) => {
                        reject(msg);
                    },
                    OnSuccess: (res: IBulkPriceEdit) => {
                        if (res.statuscode === 500) reject(res.statuscode);
                        else resolve(res);
                    }
                });
            })
    });
}

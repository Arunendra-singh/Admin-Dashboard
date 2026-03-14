import { gql } from "@apollo/client";
export const useMutationsyncPromoStandardProduct = gql`
    mutation syncPromoStandardProduct($productGuid: String!) {
        syncPromoStandardProduct(productGuid: $productGuid) {
            message
            statuscode
            success
        }
    }
`;

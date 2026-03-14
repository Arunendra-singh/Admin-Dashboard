import { gql } from "@apollo/client";
export const useMutationsaveProductsOnSage = gql`
    mutation uploadAllProductsOnSage($productGuids: [String!]!) {
        uploadAllProductsOnSage(productGuids: $productGuids) {
            message
            statuscode
            success
        }
    }
`;

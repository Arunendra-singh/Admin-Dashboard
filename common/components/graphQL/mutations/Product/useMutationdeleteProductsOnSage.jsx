import { gql } from "@apollo/client";
export const useMutationdeleteProductsOnSage = gql`
    mutation deleteProductsOnSage($productGuids: [String!]!) {
        deleteProductsOnSage(productGuids: $productGuids) {
            message
            statuscode
            success
        }
    }
`;

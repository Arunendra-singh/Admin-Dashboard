import { gql } from "@apollo/client";
export const useMutationProductEnable = gql`
    mutation deleteProductByFilter($entity: ProductDeleteInput!) {
        deleteProductByFilter(entity: $entity) {
            message
            statuscode
            success
        }
    }
`;

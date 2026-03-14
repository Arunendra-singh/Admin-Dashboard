import { gql } from "@apollo/client";
export const useMutationProductQuickUpdate = gql`
    mutation quickUpdateProductByFilter($entity: ProductQuickUpdateInput!) {
        quickUpdateProductByFilter(entity: $entity) {
            message
            statuscode
            success
        }
    }
`;

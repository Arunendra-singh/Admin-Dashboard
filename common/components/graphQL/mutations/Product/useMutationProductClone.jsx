import { gql } from "@apollo/client";
export const useMutationProductClone = gql`
    mutation cloneProduct($entity: ProductCloneInput!) {
        cloneProduct(entity: $entity) {
            message
            statuscode
            success
        }
    }
`;

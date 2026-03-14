import { gql } from "@apollo/client";
export const useMutationAssignProductMapping = gql`
    mutation assignMappedProduccts($entity: AssignedProductsInput!) {
        assignMappedProduccts(entity: $entity) {
            data
            message
            statuscode
            success
        }
    }
`;

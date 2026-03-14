import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useMutationUpadate = gql`
    mutation reorder($entity: [ReorderInput!]!) {
        reorder(salesFlyerData: $entity) {
            message
            statuscode
            success
        }
    }
`;

/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationEnble = gql`
    mutation enableDisableSalesFlyer($entity: SalesFlyerInput!) {
        enableDisableSalesFlyer(entity: $entity) {
            message
            statuscode
            success
        }
    }
`;

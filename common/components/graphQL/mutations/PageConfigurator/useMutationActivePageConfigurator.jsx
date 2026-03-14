/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationActivePageConfigurator = gql`
mutation ActivePageConfigurator($entity:PagesInput!) {
  activePageConfigurator(
    entity: $entity
  ) {
    message
    statuscode
  }
}
`;

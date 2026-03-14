/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationDeletePageConfigurator = gql`
  mutation DeletePageConfigurator($pageguid: String!) {
    deletePageConfigurator(pageguid: $pageguid) {
      message
      statuscode
    }
  }
`;

/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationAddSeo = gql`
  mutation AddSeo($entity: PageLanguageContentInput!) {
    addUpdateSeo(entity: $entity) {
      message
      statuscode
      success
    }
  }
`;

export const useMutationUpdateSeo = gql`
  mutation UpdateSeo($entity: PageLanguageContentInput!) {
    updateSeo(entity: $entity) {
      message
      statuscode
      success
    }
  }
`;

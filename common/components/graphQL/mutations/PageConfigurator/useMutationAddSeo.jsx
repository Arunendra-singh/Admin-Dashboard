/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationAddSeo = gql`
mutation AddSeo($entity:PageLanguageContentInput!){
  addSeo(entity:$entity) {
    message
    statuscode
    success
  }
}
`;

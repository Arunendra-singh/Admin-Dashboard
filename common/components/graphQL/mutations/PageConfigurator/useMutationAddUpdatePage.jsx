/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";
export const useMutationAddUpdatePage = gql`
  mutation AddUpdatePage($entity: PagesViewModelInput!) {
    addUpdatePage(entity: $entity) {
      message
      statuscode
      data{
        pageGuid
       }
    }
  }
`;

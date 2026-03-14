/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationAddUpdatePageConfigurator = gql`
  mutation addUpdatePageConfigurator($entity:PageConfigurationsInput!) {
    addUpdatePageConfigurator(entity:$entity) {
      message
      statuscode
      data{
        pageGuid
      }
    }
  }
`;

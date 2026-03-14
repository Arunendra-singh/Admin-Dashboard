import { gql } from "@apollo/client";

export const useEnableDisableUser = gql`
mutation enableDisableUser($userGuid: String!, $isActive: Boolean!){
    enableDisableUser(entity: { userGuid: $userGuid, isActive: $isActive }) {
      statuscode
      message
    }
  }
`;

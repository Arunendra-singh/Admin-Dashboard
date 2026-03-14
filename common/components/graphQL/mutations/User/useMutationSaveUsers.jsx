import { gql } from "@apollo/client";

export const useMutationSaveUser = gql`
mutation addUser($User : UserInput!){
    addUser(entity: $User){
      statuscode
      message
    }
  }
`;

export const useMutationEditUser = gql`
mutation updateUser($updateUser: UserInput!){
    updateUser(entity: $updateUser) {
      message
      statuscode
    }
}
`;

export const useEnableDisableUser = gql`
mutation enableDisableUser($userGuid: String!, $isActive: Boolean!){
    enableDisableUser(entity: { userGuid: $userGuid, isActive: $isActive }) {
      statuscode
      message
    }
  }
`;

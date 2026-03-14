import { gql } from "@apollo/client";

export const useQueryGetUsers = gql`
    query GetUsers($skip: Int, $take: Int, $where: UserFilterInput, $order: [UserSortInput!]) {
        users(
            skip: $skip
            take: $take
            where: $where,
            order: $order
        ) {
            totalCount
            items {
                firstName
                lastName
                emailAddress
                mobileNumber
                createdDateUtc
                createdBy
                modifiedBy
                userGuid
                userType
                isActive
            }
        }
    }
`;

export const useQueryGetUsersById = gql`
    query getUserDataById($userGuid: String!){
        users(where: {userGuid: {eq: $userGuid}}){
            totalCount
            items{
                firstName
                lastName
                emailAddress
                isActive
                userGuid
                userType
                permissionGuids {
                    permissionGuid
                    rights
                }
            }
        }
      }
`;

export const useQueryGetPermission = gql`
    query{
        permission {
        aliasName
        clientGuid
        createdBy
        createdDateUtc
        displayOrder
        ipAddress
        isActive
        groupName
        languageGuid
        modifiedBy
        modifiedDateUtc
        permissionGuid
        permissionResourceKey
        url
        }
    }  
`;

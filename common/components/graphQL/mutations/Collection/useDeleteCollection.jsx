import { gql } from "@apollo/client";
export const useDeleteCollection = gql`
    mutation getdeleteCollection($collectionguid: String!) {
        deleteCollection(collectionguid: $collectionguid) {
            message
            statuscode
            success
        }
    }
`;

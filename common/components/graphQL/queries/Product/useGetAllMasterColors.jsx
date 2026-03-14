import { gql } from "@apollo/client";
export const useGetAllMasterColors = gql`
    query getallMasterColors($skip: Int! = 1, $take: Int!, $filter: MasterColorsFilterInput) {
        allMasterColors(skip: $skip, take: $take, where: $filter) {
            totalCount
            items {
                masterColorGuid
                colorHexValue
                colorName
            }
        }
    }
`;

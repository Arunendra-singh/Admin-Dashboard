import { gql } from "@apollo/client";

export const useQueryGetMasterType = gql`
    query getmasterFlyersList {
        masterFlyersList {
            items {
                flyerType
                flyerTypeGuid
                keySequence
                languageGuid
                websiteGuid
            }
        }
    }
`;

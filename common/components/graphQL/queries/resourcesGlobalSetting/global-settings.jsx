import { gql } from "@apollo/client";

export const useQueryGlobalSettings = gql`
    query getGlobalResources($pageName: String!) {
        getResourcesGlobalSetting(pageName: $pageName) {
            message
            statuscode
            success
            data {
                ftux {
                    className
                    isActive
                    languageGuid
                    resourceGuid
                    resourceKey
                    resourceType
                    resourceValue
                    totalCount
                    websiteGuid
                }
                globalSettings {
                    key
                    value
                }
                resources {
                    key
                    value
                }
            }
        }
    }
`;

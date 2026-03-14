import { gql } from "@apollo/client";

export const useQueryGetGloblesetting = gql`
    query getResourcesGlobalSetting($pageName: String!) {
        getResourcesGlobalSetting(pageName: $pageName) {
            message
            statuscode
            success
            data {
                ftux {
                    className
                    isActive
                    languageGuid
                    message
                    order
                    resourceGuid
                    resourceKey
                    resourceType
                    resourceValue
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

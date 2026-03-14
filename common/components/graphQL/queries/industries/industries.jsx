import { gql } from "@apollo/client";

export const useQueryGetAllIndustries = gql`
    query industries($pageno: Int!, $pagesize: Int!, $where: IndustriesFilterInput, $order: IndustriesSortInput) {
        industries(pageno: $pageno, pagesize: $pagesize, where: $where, order: $order) {
            activeCount
            inactiveCount
            totalCount
            items {
                industryGuid
                industryName
                isActive
                languageGuid
                websiteGuid
            }
        }
    }
`;

export const AddIndustriesAPI = gql`
    mutation addUpdateIndustries($industryName: String!, $languageGuid: String!, $websiteGuid: String!, $industryGuid: String!) {
        addUpdateIndustries(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, industryName: $industryName, industryGuid: $industryGuid }) {
            message
            statuscode
            success
        }
    }
`;

export const UpdateIndustriesAPI = gql`
    mutation addUpdateIndustries($industryName: String!, $languageGuid: String!, $websiteGuid: String!, $industryGuid: String!, $isactive: Boolean!) {
        addUpdateIndustries(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, industryName: $industryName, industryGuid: $industryGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

export const DeleteIndustriesAPI = gql`
    mutation deleteIndustries($industryGuid: String!) {
        deleteIndustries(industryGuid: $industryGuid) {
            message
            statuscode
            success
        }
    }
`;

export const EnableDisableIndustries = gql`
    mutation enableDisableIndustries($eventThemeName: String!, $languageGuid: String!, $websiteGuid: String!, $eventThemeGuid: String!, $isactive: Boolean!) {
        enableDisableIndustries(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, eventThemeName: $eventThemeName, eventThemeGuid: $eventThemeGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

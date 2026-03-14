import { gql } from "@apollo/client";

export const useQueryGetAllImprintColors = gql`
    query imprintColors($pageno: Int!, $pagesize: Int!, $where: ImprintColorsFilterInput, $order: ImprintColorsSortInput) {
        imprintColors(pageno: $pageno, pagesize: $pagesize, where: $where, order: $order) {
            activeCount
            inactiveCount
            totalCount
            items {
                createdBy
                createdDateUtc
                colorHexValue
                colorName
                imprintColorGuid
                ipAddress
                isActive
                languageGuid
                modifiedBy
                modifiedDateUtc
                websiteGuid
            }
        }
    }
`;

export const AddImprintColorAPI = gql`
    mutation addUpdateImprintColors($colorName: String!, $colorHexValue: String!, $languageGuid: String!, $websiteGuid: String!, $imprintColorGuid: String!) {
        addUpdateImprintColors(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, colorName: $colorName, colorHexValue: $colorHexValue, imprintColorGuid: $imprintColorGuid }) {
            message
            statuscode
            success
        }
    }
`;

export const UpdateImprintColorAPI = gql`
    mutation addUpdateImprintColors($colorName: String!, $colorHexValue: String!, $languageGuid: String!, $websiteGuid: String!, $imprintColorGuid: String!, $isactive: Boolean!) {
        addUpdateImprintColors(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, colorName: $colorName, colorHexValue: $colorHexValue, imprintColorGuid: $imprintColorGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

export const DeleteImprintColorAPI = gql`
    mutation deleteImprintColors($imprintColorguid: String!) {
        deleteImprintColors(imprintColorguid: $imprintColorguid) {
            message
            statuscode
            success
        }
    }
`;

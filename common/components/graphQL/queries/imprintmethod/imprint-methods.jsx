import { gql } from "@apollo/client";

export const useQueryGetAllImprintMethods = gql`
    query imprintMethods($pageno: Int!, $pagesize: Int!, $where: ImprintMethodsFilterInput, $order: ImprintMethodSortInput) {
        imprintMethods(pageno: $pageno, pagesize: $pagesize, where: $where, order: $order) {
            activeCount
            inactiveCount
            totalCount
            items {
                imprintMethodGuid
                imprintMethodName
                isActive
                languageGuid
                websiteGuid
                asiImprintMethodType
                asiImprintMethodName
            }
        }
    }
`;

export const AddImprintMethodsAPI = gql`
    mutation addUpdateImprintMethod($imprintMethodName: String!, $languageGuid: String!, $websiteGuid: String!, $imprintMethodGuid: String!) {
        addUpdateImprintMethod(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, imprintMethodName: $imprintMethodName, imprintMethodGuid: $imprintMethodGuid }) {
            message
            statuscode
            success
        }
    }
`;

export const UpdateImprintMethodsAPI = gql`
    mutation addUpdateImprintMethod($imprintMethodName: String!, $languageGuid: String!, $websiteGuid: String!, $imprintMethodGuid: String!, $isactive: Boolean!) {
        addUpdateImprintMethod(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, imprintMethodName: $imprintMethodName, imprintMethodGuid: $imprintMethodGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

export const DeleteImprintMethodsAPI = gql`
    mutation deleteImprintMethods($imprintMethodguid: String!) {
        deleteImprintMethods(imprintMethodguid: $imprintMethodguid) {
            message
            statuscode
            success
        }
    }
`;

import { gql } from "@apollo/client";

export const useQueryGetAllEventThemes = gql`
    query geteventThemes($pageno: Int!, $pagesize: Int!, $where: EventThemesFilterInput, $order: EventThemesSortInput) {
        eventThemes(pageno: $pageno, pagesize: $pagesize, where: $where, order: $order) {
            activeCount
            inactiveCount
            totalCount
            items {
                eventThemeGuid
                eventThemeName
                isActive
                languageGuid
                websiteGuid
            }
        }
    }
`;

export const AddEventThemeAPI = gql`
    mutation addUpdateEventThems($eventThemeName: String!, $languageGuid: String!, $websiteGuid: String!, $eventThemeGuid: String!) {
        addUpdateEventThems(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, eventThemeName: $eventThemeName, eventThemeGuid: $eventThemeGuid }) {
            message
            statuscode
            success
        }
    }
`;

export const UpdateEventThemeAPI = gql`
    mutation addUpdateEventThems($eventThemeName: String!, $languageGuid: String!, $websiteGuid: String!, $eventThemeGuid: String!, $isactive: Boolean!) {
        addUpdateEventThems(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, eventThemeName: $eventThemeName, eventThemeGuid: $eventThemeGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

export const DeleteEventThemeAPI = gql`
    mutation deleteEventThemes($eventThemeGuid: String!) {
        deleteEventThemes(eventThemeGuid: $eventThemeGuid) {
            message
            statuscode
            success
        }
    }
`;

export const EnableDisableEventThemes = gql`
    mutation enableDisableEventThemes($eventThemeName: String!, $languageGuid: String!, $websiteGuid: String!, $eventThemeGuid: String!, $isactive: Boolean!) {
        enableDisableEventThemes(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, eventThemeName: $eventThemeName, eventThemeGuid: $eventThemeGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

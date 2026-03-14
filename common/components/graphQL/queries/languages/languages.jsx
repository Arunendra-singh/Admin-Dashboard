import { gql } from "@apollo/client";

export const useQueryLanguages = gql`
    query getLanguageGuidList {
        languageGuidList {
            items {
                defaultLanguageGuid
                languageGuid
                languageList {
                    languageGuid
                    languageName
                }
            }
        }
    }
`;

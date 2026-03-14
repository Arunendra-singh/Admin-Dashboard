import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useQueryGetPages = gql`
    query useQueryGetPages($skip: Int!, $take: Int!, $where: PageFilterInput) {
        pages(skip: $skip, take: $take, where: $where) {
            totalCount
            items {
              isActive
              pageGuid
              pageKey
              pageURL
              isReact
              websiteGuid
            }
          }
        }    
`;

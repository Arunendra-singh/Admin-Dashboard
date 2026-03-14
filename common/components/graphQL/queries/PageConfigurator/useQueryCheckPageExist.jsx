import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useQueryCheckPageExist = gql`
    query useQueryCheckPageExist( $pageKey: String!,$pageUrl:String!,$pageGuid:String!) {
        isPageExist(entity: {
            pageKey:$pageKey
            pageURL:$pageUrl
            pageGuid:$pageGuid
        }
    ) {
            totalCount            
          }
        }    
`;

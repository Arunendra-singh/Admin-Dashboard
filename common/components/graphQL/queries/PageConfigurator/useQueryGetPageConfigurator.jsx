import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useQueryGetPageConfigurator = gql`
    query useQueryGetPageConfigurator($skip: Int!, $take: Int!, $where: PageConfigurationFilterInput) {
        pageConfiguration(skip: $skip, take: $take, where: $where) {
            totalCount
            items {
              isActive
              configJson
              pageConfigurationGuid
              pageGuid
              pageKey
              pageThumbnail
              websiteGuid
              cssFilePath  
            }
            statusCount{
              status
              count
            }
          }
        }    
`;

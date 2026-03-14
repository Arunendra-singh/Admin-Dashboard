import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useQueryGetallSeo = gql`
query useQueryGetallSeo($where: SEOFilterInput!) {
  allSeo(where: $where) {
    totalCount
    items {
      isActive
      pageGuid
      websiteGuid
      isDeleted
      metaDescription
      metaKeyword
      metaRobots
      canonicalLink
      alias
      pageTitle
    }
  }
}    
`;

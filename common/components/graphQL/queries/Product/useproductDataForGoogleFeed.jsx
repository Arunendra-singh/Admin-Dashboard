import { gql } from "@apollo/client";
export const useproductDataForGoogleFeed = gql`
    query productDataForGoogleFeed($isOptimizeCode: Boolean!) {
        productDataForGoogleFeed(isOptimizeCode: $isOptimizeCode) {
               data
             message
          statuscode
             success
        }
    }
`;

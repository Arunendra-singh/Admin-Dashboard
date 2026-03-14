/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutaionBulkDelete = gql`
    mutation bulkAction($salesFlyerGuids: [String!]!, $action: String!) {
        bulkAction(salesFlyerGuids: $salesFlyerGuids, action: $action) {
            message
            statuscode
            success
            data {
                createdBy
                createdDateUtc
                expirationDateUTS
                flyerImage
                flyerName
                flyerPDF
                flyerPDFNew
                flyerType
                imageAlt
                ipAddress
                isActive
                keywords
                languageGuid
                modifiedBy
                modifiedDateUtc
                multipleFlyerImage
                salesFlyerGuid
                sequence
                url
                websiteGuid
            }
        }
    }
`;

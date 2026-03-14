/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationGetAddSalesFlyer = gql`
    mutation addUpdateSalesFlyer($entity: SalesFlyerInput!) {
        addUpdateSalesFlyer(entity: $entity) {
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
                startDateUTS
            }
        }
    }
`;

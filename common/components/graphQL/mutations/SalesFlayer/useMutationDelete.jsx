/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const useMutationDelete = gql`
    mutation deleteSalesFlyer($Guid: String!) {
        deleteSalesFlyer(salesFlyerGuid: $Guid) {
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

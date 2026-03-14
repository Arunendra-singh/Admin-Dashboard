import { gql } from "@apollo/client";

export const useQueryGetSalesFlyer = gql`
    query getsalesFlyers($filter: SalesFlyerFilterInput, $skip: Int! = 0, $take: Int! = 1000) {
        salesFlyers(skip: $skip, take: $take, where: $filter) {
            totalCount
            items {
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
                startDateUTS
                url
                websiteGuid
            }
        }
    }
`;

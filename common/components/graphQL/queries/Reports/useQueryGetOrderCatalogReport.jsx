import { gql } from "@apollo/client";
export const useQueryGetOrderCatalogReport = gql`
    query orderCatalogReport($skip: Int!, $take: Int!, $where: ContactUsFilterInput!, $order: ContactUsSortInput!) {
        orderCatalogReport(skip: $skip, take: $take, where: $where, order: $order) {
            totalCount
            items {
                accountNumber
                address
                artWorkFileName
                asi
                city
                companyName
                contactGuid
                contactType
                countryGUID
                countryName
                createdDate
                createdDateUtc
                emailAddress
                extensionNo
                fax
                firstName
                freightTypeName
                ipAddress
                isActive
                lastName
                message
                modifiedBy
                modifiedDateUtc
                otherAssociation
                phone
                ppai
                pppc
                quantity
                sage
                shipperNumber
                state
                upic
                websiteGuid
                zip
            }
        }
    }
`;

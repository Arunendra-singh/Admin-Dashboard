import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const useQuerygetSalesflyers = gql`
    query salesFlyerReport($skip: Int!, $take: Int!, $where: SalesFlyerEmailFilterInput, $order: SalesFlyerEmailSortInput!) {
        salesFlyerReport(skip: $skip, take: $take, where: $where, order: $order) {
            totalCount
            items {
                imageName
                senderEmail
                mailTo
                salesFlyerName
                createdDateUtc
                flyerType
                subject
                senderFirstName
                senderLastName
                senderWebsite
                zipCode
                companyPhoneNo
                address
                backGroundColor
                captchaResponse
                captchaResponseMessage
                city
                comapanyName
                companyFax
                country
                createdBy
                extensionNo
                filters {
                    filterFromDateName
                    filterFromDateValue
                    filterToDateName
                    filterToDateValue
                    pageNo
                    searchText
                    sortOrder
                }
                isActive
                isDownloaded
                isSendMeCopy
                languageGuid
                modifiedBy
                modifiedDateUtc
                saleFlyerPDFGuid
                salesFlyerEmailGuid
                salesFlyerGuid
                sendMailmessage
                state
                websiteGuid
                withAttachment
            }
        }
    }
`;

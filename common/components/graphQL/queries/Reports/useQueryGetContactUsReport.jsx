import { gql } from "@apollo/client";
export const useQueryGetContactUsReport = gql`
    query contactUsReport($take: Int!, $skip: Int!, $where: ContactUsFilterInput, $order: ContactUsSortInput) {
        contactUsReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
            items {
                firstName
                lastName
                emailAddress
                companyName
                phone
                address
                city
                state
                zip
                countryName
                countryGUID
                createdDate
                asi
                upic
                ppai
                sage
                pppc
                createdDateUtc
                extensionNo
                fax
                message
                filters {
                    hideFlyerType
                    isAllFilterEnabled
                    isFlyerBasedonDDL
                    pageColumns
                    pageNo
                    pageRows
                    sortBy
                    sortbyCreateddatedesc
                    type
                    viewAll
                }
            }
        }
    }
`;

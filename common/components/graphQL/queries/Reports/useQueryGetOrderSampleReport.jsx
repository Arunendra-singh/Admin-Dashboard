import { gql } from "@apollo/client";
export const useQueryGetOrderSampleReport = gql`
    query orderSampleReport($take: Int!, $skip: Int!, $where: OrderSampleFilterInput, $order: OrderSampleSortInput) {
        orderSampleReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
            items {
                address1
                address2
                asi
                city
                color
                companyName
                countryGUID
                createdBy
                createdDate
                createdDateUtc
                emailAddress
                extensionNo
                firstName
                freightTypeName
                imageName
                lastName
                needSampleBy
                note
                phone
                productCode
                productName
                quantity
                state
                shipperNumber
                zip
                sage
                ppai
                upic
                orderSampleItems {
                    quantity
                }
            }
        }
    }
`;

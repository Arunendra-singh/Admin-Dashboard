import { gql } from "@apollo/client";
export const useQueryGetOrderReport = gql`
    query getorderReport($take: Int!, $skip: Int!, $where: OrderFilterInput, $order: OrderSortInput) {
        orderReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
            avgOrderAmount
            avgSaleAmount
            avgSizeOfOrder
            productName
            mostSalesBy
            items {
                balanceTotalOrderAmount
                basketFreightCharges
                companyName
                emailId
                createdBy
                createdDateUtc
                currencyCode
                orderGuid
                orderNumber
                quantity
                status
                totalOrderPrice
                trackingDetais
                userGuid
                websiteGuid
                billingInformation {
                    billingCompanyName
                    billingFirstName
                    billingLastName
                    billingEmailId
                    billingZip
                    billingPhone
                    billingCity
                    billingState
                    billingAddress1
                    billingAddress2
                    billingExtensionNo
                }
                shippingInformation {
                    shippingAddress1
                    shippingAddress2
                    shippingCity
                    shippingCompanyName
                    shippingEmailId
                    shippingExtensionNo
                    shippingFirstName
                    shippingLastName
                    shippingName
                    shippingPhone
                    shippingState
                    shippingZip
                }
                itemsList {
                    productCode
                    productName
                    quantity
                    price
                    totalPrice
                    imprintMethodName
                    productDefaultImage
                }
            }
        }
    }
`;

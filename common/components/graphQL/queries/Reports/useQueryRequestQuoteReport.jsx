import { gql } from "@apollo/client";
export const useQueryRequestQuoteReport = gql`
    query requestQuoteReport($take: Int!, $skip: Int!, $where: OrderSampleFilterInput, $order: OrderSampleSortInput) {
        requestQuoteReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
            items {
                address1
                address2
                addressGuid
                asi
                basketFreightCharges
                city
                color
                companyName
                createdBy
                createdDate
                createdDateUtc
                countryGUID
                deliveryDate
                emailAddress
                extensionNo
                firstName
                imageName
                lastName
                note
                needQuoteby
                orderNumber
                phone
                productCode
                productName
                quantity
                requestQuoteNumber
                requestQuoteGuid
                state
                status
                totalOrderPrice
                userGuid
                websiteGuid
                zip
                ppai
                sage
                upic
                rfqType
                requestQuoteItems {
                    productName
                    quantity
                }
                billingInformation {
                    billingAddress1
                    billingAddress2
                    billingFirstName
                    billingLastName
                    billingCompanyName
                    billingCountryGUID
                    billingCity
                    billingEmailId
                    billingExtensionNo
                    billingPhone
                    billingState
                    billingZip
                }
                shippingInformation {
                    shippingAddress1
                    shippingAddress2
                    shippingCompanyName
                    shippingCountryGUID
                    shippingCity
                    shippingEmailId
                    shippingExtensionNo
                    shippingFirstName
                    shippingLastName
                    shippingPhone
                    shippingState
                    shippingZip
                }
                requestQuoteItems {
                    color
                    imageName
                    imprintMethodName
                    imprintLocations {
                        imprintLocationName
                        imprintColors
                    }
                    productCode
                    productDefaultImage
                    productName
                    price
                    quantity
                }
            }
            quoteAverage {
                productCode
                productName
                quoteAvgPrice
                quoteAvgQuantity
                quoteStatus
                totalQuoteItemChargePrice
                totalQuoteItemPrice
                totalQuotePrice
            }
        }
    }
`;

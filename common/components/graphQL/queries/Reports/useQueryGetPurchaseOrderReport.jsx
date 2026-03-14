import { gql } from "@apollo/client";
export const useQueryGetPurchaseOrderReport = gql`
    query purchaseOrderReport($take: Int!, $skip: Int!, $where: OrderFilterInput, $order: OrderSortInput) {
        purchaseOrderReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
             items {
                billingInformation {
                    billingEmailId
                    billingFirstName
                    billingName
                    billingCompanyName
                    billingExtensionNo
                    billingPhone
                }
                createdDateUtc
                createdBy
                deliveryDate
                companyName
                contactEmail
                contactPhone
                contactName
                expiryDate
                instructions
                orderNumber
                ppai
                poNumber
                poFileName
                poFilePath
                inHandsDate
                submitPOlist {
                    submitPOFileName
                    submitPOFilePath
                    submitPOGuid
                }
            }
        }
    }
`;

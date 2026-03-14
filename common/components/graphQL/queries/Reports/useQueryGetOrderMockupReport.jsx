import { gql } from "@apollo/client";
export const useQueryGetOrderMockupReport = gql`
    query orderMockupReport($skip: Int!, $take: Int!, $where: MockupSampleFilterInput!, $order: MockupSampleSortInput!) {
        orderMockupReport(skip: $skip, take: $take, where: $where, order: $order) {
            totalCount
            items {
                productName
                emailAddress
                createdDate
                organisation
                sampleGuid
                websiteGuid
                userName
                phoneNumber
                extensionNo
                howYouHereAboutUs
                address
                cityName
                stateName
                zipCode
                createdDate
                productCode
                productImage
                imageName
            }
        }
    }
`;

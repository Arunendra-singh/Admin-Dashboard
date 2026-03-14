import { gql } from "@apollo/client";
export const useQueryGetNewsletterReport = gql`
    query newsLetterReport($take: Int!, $skip: Int!, $where: NewsLetterFilterInput, $order: NewsLetterSortInput) {
        newsLetterReport(order: $order, where: $where, take: $take, skip: $skip) {
            totalCount
            items {
                companyName
                createdBy
                createdDateUtc
                emailAddress
                firstName
                isRegistered
                lastName
                pageNo
                searchText
                state
                websiteGuid
            }
        }
    }
`;

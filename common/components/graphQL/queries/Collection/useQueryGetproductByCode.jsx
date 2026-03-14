import { gql } from "@apollo/client";

export const useQueryGetproductByCode = gql`
    query getproductByCode($collectionGuid: String!, $categoryGuid: String!, $unassignproduct: String!, $productcode: String!) {
        productByCode(collectionGuid: $collectionGuid, categoryGuid: $categoryGuid, unassignproduct: $unassignproduct, productcode: $productcode) {
            activeCount
            inactiveCount
            totalCount
            items {
                assign
                collectionGuid
                collectionType
                createdDateUtc
                displayOrder
                isActive
                languageGuid
                lbAssignId
                lbUnassignId
                productCode
                productCount
                productGuid
                productID
                productName
                webSiteGuid
                collectionName
                parentCollectionGuid
                mapGuid
                mappedProduct
                productNetsuiteId
                similarProduct
                imagename
                defaultCategory
                productNameWithCode
            }
        }
    }
`;

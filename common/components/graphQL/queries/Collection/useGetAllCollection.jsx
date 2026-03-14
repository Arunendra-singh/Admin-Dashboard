import { gql } from "@apollo/client";

export const useGetAllCollection = gql`
    query getallCollection($take: Int!, $skip: Int!, $order: CategorySortInput, $where: CategoryFilterInput) {
        allCollection(take: $take, skip: $skip, where: $where, order: $order) {
            totalCount
            items {
                collectionGuid
                collectionName
                collectionType
                parentCollectionGuid
                productCount
                parentCollectionName
                displayOrder
                subCategories {
                    collectionGuid
                    collectionName
                    collectionType
                    parentCollectionGuid
                    parentCollectionName
                    productCount
                    displayOrder
                    subCategories {
                        collectionGuid
                        collectionName
                        collectionType
                        parentCollectionGuid
                        parentCollectionName
                        productCount
                        displayOrder
                        subCategories {
                            collectionGuid
                            collectionName
                            collectionType
                            parentCollectionGuid
                            parentCollectionName
                            productCount
                            displayOrder
                        }
                    }
                }
            }
        }
    }
`;

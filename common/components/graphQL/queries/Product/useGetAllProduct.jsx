import { gql } from "@apollo/client";
export const useGetAllProduct = gql`
    query getallProduct($skip: Int! = 1, $take: Int!, $filter: ProductFilterInput, $sort: ProductSortInput) {
        allProducts(skip: $skip, take: $take, where: $filter, order: $sort) {
            totalCount
            activeCount
            inactiveCount
            items {
                productCode
                productName
                productGuid
                minPrice
                collectionGuids {
                    collectionName
                    collectionGuid
                }
                productSKUs {
                    inventory
                    imageName
                }
                modifiedDateUtc
                isActive
                pageTitle
                metaKeyword
                metaDescription
                isProductMirroring
                productMediaList {
                    pics {
                        url
                    }
                }
            }
        }
    }
`;

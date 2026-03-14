import { gql } from "@apollo/client";

export const useQueryGetAllProductMaterials = gql`
    query productMaterials($pageno: Int!, $pagesize: Int!, $where: ProductMaterialFilterInput, $order: ProductMaterialSortInput) {
        productMaterials(pageno: $pageno, pagesize: $pagesize, where: $where, order: $order) {
            activeCount
            inactiveCount
            totalCount
            items {
                productMaterialGuid
                productMaterialName
                isActive
                languageGuid
                websiteGuid
            }
        }
    }
`;

export const AddProductMaterialAPI = gql`
    mutation addUpdateProductMaterials($productMaterialName: String!, $languageGuid: String!, $websiteGuid: String!, $productMaterialGuid: String!) {
        addUpdateProductMaterials(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, productMaterialName: $productMaterialName, productMaterialGuid: $productMaterialGuid }) {
            message
            statuscode
            success
        }
    }
`;

export const UpdateProductMaterialAPI = gql`
    mutation addUpdateProductMaterials($productMaterialName: String!, $languageGuid: String!, $websiteGuid: String!, $productMaterialGuid: String!, $isactive: Boolean!) {
        addUpdateProductMaterials(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, productMaterialName: $productMaterialName, productMaterialGuid: $productMaterialGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

export const DeleteProductMaterialAPI = gql`
    mutation deleteProductMaterials($productMaterialGuid: String!) {
        deleteProductMaterials(productMaterialGuid: $productMaterialGuid) {
            message
            statuscode
            success
        }
    }
`;

export const EnableDisableProductMaterial = gql`
    mutation enableDisableProductMaterials($productMaterialName: String!, $languageGuid: String!, $websiteGuid: String!, $productMaterialGuid: String!, $isactive: Boolean!) {
        enableDisableProductMaterials(entity: { languageGuid: $languageGuid, websiteGuid: $websiteGuid, productMaterialName: $productMaterialName, productMaterialGuid: $productMaterialGuid, isActive: $isactive }) {
            message
            statuscode
            success
        }
    }
`;

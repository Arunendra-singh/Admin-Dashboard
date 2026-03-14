import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { useQueryGetCategoryDetailsForEdit } from "common/components/graphQL/queries/Collection/useQueryGetCategoryDetailsForEdit";
import CollectionCreate from "~/components/Collection/Index";

const AddEditCollection = () => {
    const location = useLocation();
    const guid = location?.pathname?.split("/")?.pop();
    const { data: getCategoryData } = useQuery(useQueryGetCategoryDetailsForEdit, {
        variables: {
            collectionGuid: guid?.toLowerCase() !== "create" ? guid : ""
        }
    });

    const isEdit = guid !== null && guid !== "" && guid !== undefined && guid?.toLowerCase() !== "create";

    return <CollectionCreate categoryEditData={getCategoryData?.categoryDetailsForEdit?.data} isEdit={isEdit} collectionGuid={guid?.toLowerCase() !== "create" ? guid : ""} />;
};
export default AddEditCollection;

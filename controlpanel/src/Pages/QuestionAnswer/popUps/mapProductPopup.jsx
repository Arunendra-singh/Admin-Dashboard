import { useEffect, useState } from "react";
import { useGetAllQaCategoryData, useGetQAProductSKUs } from "common/hooks/react/api";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Pagination from "~/components/common/DataTable/Pagination";
import AutoSuggestSearchInput from "~/Pages/QuestionAnswer/AutoSuggestSearch";
import CategoryDropdownMenu from "../CategoryBaseProductSearch/categoryDropdown";
import MapProductSkuPopup from "./mapProductSkuPopup";
import "./questnAnsPopup.scss";

const MapProductPopup = ({ showPopup, closePopup, onSave, mappedProducts }) => {
    const [PagePerRecord] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [resetState, setResetState] = useState(false);
    const [showMapSKUPopup, setMapSKUPopup] = useState(false);
    const [MapSKUData, setMapSKUData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [existingProducts, setExistingProducts] = useState(mappedProducts || []); // Previous data
    const [newlyAddedProducts, setNewlyAddedProducts] = useState([]); // New data
    const [selectedProductGuid, setSelectedProductGuid] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { data: GetCategories } = useGetAllQaCategoryData();
    const { data: productSKUs } = useGetQAProductSKUs(selectedProductGuid); // Pass the selected category or productGuid
    useEffect(() => {
        if (productSKUs) {
            // Handle SKU data as needed
            // console.log(productSKUs);
            setMapSKUData(productSKUs);
            setMapSKUPopup(true);
        }
    }, [productSKUs]);

    useEffect(() => {
        setExistingProducts(mappedProducts || []); // Update existing products when mappedProducts prop changes
    }, [mappedProducts]);

    useEffect(() => {
        const allProducts = [...existingProducts, ...newlyAddedProducts];
        setTotalPages(Math.ceil(allProducts.length / PagePerRecord));
        setCurrentPage(1); // Reset to first page on products change
    }, [existingProducts, newlyAddedProducts, PagePerRecord]);

    // console.log(newlyAddedProducts, "newlyAddedProducts");

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSuggestionSelect = (value) => {
        const isProductExisting = existingProducts.some((product) => product?.productGuid === value?.productGuid);
        const isProductNewlyAdded = newlyAddedProducts.some((product) => product?.productGuid === value?.productGuid);
        // Create the product object in the required format
        const newProduct = {
            productGuid: value?.productGuid,
            productName: value?.productName,
            productCode: value?.productCode || "",
            questionAnswerGuid: null,
            isAllSku: false,
            selectedSkus: "",
            oldSelectedSkus: null,
            oldSelectedProducts: null
        };

        if (isProductExisting) {
            // If product is already in existingProducts, set the error message
            setErrorMessage("Product already selected.");
        } else if (!isProductNewlyAdded) {
            // If product is neither in existing nor newly added products, add to newly added products
            setNewlyAddedProducts((prev) => [...prev, newProduct]);
            setErrorMessage(""); // Clear any previous error message
        }

        setResetState((prev) => !prev); // Reset input field if necessary
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const removeOption = (productGuid) => {
        setNewlyAddedProducts((prev) => prev.filter((item) => item?.productGuid !== productGuid)); // Remove by ProductGuid
    };

    const saveSelectedProduct = () => {
        const allProducts = [...existingProducts, ...newlyAddedProducts]; // Combine both data
        onSave(allProducts); // Pass combined products to the parent component
        setNewlyAddedProducts([]); // Clear newly added products
        closePopup(); // Close the popup after saving
    };
    // console.log(existingProducts, "existingProducts");

    const closeSKUPopup = () => {
        setMapSKUPopup(false); // Close the SKU popup
    };

    const handleSaveSKU = (selectedSku, isAllSku, selskuPrd) => {
        // console.log(selectedSku, "selectedSku save");
        // console.log(selskuPrd, "selskuPrd");
        // Combine existing and newly added products
        const combinedProducts = [...existingProducts, ...newlyAddedProducts];

        // Gather all selected product GUIDs
        const allSelectedProductGuids = combinedProducts.map((product) => product?.productGuid).join(",");

        // Update all products, setting oldSelectedSkus and oldSelectedProducts
        const updatedProducts = combinedProducts.map((product) => {
            const isSelectedProduct = product.productGuid === selskuPrd?.productGuid;

            return {
                ...product,
                oldSelectedSkus: product?.selectedSkus || null, // Preserve the old selected SKUs
                oldSelectedProducts: allSelectedProductGuids, // Preserve all selected product GUIDs
                isAllSku: isSelectedProduct ? isAllSku : product.isAllSku,
                // Update selectedSkus only if it matches selskuPrd
                selectedSkus: isSelectedProduct ? selectedSku.join(",") : product.selectedSkus,
            };
        });

        // Split updated products back into existing and newly added
        const updatedExistingProducts = updatedProducts.filter((product) => existingProducts.some((existing) => existing?.productGuid === product?.productGuid));
        const updatedNewlyAddedProducts = updatedProducts.filter((product) => newlyAddedProducts.some((newProduct) => newProduct?.productGuid === product?.productGuid));

        // Update the state with the new products
        setExistingProducts(updatedExistingProducts);
        setNewlyAddedProducts(updatedNewlyAddedProducts);

        closeSKUPopup(); // Close the SKU popup
    };

    const editOption = (productGuid, product) => {
        setSelectedProductGuid(productGuid);
        setSelectedProduct(product);
    };

    const indexOfLastProduct = currentPage * PagePerRecord;
    const indexOfFirstProduct = indexOfLastProduct - PagePerRecord;
    const currentProducts = [...existingProducts, ...newlyAddedProducts].slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <Modal className="MaptoProductsPop" size="lg" show={showPopup} onHide={closePopup}>
                <ModalHeader closeButton={true}>
                    <ModalTitle>Map to Products</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="popupContent-Wrap">
                        <div className="searchRow">
                            <CategoryDropdownMenu GetCategories={GetCategories} onCategorySelect={handleCategorySelect} />
                            <AutoSuggestSearchInput selectedcategoryGuid={selectedCategory} onSuggestionSelect={handleSuggestionSelect} resetState={resetState} placeholder="Search by product..." />
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger d-none">{errorMessage}</div>
                        )}
                        <div className="table-responsive">
                            <table className="table formTable" id="poptable1">
                                <thead>
                                    <tr>
                                        <th>Selected Products</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((product) => (
                                            <tr key={product?.productGuid}>
                                                <td>{product?.productName}</td>
                                                <td className="text-center">
                                                    <span className="btn-icon-only" onClick={() => editOption(product?.productGuid, product)}>
                                                        <i className="icon icon-edit-1" />
                                                    </span>
                                                    <span className="btn-icon-only" onClick={() => removeOption(product?.productGuid)}>
                                                        <i className="icon icon-trash-2" />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="noRecords text-center">
                                                <strong>No products selected</strong>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {currentProducts.length > 0 && totalPages > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                    <div className="table-action-btns mb-3">
                        <button type="submit" className="btn btn-submit ml-auto" onClick={saveSelectedProduct}>
                            Save & Close
                        </button>
                    </div>
                </ModalBody>
            </Modal>
            {showMapSKUPopup && <MapProductSkuPopup showPopup={showMapSKUPopup} closePopup={closeSKUPopup} onSave={handleSaveSKU} selectedProduct={selectedProduct} mappedSKU={MapSKUData} />}
        </>
    );
};

export default MapProductPopup;

/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Pagination from "~/components/common/DataTable/Pagination";
import "./questnAnsPopup.scss";

const MapProductSkuPopup = ({ showPopup, closePopup, onSave, selectedProduct, mappedSKU }) => {
    const [PagePerRecord] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Initialize with 1 to avoid NaN
    const [isAllSku, setIsAllSku] = useState(false);
    const [selectedSKUs, setSelectedSKUs] = useState([]); // New state for selected products
    const [currentSKUs] = useState(mappedSKU || []); // State to hold all SKUs (assuming you will populate this elsewhere)
    // console.log(selectedSKUs, "selectedSKUs1");
    // console.log(selectedSKUs, "mappedSKU1");
    // console.log(selectedProduct, "selectedProduct");
    // Initialize selected SKUs with the ones from selectedProduct.selectedSkus
    useEffect(() => {
        // Ensure selectedProduct.selectedSkus is an array of strings (SKUs)
        if (selectedProduct?.selectedSkus) {
            let skus = selectedProduct.selectedSkus;

            // Check if it's a string (incorrect type) and split it into an array
            if (typeof skus === "string") {
                skus = skus.split(","); // Assuming SKUs are comma-separated in the string
            }

            // Set the selected SKUs (it should now be an array)
            setSelectedSKUs(skus);
        }
    }, [selectedProduct]);

    useEffect(() => {
        // Update total pages whenever selected products change
        setTotalPages(Math.ceil(currentSKUs.length / PagePerRecord));
        setCurrentPage(1);
    }, [currentSKUs, mappedSKU, PagePerRecord]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const selectOption = (sku) => {
        setSelectedSKUs((prevSelected) => {
            let newSelected;
            if (prevSelected.includes(sku)) {
                newSelected = prevSelected.filter((item) => item !== sku);
            } else {
                newSelected = [...prevSelected, sku];
            }
            // Update isAllSku based on the new selection
            const allSKUsSelected = newSelected.length === currentSKUs.length; // Check if all SKUs are selected
            setIsAllSku(allSKUsSelected);

            return newSelected;
        });
    };

    const selectedAll = () => {
        const allCurrentSKUs = currentSKUs.map((item) => item.skuGuid); // Ensure you get SKU GUIDs
        const newSelectedSKUs = [...new Set([...selectedSKUs, ...allCurrentSKUs])]; // Combine without duplicates
        setSelectedSKUs(newSelectedSKUs); // Update selected SKUs
        setIsAllSku(true);
    };

    const unSelectAll = () => {
        setSelectedSKUs([]); // Clear all selected SKUs
        setIsAllSku(false);
    };

    const saveSelectedProduct = () => {
        onSave(selectedSKUs, isAllSku, selectedProduct); // Pass selected SKUs to the parent component
        closePopup(); // Close the popup after saving
    };

    // Calculate products for the current page
    const indexOfLastSKU = currentPage * PagePerRecord;
    const indexOfFirstSKU = indexOfLastSKU - PagePerRecord;
    const paginatedSKUs = currentSKUs.slice(indexOfFirstSKU, indexOfLastSKU);

    return (
        <Modal className="MaptoProductsPop" size="lg" show={showPopup} onHide={() => closePopup()}>
            <ModalHeader closeButton={true}>
                <ModalTitle>Map SKU</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="popupContent-Wrap">
                    <div className="productDetails">
                        <p><strong>Product Name:</strong> {selectedProduct?.productName}</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table formTable skuTable" id="poptable1">
                            <thead>
                                <tr>
                                    <th>
                                        SKUs
                                        <p className="SelectionButtons">
                                            <span className="btn-link" onClick={() => selectedAll()}> Select All </span>
                                            <span className="btn-link" onClick={() => unSelectAll()}> Unselect All </span>
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedSKUs.map((item) => (
                                    <tr key={item.skuGuid}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="sbm-checkbox"
                                                checked={selectedSKUs.includes(item.skuGuid)} // Check against skuGuid
                                                onChange={() => selectOption(item.skuGuid)} // Select by skuGuid
                                            />
                                            {" "}{item.sku}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {paginatedSKUs?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
                <div className="table-action-btns mb-3">
                    <button type="submit" className="btn btn-submit ml-auto" onClick={() => saveSelectedProduct()}>
                        Save & Close
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default MapProductSkuPopup;

import React, { useState } from "react";

const ImprintMethods = () => {
    const [formData, setFormData] = useState({
        pricingName: "Standard - 1c imprint",
        notes: "1-color imprint, 3 locations",
        currency: "US Dollar ($)",
        strikePriceExpiryDate: null,
        newProduct: false,
        regularPrice: true,
        callForPrice: false,
        productionTime: "",
        additionalNotes: "",
        pricingTiers: [
            { units: 100, price: 1.63, discode: "AAA" },
            { units: 500, price: 1.57, discode: "AA" },
            { units: 1000, price: 1.53, discode: "AAA" },
            { units: 2500, price: 1.45, discode: "CC" }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePricingTierChange = (index, field, value) => {
        const updatedTiers = [...formData.pricingTiers];
        updatedTiers[index][field] = value;
        setFormData({ ...formData, pricingTiers: updatedTiers });
    };

    const addPricingTier = () => {
        setFormData({ ...formData, pricingTiers: [...formData.pricingTiers, { units: "", price: "" }] });
    };

    const removePricingTier = (index) => {
        const updatedTiers = formData.pricingTiers.filter((_, i) => i !== index);
        setFormData({ ...formData, pricingTiers: updatedTiers });
    };

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([false, false, false]);

    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const toggleImageSelection = (index) => {
        const updatedSelection = [...selectedImages];
        updatedSelection[index] = !updatedSelection[index];
        setSelectedImages(updatedSelection);
    };

    return (
        <>
            <div className="search-container">
                <button type="button" className={`search-icon ${isSearchVisible ? "active" : ""}`} onClick={handleSearchClick}>
                    <i className="icon-MagnifyingGlass" />
                </button>
                <input aria-label="searchsku" type="text" className={`search-barsku ${isSearchVisible ? "visible" : ""}`} placeholder="Search for SKU name, code..." />
                <div className="image-container">
                    {selectedImages.map((isSelected, index) => (
                        <div className={`image-box ${isSelected ? "selected" : ""}`}>
                            <input aria-label="checkbox" type="checkbox" checked={isSelected} onChange={() => toggleImageSelection(index)} />
                            <img src="sku.jpg" alt={`sku-${index}`} />
                        </div>
                    ))}
                </div>
                {isSearchVisible && <i onClick={handleSearchClick} className="icon-close_small closeicon" />}
            </div>
            <div className="form-header">
                <button type="button" className="btn-tab">
                    Screen Print
                </button>
                <button type="button" className="form-header-btn">
                    New Imprint
                </button>
            </div>
            <div className="pricing-form">
                <div className="details">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <p className="default-tag">
                                    Imprint Method <span className="icon-alert-circle" />
                                </p>
                                <select name="imprintmethod">
                                    <option value="Screenprint">Screen Print</option>
                                    <option value="Blank">Blank</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2 offset-1">
                            <div className="form-group">
                                <p className="default-tag">
                                    Imprint Location <span className="icon-alert-circle" />
                                </p>
                                <input aria-label="notes" type="text" name="notes" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <p className="default-tag">
                                    Imprint Method <span className="icon-alert-circle" />
                                </p>
                                <select name="imprintmethod">
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2 offset-1">
                            <div className="form-group">
                                <p className="default-tag">
                                    Max Imprint Colors allowed <span className="icon-alert-circle" />
                                </p>
                                <input style={{ maxWidth: "50px" }} aria-label="maxcolor" type="text" name="maxcolor" value="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <p className="default-tag">
                                    Currency <span className="icon-alert-circle" />
                                </p>
                                <select name="currency" value={formData?.currency} onChange={handleInputChange}>
                                    <option value="US Dollar ($)">US Dollar ($)</option>
                                    <option value="Euro (€)">Euro (€)</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 offset-1">
                            <div className="input-group setasdefault" style={{ flexWrap: "nowrap" }}>
                                <label htmlFor="ProductSpecific">
                                    <input type="checkbox" name="ProductSpecific" label="ProductSpecific" autoComplete="off" id="ProductSpecific" value="" />
                                    <span className="checksetdefault">Product Specific</span>
                                </label>
                                <label htmlFor="CallforPrice">
                                    <input type="checkbox" name="CallforPrice" label="CallforPrice" autoComplete="off" id="CallforPrice" value="" />
                                    <span className="checksetdefault">Call for Price</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <p className="default-tag">Select Charge</p>
                                <select name="charges">
                                    <option value="SetUpcharge">SetUpcharge</option>
                                    <option value="Runcharge">Runcharge</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2 offset-1">
                            <div className="form-group">
                                <p className="default-tag">SKU Charge Discount Code</p>
                                <input style={{ maxWidth: "50px" }} aria-label="discode" type="text" name="discode" value="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="pricing-tiers">
                            <table>
                                <thead>
                                    <tr className="bgaction">
                                        <th>Sold Per</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Disc. Code</th>
                                        <th style={{ visibility: "hidden" }}>data</th>
                                    </tr>
                                    <tr>
                                        <th>Units</th>
                                        <th> Numbers (n)</th>
                                        <th>US Dollar ($)</th>
                                        <th>Offer Code</th>
                                        <th rowSpan="2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData?.pricingTiers?.map((tier, index) => (
                                        <tr key={tier}>
                                            <td>Piece</td>
                                            <td>
                                                <input label="units" type="number" value={tier?.units} onChange={(e) => handlePricingTierChange(index, "units", e.target.value)} />
                                            </td>
                                            <td>
                                                <input label="price" type="number" value={tier?.price} onChange={(e) => handlePricingTierChange(index, "price", e.target.value)} />
                                            </td>
                                            <td>
                                                <input label="discode" type="text" value={tier?.discode} />
                                            </td>
                                            <td>
                                                <button className="btn-submit" type="button" onClick={() => removePricingTier(index)}>
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn-submit" type="button" onClick={addPricingTier}>
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImprintMethods;

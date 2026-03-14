import React, { useState } from "react";

const Attributes = () => {
    const [selectedTab, setSelectedTab] = useState("product-attributes");
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        mediaType: "",
        mediaName: "",
        sku: "",
        altText: "",
        displayOrder: ""
    });

    const openTab = (tabName) => {
        setSelectedTab(tabName);
    };

    const handleImageChange = (event) => {
        const file = event?.target?.files?.[0];
        if (file) {
            const imageUrl = URL?.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const removeProductImage = () => {
        setSelectedImage("");
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <div className="Attribute-container">
            <div className="attribute-tabs-container">
                <button type="button" className={`tablinks ${selectedTab === "product-attributes" ? "active" : ""}`} onClick={() => openTab("product-attributes")}>
                    Product Attributes
                </button>
                <button type="button" className={`tablinks ${selectedTab === "media-types" ? "active" : ""}`} onClick={() => openTab("media-types")}>
                    Media Types
                </button>
            </div>

            <div className="content-box">
                {selectedTab === "product-attributes" && (
                    <div id="product-attributes" className="tabcontent">
                        <h2>
                            Decoration & Pricing <span className="edit-icon">&#9998;</span>
                        </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sequence</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>Country of Origin</td>
                                    <td>United States</td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>Features</td>
                                    <td>
                                        <div className="toolbar">
                                            <select className="paragraph-dropdown">
                                                <option value="p">Paragraph</option>
                                                <option value="h1">Heading 1</option>
                                                <option value="h2">Heading 2</option>
                                                <option value="h3">Heading 3</option>
                                                <option value="h4">Heading 4</option>
                                            </select>
                                        </div>

                                        <div className="editable-content" contentEditable="true">
                                            Sanitizer Made in USA | Kills 99.99% of common germs known to cause infectious illnesses | Manufactured according to FDA cGMP (FDA current Good Manufacturing Practices) | Assorted colors available, absolute minimum 100 per color
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>Lead Time</td>
                                    <td>5 days</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="add-more">
                            + Add more
                        </button>
                        <div className="line-break" />
                        <button type="button" className="add-attribute">
                            Add Attributes
                        </button>
                    </div>
                )}

                {selectedTab === "media-types" && (
                    <div id="media-types" className="tabcontent">
                        <h2>
                            Media Group Name <span className="edit-icon">&#9998;</span>
                        </h2>
                        <div className="media-form">
                            <div className="media-inputs">
                                <p className="default-tag">
                                    Media Type <span className="icon-alert-circle" />
                                </p>
                                <select id="mediaType" value={formData?.mediaType} onChange={handleInputChange}>
                                    <option>Select</option>
                                </select>

                                <p className="default-tag">
                                    Media Name
                                    <span className="icon-alert-circle" />
                                </p>
                                <input aria-labelledby="mediaName" type="text" id="mediaName" value={formData?.mediaName} onChange={handleInputChange} />

                                <p className="default-tag">
                                    Select Sku <span className="icon-alert-circle" />
                                </p>
                                <select id="sku" value={formData.sku} onChange={handleInputChange}>
                                    <option>Select</option>
                                </select>

                                <p className="default-tag">
                                    Alt Text <span className="icon-alert-circle" />
                                </p>
                                <input aria-labelledby="altText" type="text" id="altText" value={formData?.altText} onChange={handleInputChange} />

                                <p className="default-tag">
                                    Display Order <span className="icon-alert-circle" />
                                </p>
                                <input aria-labelledby="displayOrder" type="text" id="displayOrder" value={formData?.displayOrder} onChange={handleInputChange} />

                                <div className="checkbox-group">
                                    <div className="checkbox-item">
                                        <label className="label1" htmlFor="blank-image-upload">
                                            <input aria-labelledby="blank-image" type="checkbox" id="blank-image-upload" className="checkbox1" />
                                            Blank Image Upload
                                        </label>
                                    </div>
                                    <div className="checkbox-item">
                                        <label htmlFor="exclude-sage" className="label1">
                                            <input aria-labelledby="excludesage" type="checkbox" id="exclude-sage" className="checkbox2" />
                                            Exclude from SAGE
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="media-upload">
                                <div className="productimage">
                                    {!selectedImage && (
                                        <>
                                            <div className="placehold">
                                                <span className="icon-XCircle" />
                                                <p className="maxsize">
                                                    .jpg, .jpeg, .png <br />
                                                    max file size: 2mb
                                                </p>
                                            </div>
                                            <input className="prodimageUploader" aria-label="uploader" type="file" accept="image/*" onChange={handleImageChange} />
                                        </>
                                    )}
                                    {selectedImage && <img width="500" height="500" src={selectedImage} className="productimage-img" alt="productimage" />}
                                    {selectedImage && (
                                        <button className="removeProdimage" type="button" onClick={removeProductImage}>
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="default-media" className="default-media-label">
                                        <input aria-labelledby="default-media" type="checkbox" id="default-media" className="default-media-checkbox" /> Set as Default Media
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="line-break" />
                        <button type="button" className="add-media">
                            Add Media
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attributes;

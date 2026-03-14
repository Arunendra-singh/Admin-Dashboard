import { useEffect, useRef, useState } from "react";

const ProductInfo = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const removeProductImage = () => {
        setSelectedImage("");
    };

    const editorRef = useRef();
    const longDescEditorRef = useRef();
    const [showLongDescEditor, setShowLongDescEditor] = useState(false);
    useEffect(() => {
        window?.ClassicEditor?.create(editorRef?.current).catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (showLongDescEditor) {
            window?.ClassicEditor?.create(longDescEditorRef?.current).catch((error) => console.error(error));
        }
    }, [showLongDescEditor]);

    const [isActive, setIsActive] = useState(true);

    const handleActiveProduct = () => {
        setIsActive(!isActive);
    };

    const handleShowLongDescEditor = () => {
        setShowLongDescEditor((prev) => !prev);
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-5 prod-img">
                    <p className="default-tag">
                        Default Product Image <span className="icon-alert-circle" />
                    </p>
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
                    <p className="productimageNote">
                        <strong>Note:</strong> Please upload SKU & VS Images with same extension only
                    </p>
                </div>
                <div className="col-md-7 ProductDetailSection">
                    <p className="default-tag">
                        Product Info <span className="icon-alert-circle" />
                    </p>
                    <div className="productdetailbox">
                        <div className="pcodeandname">
                            <input className="pcode" aria-label="pcode" type="text" name="pcode" placeholder="Enter Product Code" />
                            <br />
                            <input className="pname" aria-label="pname" type="text" name="pname" placeholder="Enter Product Name" />
                        </div>
                        <div className="categoryandDescription">
                            <div className="detailCat dropdown mb-3">
                                <p className="default-tag">
                                    Category <span className="icon-alert-circle" />
                                </p>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="descriptionedit mb-3">
                                <p className="default-tag">Short Description</p>
                                <div className="ckeditor shortdesc" ref={editorRef} />
                                <p className="default-tag mt-2">
                                    Need a Long Description?{" "}
                                    <span onClick={handleShowLongDescEditor} className="link">
                                        {showLongDescEditor ? "Remove" : "Click here"}
                                    </span>
                                </p>

                                {showLongDescEditor && (
                                    <div className="longdesc mb-3">
                                        <p className="default-tag">Long Description</p>
                                        <div className="ckeditor longdesc" ref={longDescEditorRef} />
                                    </div>
                                )}
                            </div>

                            <div className="collectionandindustry">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detailCat dropdown collections">
                                            <p className="default-tag">
                                                Collections <span className="icon-alert-circle" />
                                            </p>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>

                                        <div className="detailCat moq ">
                                            <p className="default-tag">
                                                Maximum Order Quantity <span className="icon-alert-circle" />
                                            </p>
                                            <input className="moq" aria-label="moq" type="text" name="moq" placeholder="0" />
                                        </div>

                                        <div className="detailCat dropdown collections">
                                            <p className="default-tag">
                                                Product Materials <span className="icon-alert-circle" /> <span className="link pull-right">+ Add</span>
                                            </p>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="detailCat dropdown collections">
                                            <p className="default-tag">
                                                Industry <span className="icon-alert-circle" /> <span className="link pull-right">+ Add</span>
                                            </p>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>

                                        <div className="detailCat dropdown collections">
                                            <p className="default-tag">
                                                Event Theme <span className="icon-alert-circle" /> <span className="link pull-right">+ Add</span>
                                            </p>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>

                                        <div className="detailCat dropdown collections">
                                            <p className="default-tag">
                                                Imprint Methods <span className="icon-alert-circle" /> <span className="link pull-right">+ Add</span>
                                            </p>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="visibility-toggle-container">
                                    <p>Visibility on Store</p>
                                    <div className="toggle-buttons">
                                        <button type="button" aria-label="active" className={isActive ? "active" : ""} onClick={handleActiveProduct}>
                                            Active
                                        </button>
                                        <button type="button" aria-label="Inactive" className={!isActive ? "active" : ""} onClick={handleActiveProduct}>
                                            Inactive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductInfo;

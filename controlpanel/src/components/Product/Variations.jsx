import { useEffect, useRef, useState } from "react";

const Variations = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showMultiplimage, setshowMultiplimage] = useState(false);
    const [Type, setType] = useState(null);
    const [VariantType, setVariantType] = useState(null);
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

    const skudesc = useRef();
    useEffect(() => {
        window?.ClassicEditor?.create(skudesc?.current).catch((error) => console.error(error));
    }, []);

    const [isActive, setIsActive] = useState(true);

    const handleActiveProduct = () => {
        setIsActive(!isActive);
    };
    const imageTypes = [
        { type: "Thumbnail", size: "150x150" },
        { type: "Medium", size: "300x300" },
        { type: "Large", size: "600x600" },
        { type: "Hi-Res", size: "1200x1200" }
    ];
    const [images, setImages] = useState({
        Thumbnail: null,
        Medium: null,
        Large: null,
        HiRes: null
    });

    const multiplesizeupload = (e, imageType) => {
        const file = e.target?.files?.[0];
        if (file && file?.size <= 2 * 1024 * 1024) {
            // Check if the file size is less than or equal to 2MB
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prevImages) => ({
                    ...prevImages,
                    [imageType]: reader?.result
                }));
            };
            reader?.readAsDataURL(file);
        }
    };

    const removemultiplesize = (imageType) => {
        setImages((prevImages) => ({
            ...prevImages,
            [imageType]: null
        }));
    };

    const showMultipleimage = () => {
        setshowMultiplimage(!showMultiplimage);
    };

    const getType = (e) => {
        const selectedvalue = e.target.value;
        setType(selectedvalue);
    };

    const getVariantType = (e) => {
        const selectedvalue = e.target.value;
        setVariantType(selectedvalue);
    };

    const sizes = ["ES", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
    return (
        <div>
            <div className="row">
                <div className="col-md-5 prod-img">
                    <p className="default-tag">
                        SKU Image <span className="icon-alert-circle" />
                        <span className="pull-right">
                            {showMultiplimage ? "Upload a single image? " : "Manually upload different sizes? "}
                            <span onClick={showMultipleimage} className="link">
                                Click here
                            </span>{" "}
                        </span>
                    </p>
                    {!showMultiplimage && (
                        <div className="productimage signleimage">
                            {!selectedImage && (
                                <>
                                    <div className="placehold">
                                        <span className="icon-XCircle" />
                                        <p className="maxsize">
                                            .jpg, .jpeg, .png <br />
                                            max file size: 2mb
                                        </p>
                                        <p className="maxsize mt-1">Recommended Dimension: 600 x 600</p>
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
                    )}
                    {showMultiplimage && (
                        <div className="multipleprodimg">
                            {imageTypes.map((imageType) => (
                                <div key={imageType.type} className="productimage">
                                    {!images[imageType.type] && (
                                        <>
                                            <div className="placehold">
                                                <span className="icon-XCircle" />
                                                <p className="maxsize">
                                                    .jpg, .jpeg, .png <br />
                                                    max file size: 2mb
                                                </p>
                                                <p className="maxsize mt-1 mb-0">Recommended Dimension: {imageType?.size}</p>
                                            </div>
                                            <input className="prodimageUploader" aria-label={`${imageType?.type} uploader`} type="file" accept="image/*" onChange={(e) => multiplesizeupload(e, imageType?.type)} />
                                            <span className="imagetype">{imageType.type}</span>
                                        </>
                                    )}
                                    {images[imageType?.type] && (
                                        <>
                                            <img width="250" height="250" src={images[imageType?.type]} className="productimage-img" alt={`${imageType?.type}`} />
                                            <button className="removeProdimage" type="button" onClick={() => removemultiplesize(imageType?.type)}>
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="productimageNote">
                        <input className="w-100" aria-label="aliasname" type="text" placeholder="Add Image Alt Text" />
                    </p>
                </div>
                <div className="col-md-7 ProductDetailSection">
                    <p className="default-tag">
                        SKU Details <span className="icon-alert-circle" />
                    </p>
                    <div className="productdetailbox">
                        <div className="pcodeandname">
                            <input className="pcode skucode" aria-label="skucode" type="text" name="skucode" placeholder="Enter SKU Code" />
                            <br />
                            <input className="pname variantname" aria-label="variantname" type="text" name="variantname" placeholder="Variant Name" />
                        </div>
                        <div className="categoryandDescription">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="detailCat dropdown mb-3">
                                        <p className="default-tag">
                                            Type <span className="icon-alert-circle" />
                                        </p>
                                        <select onChange={getType} className="form-select" aria-label="Type">
                                            <option selected>Select</option>
                                            <option value="colorsize">Color and size</option>
                                            <option value="One">One</option>
                                            <option value="Two">Two</option>
                                            <option value="Three">Three</option>
                                        </select>
                                    </div>
                                    {Type === "colorsize" && (
                                        <div className="detailCat dropdown mb-3">
                                            <p className="default-tag">
                                                Variant Type <span className="icon-alert-circle" />
                                            </p>
                                            <select onChange={getVariantType} className="form-select" aria-label="Variant Type">
                                                <option selected>Select</option>
                                                <option value="apparel">Apparel</option>
                                                <option value="1">Bag</option>
                                                <option value="2">USB</option>
                                                <option value="3">Cap</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group setasdefault">
                                        <label htmlFor="setdefault">
                                            <input type="checkbox" name="MakeDefault" label="setdefault" autoComplete="off" id="setdefault" value="" />
                                            <span className="checksetdefault">Set as default</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {VariantType === "apparel" && (
                                <div className="upchargeTable">
                                    {sizes?.map((item, index) => (
                                        <div key={item} className="tablecell">
                                            <span className="sizedata">{item}</span>
                                            <input type="text" aria-label={item} label={index} value="" name={item} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="descriptionedit mb-3">
                                <p className="default-tag">SKU Description (optional)</p>
                                <div className="ckeditor shortdesc" ref={skudesc} />
                            </div>

                            <div className="collectionandindustry">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detailCat dropdown Inventory mb-0">
                                            <p className="default-tag">
                                                Inventory <span className="icon-alert-circle" />
                                            </p>
                                            <input className="Inventory" aria-label="Inventory" type="text" name="Inventory" placeholder="0 In Stock" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="detailCat vssample mb-0">
                                            <p className="default-tag">
                                                Upload Virtual Sample Image <span className="icon-alert-circle" />
                                            </p>
                                            <input aria-label="file" type="file" id="vssapleimage" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group setasdefault ExcludeVariant">
                                            <label htmlFor="setdefault">
                                                <input type="checkbox" name="ExcludeVariant" label="ExcludeVariant" autoComplete="off" id="ExcludeVariant" value="" />
                                                <span className="ExcludeVariant">Exclude Variant Image from VS</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group setasdefault ExcludeSAGE">
                                            <label htmlFor="setdefault">
                                                <input type="checkbox" name="ExcludeSAGE" label="ExcludeSAGE" autoComplete="off" id="ExcludeSAGE" value="" />
                                                <span className="ExcludeSAGE">Exclude Variant Image from SAGE</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="visibility-toggle-container mt-3">
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
export default Variations;

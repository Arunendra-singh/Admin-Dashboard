import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { PopupV3 } from "common/utils";
import { useQueryGetAssignProduct } from "common/components/graphQL/queries/Collection/useQueryGetAssignProduct";
import { useQueryGetproductByCode } from "common/components/graphQL/queries/Collection/useQueryGetproductByCode";
import { useMutationAssignProductMapping } from "common/components/graphQL/mutations/Collection/useMutationAssignProductMapping";

import { Typeahead } from "react-bootstrap-typeahead";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { ClearCategoryCache, UpdateCategoriesProductCount } from "common/components/graphQL/queries/Js/CacheManager";
import "../../../styles/pages/productmapping.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "~/Store";

const ProductMapping = () => {
    const location = useLocation();
    const [categorieslist, setCategorieslist] = useState([]);
    const [assignedOptions, setAssignedOptions] = useState([]);
    const [selectall, setselectall] = useState(true);
    const [options, setOptions] = useState([]);
    const [unassignedOptions, setUnassignedOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [categoryname, setCategoryname] = useState("");
    const [categorytype, setCategoryType] = useState("");
    const [searchassignedOptions, setSearchassignedOptions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState("");
    const [selectedValue, setSelectedValue] = useState("All");
    const imgUrl = `${CDN_URL}/${WEBSITE_GUID}/Products/Thumbnail/`;
    const defaultSalesFlyerImg = `${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Marcomm/SalesFlyer/Default/default.jpg`;
    const [resources] = Store.useStore((store) => store?.resources);
    const typeaheadRef = useRef(null);
    const guid = location?.pathname?.split("/")?.pop();
    const navigate = useNavigate();
    const { data: categories } = useQuery(useQueryGetAssignProduct, {
        variables: {
            collectionGuid: guid || ""
        }
    });
    const [payload] = useState({
        collectionGuid: "",
        categoryGuid: "",
        unassignproduct: "",
        productcode: ""
    });
    const { refetch } = useQuery(useQueryGetproductByCode, {
        variables: payload
    });
    const [fetchAssignedProducts] = useMutation(useMutationAssignProductMapping);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (typeaheadRef.current instanceof HTMLElement && !typeaheadRef.current.contains(event.target)) {
                setSelected([]);
                setIsDropdownVisible(!isDropdownVisible);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (categories) {
            const groupedCategories = categories?.assignedProducts?.data?.listCategories?.reduce((acc, category) => {
                if (category.parentCollectionGuid === "") {
                    acc[category.collectionGuid] = { ...category, subcategories: [] };
                } else if (acc[category.parentCollectionGuid]) {
                    acc[category.parentCollectionGuid].subcategories.push(category);
                }
                return acc;
            }, {});
            const groupedCategoriesArray = Object?.values(groupedCategories);
            setCategorieslist(groupedCategoriesArray);

            const ProductlistData = categories?.assignedProducts?.data?.selectlistAssignProd?.map((item) => {
                const [code, description] = item.text.split(" - ");
                const productcode = code.trim();
                const productname = description.trim();
                const { value, imagename } = item;

                return {
                    productcode,
                    productname,
                    value,
                    imagename,
                    productguid: value
                };
            });
            setAssignedOptions(ProductlistData);
            setSearchassignedOptions(ProductlistData);
            const CategoryName = categories?.assignedProducts?.data?.listCategories.filter((item) => item.collectionGuid === guid);
            setCategoryname(CategoryName[0]?.collectionName);
            setCategoryType(CategoryName[0]?.collectionType);
        }
    }, [categories]);
    const hadleProduct = () => {
        setselectall(false);
        refetch({
            collectionGuid: "",
            categoryGuid: "",
            productcode: "",
            unassignproduct: "true"
        })
            .then((response) => {
                if (!response || !response.data || !response.data.productByCode) {
                    throw new Error("Unexpected response structure");
                }

                const allProducts = response.data.productByCode.items.map((item) => ({
                    id: item.productGuid.trim(),
                    value: item.productName.trim(),
                    productcode: item.productCode.trim(),
                    imagename: item?.imagename,
                    productguid: item?.productGuid?.trim(),
                }));

                setUnassignedOptions(allProducts);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleInputChange = (query) => {
        if (query !== "") {
            refetch({
                collectionGuid: guid,
                categoryGuid: selectedCollections,
                productcode: query,
                unassignproduct: "false"
            })
                .then((response) => {
                    if (!response || !response.data || !response.data.productByCode) {
                        throw new Error("Unexpected response structure");
                    }

                    const allProducts = response.data.productByCode.items.map((item) => ({
                        label: item.productName.trim(),
                        value: item.productGuid.trim(),
                        productcode: item.productCode.trim(),
                        imagename: item?.imagename,
                        productguid: item?.productGuid?.trim(),
                    }));

                    setOptions(allProducts);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    };

    const handleCategoryAll = (e) => {
        const isselect = e.target.value;
        setselectall(isselect);
        setUnassignedOptions([]);
    };

    const handleAssign = () => {
        const selectedValues = Array.from(document.querySelectorAll("#lbUnassignId option:checked")).map((option) => option.value);

        if (selectedValues.length === 0) {
            PopupV3({
                content: resources["Category.PmsgSelction"],
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
            return;
        }

        const newUnassignedOptions = unassignedOptions.filter((option) => !selectedValues.includes(option.id));
        const newAssignedOptions = unassignedOptions.filter((option) => selectedValues.includes(option.id));

        setUnassignedOptions(newUnassignedOptions);
        setAssignedOptions([...assignedOptions, ...newAssignedOptions]);
        setSearchassignedOptions([...assignedOptions, ...newAssignedOptions]);
    };
    const handleUnAssign = (unassigndata) => {
        // Ensure unassigndata is an array and is not empty
        if (!Array.isArray(unassigndata) || unassigndata.length === 0) {
            PopupV3({
                content: resources["Category.PmsgSelction"],
                type: "Warning",
                title: "Warning",
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true,
                        do: () => { }
                    }
                ]
            });
            return;
        }

        // Filter out items from assignedOptions that are in unassigndata based on productGuid or id
        const newAssignedOptions = assignedOptions.filter((option) => !unassigndata.some((data) => (data?.value ? data?.value?.toLowerCase() === option?.value?.toLowerCase() : data?.id?.toLowerCase() === option?.id?.toLowerCase())));

        // Create newUnassignedOptions by filtering assignedOptions
        const newUnassignedOptions = assignedOptions
            .filter((option) => unassigndata.some((data) => (data?.value ? data?.value?.toLowerCase() === option?.value?.toLowerCase() : data?.id?.toLowerCase() === option?.id?.toLowerCase())))
            .map((item) => ({
                id: item?.id ? item.id.trim() : item?.value?.trim(),
                value: item?.productname ? item.productname?.trim() : item.value?.trim(),
                productcode: item?.productCode ? item?.productCode.trim() : item.productcode?.trim(),
                imagename: item?.imagename,
                productguid: item?.id ? item.id.trim() : item?.value?.trim(),
            }));

        // Update state with new values
        setAssignedOptions(newAssignedOptions);
        setSearchassignedOptions(newAssignedOptions);
        setUnassignedOptions((prevOptions) => [...prevOptions, ...newUnassignedOptions]);
    };

    const HandlesearchAssignProduct = (e) => {
        const searchdata = e.target.value;
        if (searchdata !== "") {
            const data = searchassignedOptions?.filter((item) => item?.productcode.toLowerCase().includes(searchdata?.toLowerCase()) || item?.value?.toLowerCase().includes(searchdata?.toLowerCase()) || item?.productname?.toLowerCase().includes(searchdata?.toLowerCase()));
            setAssignedOptions(data);
        } else {
            setAssignedOptions(searchassignedOptions);
        }
    };

    const OnSubmit = async () => {
        // Prepare the data
        const AssignProductCodes = assignedOptions?.filter((item) => item?.productcode && item?.value)?.map((item) => `${item?.productcode} - ${item?.value}`);

        const AssignProducts = assignedOptions?.filter((item) => item?.id || item?.value).map((item) => item?.id || item?.value);

        try {
            const variables = {
                entity: {
                    all_ParentNameGuid: "",
                    all_ParentNameType: "",
                    assignProductCodes: AssignProductCodes,
                    assignProducts: AssignProducts,
                    collectionGuid: guid,
                    collectionType: categorytype,
                    warehouseGuid: "",
                    isProductMirroring: false,
                    unAssignProductCodes: ""
                }
            };
            // Make the API call
            const res = await fetchAssignedProducts({
                variables
            });

            if (res.data.assignMappedProduccts.statuscode === 200) {
                // Actions after successful API call
                const payloadnew = {
                    addCategoryIds: [
                        guid
                    ],
                    categoryType: categorytype,
                    IsProductMirroring: false

                };
                UpdateCategoriesProductCount(payloadnew);

                ClearCategoryCache();

                PopupV3({
                    content: resources["Category.PmsgSuccess"],
                    type: "Success",
                    title: "Success",
                    classes: "SuccessCloseBtn",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                navigate("/v2/Collection/GetAllCollection");
                            }
                        }
                    ]
                });
            }
        } catch (error) {
            console.error("Error assigning products:", error);
            // Handle the error, e.g., display an error message
        }
    };
    const collectionTypes = [...new Set(categorieslist?.map((collection) => collection.collectionType))].sort((a, b) => {
        if (a === "Category") return -1;
        if (b === "Category") return 1;
        return 0;
    });
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const toggleDropdownVisibility = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSelect = (value, guidnew) => {
        setSelectedCollections(guidnew);
        setSelectedValue(value);
        setIsDropdownVisible(false);
    };
    return (
        <section className="midContent">
            <div className="AddSalesFlyer-Main product-mapping d-lg-flex flex-lg-wrap align-items-lg-stretch">
                <div className="left-form position-relative">
                    <div className="form-sec h-100">
                        <div className="header-addsales d-flex align-items-center mb-3">
                            <h3>Mapping</h3>
                        </div>
                        <form>
                            <div className="FormDiv pb-5 pl-2 pr-2">
                                <label htmlFor="Collection Name">
                                    Collection Name
                                    <input type="text" className="form-group mt-2" readOnly={true} placeholder="Enter Collection Name" label="Collection Name" id="CollectionName" value={categoryname} name="Collection Name" />
                                </label>
                                <div className="form-group input-Collection category  input-text mb-2 mt-2">
                                    <label htmlFor="category">
                                        <input label="Select Category" type="radio" name="category" className="select-category" checked={selectall} onChange={handleCategoryAll} />
                                        <span>Select Category</span>
                                    </label>
                                </div>
                                <div className="SelectCollect clsProductMapping_SearchCategory">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                            <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1890_2198)">
                                            <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                        </g>
                                    </svg>

                                    <div className="multi-select-dropdown form-group collection-dropdown clsCollcetionAddEdit_ParentCollection">
                                        <div className="dropdown" ref={dropdownRef}>
                                            <div className="SelectCollect">
                                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <mask id="mask0_1890_2198" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                                                        <rect y="0.320312" width="16" height="16" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_1890_2198)">
                                                        <path d="M8 10.5703L4 6.5703L4.93333 5.63696L8 8.70363L11.0667 5.63696L12 6.5703L8 10.5703Z" fill="#667B84" />
                                                    </g>
                                                </svg>
                                                <button onClick={toggleDropdownVisibility} type="button" className="dropdown-btn form-control">
                                                    {selectedValue}
                                                </button>
                                                {isDropdownVisible && (
                                                    <div className="dropdown-content">
                                                        <div className="option" onClick={() => handleSelect("All", "")}>
                                                            All
                                                        </div>
                                                        {collectionTypes?.map((type) => (
                                                            <div key={type} className="typename">
                                                                <strong>{type}</strong>
                                                                {categorieslist
                                                                    .filter((collection) => collection.collectionType?.toLowerCase() === type?.toLowerCase())
                                                                    .sort((a, b) => a.collectionName.localeCompare(b.collectionName))
                                                                    .map((category) =>
                                                                        (category.subcategories.length > 0 ? (
                                                                            <div className="subcategory-child mt-2" key={category.collectionGuid}>
                                                                                <strong>{category.collectionName}</strong>
                                                                                <div className="subcategory-options">
                                                                                    {category.subcategories
                                                                                        .sort((a, b) => a.collectionName.localeCompare(b.collectionName))
                                                                                        .map((subCategory) => (
                                                                                            <div key={subCategory.collectionGuid} className="option" onClick={() => handleSelect(subCategory.collectionName, subCategory.collectionGuid)}>
                                                                                                {subCategory.collectionName}
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="subcategory-child mt-2" key={category.collectionGuid}>
                                                                                <strong>{category.collectionName}</strong>
                                                                                <div className="subcategory-options">
                                                                                    {category.subcategories
                                                                                        .sort((a, b) => a.collectionName.localeCompare(b.collectionName))
                                                                                        .map((subCategory) => (
                                                                                            <div key={subCategory.collectionGuid} className="option" onClick={() => handleSelect(subCategory.collectionName, subCategory.collectionGuid)}>
                                                                                                {subCategory.collectionName}
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            </div>
                                                                        )))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-wrapper clsSales_SearchNew clsProductMapping_SearchUnAssignedProduct">
                                    <svg className="search" width="15" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                            fill="#334F5B"
                                        />
                                    </svg>
                                    <div>
                                        <Typeahead
                                            id="typeahead"
                                            placeholder="Search..."
                                            className="clsCollcetionListing_Search"
                                            onInputChange={handleInputChange}
                                            onChange={(selectedItems) => {
                                                const presentdata = assignedOptions?.filter((option) => selectedItems?.some((data) => (data?.productguid && data?.productguid?.toLowerCase() === option?.productguid?.toLowerCase())));
                                                // const presentdata = assignedOptions?.filter((option) => selectedItems?.some((data) => (data?.value ? data?.value?.toLowerCase() === option?.id?.toLowerCase() : data?.id?.toLowerCase() === option?.value?.toLowerCase())));
                                                if (presentdata?.length > 0) {
                                                    PopupV3({
                                                        content: resources["Assigned Product Warning"],
                                                        type: "Warning",
                                                        title: "Warning",
                                                        actions: [
                                                            {
                                                                text: "Ok",
                                                                classes: "ok",
                                                                dismiss: true,
                                                                do: () => { }
                                                            }
                                                        ]
                                                    });
                                                    setSelected([]);
                                                } else {
                                                    setSelected(selectedItems);
                                                }
                                                if (selectedItems?.length > 0 && presentdata?.length === 0) {
                                                    const newUnassignedOptions = selectedItems.map((item) => ({
                                                        id: item?.value ? item.value.trim() : item?.id?.trim(),
                                                        value: item?.label ? item.label?.trim() : item?.value?.trim(),
                                                        productcode: item?.productcode ? item?.productcode.trim() : item?.productCode?.trim(),
                                                        imagename: item?.imagename,
                                                        productguid: item?.value ? item.value.trim() : item?.id?.trim(),
                                                    }));
                                                    const presentdatanew = unassignedOptions?.filter((option) => selectedItems?.some((data) => (data?.productguid && data?.productguid?.toLowerCase() === option?.productguid?.toLowerCase())));
                                                    if (presentdatanew?.length === 0) {
                                                        setUnassignedOptions((prevOptions) => [...prevOptions, ...newUnassignedOptions]);
                                                    } else if (presentdatanew?.length > 0) {
                                                        PopupV3({
                                                            content: resources["Assigned Product Warning"],
                                                            type: "Warning",
                                                            title: "Warning",
                                                            actions: [
                                                                {
                                                                    text: "Ok",
                                                                    classes: "ok",
                                                                    dismiss: true,
                                                                    do: () => { }
                                                                }
                                                            ]
                                                        });
                                                        setSelected([]);
                                                    }
                                                    setSelected([]);
                                                }
                                            }}
                                            selected={selected}
                                            options={options}
                                            ref={typeaheadRef}
                                            disabled={!selectall}
                                        // allowNew={false} // Optionally allow creating new items
                                        />

                                        {/* <button onClick={addOption}>Add Option</button> */}
                                    </div>
                                </div>
                                <div className="form-group input-Collection GetAllProduct clsProductMapping_GetAllUnAssignedProducts input-text mb-3">
                                    <label htmlFor="category">
                                        <input label="Get all unassigned Product" type="radio" name="category" className="select-category" value="category1" onClick={() => hadleProduct()} />
                                        <span>Get all unassigned Product</span>
                                    </label>
                                </div>
                                <div className="form-group input-Collection productArrow  input-text">
                                    <div className="productDropdown">
                                        <span>Product</span>
                                        <span className="arrow clsProductMapping_Assignbutton" onClick={handleAssign}>
                                            &#8594;
                                        </span>
                                    </div>
                                </div>
                                <div className="row mappingCollect clsProductMapping_lstUnAssignProd">
                                    <div>
                                        <div className="select-wrap no-selbg">
                                            <select id="lbUnassignId" multiple name="lstUnAssignProd" className="form-control clsProductMapping_lstUnAssignProd">
                                                {unassignedOptions?.map((option) => (
                                                    <option key={option?.id} value={option?.id} data-custom={option?.productcode}>
                                                        {option?.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="MappingTable clsProductMapping_lstAssignProducts">
                    <div className="search-section">
                        <h3>Assigned Products</h3>
                        <div className="input-wrapper mr-3 SearchNew-Table">
                            <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                    fill="#334F5B"
                                />
                            </svg>
                            <input type="search" aria-label="Search" className="clear-button" placeholder="Search by product name , product code" onChange={HandlesearchAssignProduct} />
                        </div>
                    </div>
                    <div className="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th className="img">Image</th>
                                    <th className="Pcode">Product Code</th>
                                    <th className="Pname">Product Name</th>
                                    <th className="remove">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedOptions?.length > 0 &&
                                    assignedOptions?.map((item) => {
                                        const imageUrl = item.imagename !== null && item.imagename !== undefined && item.imagename !== "" ? `${imgUrl}${item.imagename}` : defaultSalesFlyerImg;

                                        return (
                                            <tr key={item.productcode}>
                                                <td className="productImg">
                                                    <img src={imageUrl} className="lazyload img-fluid" width="380" height="380" alt={item?.imagename} />
                                                </td>
                                                <td>{item?.productcode}</td>
                                                <td>{item?.productname || item.value}</td>
                                                <td className="btn-close1">
                                                    <button type="button" onClick={() => handleUnAssign([item])} className="close clsProductMapping_UnAssignbutton" aria-label="Close">
                                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask id="mask0_1980_10690" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="23">
                                                                <rect x="0.138672" y="0.617188" width="22" height="22" fill="#D9D9D9" />
                                                            </mask>
                                                            <g mask="url(#mask0_1980_10690)">
                                                                <path
                                                                    d="M7.83851 15.8831L11.1385 12.5831L14.4385 15.8831L15.4044 14.9171L12.1044 11.6171L15.4044 8.31715L14.4385 7.35121L11.1385 10.6512L7.83851 7.35121L6.87257 8.31715L10.1726 11.6171L6.87257 14.9171L7.83851 15.8831ZM11.1401 20.3255C9.93561 20.3255 8.80345 20.0969 7.74363 19.6398C6.68381 19.1827 5.76195 18.5623 4.97805 17.7788C4.19415 16.9952 3.57349 16.0737 3.11607 15.0143C2.65881 13.955 2.43018 12.8231 2.43018 11.6188C2.43018 10.4143 2.65873 9.28209 3.11584 8.22227C3.57295 7.16245 4.19331 6.24059 4.97691 5.45669C5.7605 4.67279 6.68198 4.05213 7.74134 3.59471C8.8007 3.13745 9.93256 2.90881 11.1369 2.90881C12.3414 2.90881 13.4736 3.13737 14.5334 3.59448C15.5932 4.05159 16.5151 4.67195 17.299 5.45554C18.0829 6.23914 18.7035 7.16062 19.1609 8.21998C19.6182 9.27934 19.8468 10.4112 19.8468 11.6155C19.8468 12.82 19.6183 13.9522 19.1612 15.012C18.7041 16.0718 18.0837 16.9937 17.3001 17.7776C16.5165 18.5615 15.595 19.1822 14.5357 19.6396C13.4763 20.0968 12.3445 20.3255 11.1401 20.3255ZM11.1385 18.9505C13.1857 18.9505 14.9198 18.2401 16.3406 16.8192C17.7614 15.3984 18.4718 13.6644 18.4718 11.6171C18.4718 9.56992 17.7614 7.8359 16.3406 6.41506C14.9198 4.99423 13.1857 4.28381 11.1385 4.28381C9.09129 4.28381 7.35726 4.99423 5.93643 6.41506C4.51559 7.8359 3.80518 9.56992 3.80518 11.6171C3.80518 13.6644 4.51559 15.3984 5.93643 16.8192C7.35726 18.2401 9.09129 18.9505 11.1385 18.9505Z"
                                                                    fill="#405660"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <button type="submit" className="btn btn_create btn-sm mt-5 clsProductMapping_Savebutton" onClick={OnSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductMapping;

/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from "react";
import { LazyImage } from "common/components";
import moment from "moment/moment";
import "../../styles/pages/salescard.scss";
import "../../styles/pages/sales-listing.scss";
import "../../styles/layout/CardsContainer.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import { useGestureResponder } from "react-gesture-responder";
import { useMutationUpadate } from "common/components/graphQL/mutations/SalesFlayer/useMutationUpdate";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { PopupV3 } from "common/utils";
import { useMutationEnble } from "common/components/graphQL/mutations/SalesFlayer/useMutationEnble";
import { useQueryGetSalesFlyer } from "common/components/graphQL/queries/Sales/useQueryGetSalesFlyer";
import { useMutationDelete } from "common/components/graphQL/mutations/SalesFlayer/useMutationDelete";

// import moment from "moment";

const Card = ({ Data, handleReset, selectedCheckboxes, handleCheckboxChange, setdeletedata, view, columnName, reorder, reversorting, sortOrdernew }) => {
    const imgUrl = `${CDN_URL}/${WEBSITE_GUID}/Marcomm/SalesFlyer/Default/`;
    const defaultSalesFlyerImg = `${CDN_URL}/8FF00A25-B6ED-4799-9D2F-412DBA1F7C66/Marcomm/SalesFlyer/Default/default.jpg`;
    const [sortedData, setSortedData] = useState(Data);
    const [sortOrder, setSortOrder] = useState("asc");
    const [items, setItems] = useState(Data);
    const [UpdateData] = useMutation(useMutationUpadate);
    const [Hightvalue, setHightvalue] = useState(null);

    useEffect(() => {
        const updatedItems = Data.map((item, index) => ({
            ...item,
            newSequence: index + 1 // or just index if you want it 0-based
        }));
        setItems(updatedItems);

        console.log("items", items);
    }, [Data]);
    useEffect(() => {
        if (Data) {
            setSortOrder(sortOrdernew);
            setSortedData(Data);
        }
    }, [Data]);

    useEffect(() => {
        setTimeout(() => {
            const gridZone = document.querySelector(".gridzone");
            const ifGridElements = gridZone.querySelectorAll(".if-grid");
            const Divlength = ifGridElements.length;
            const dividDiv = (Divlength / 6).toFixed(0);
            const newLength = parseInt(dividDiv, 10) + 1;
            const allDivHeight = 400 * newLength;
            setHightvalue(allDivHeight);
        }, 1000);
    }, []);

    const handleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const dateA = new Date(a.createdDateUtc);
            const dateB = new Date(b.createdDateUtc);
            if (sortOrder === "asc") {
                return dateA - dateB;
                // eslint-disable-next-line no-else-return
            } else {
                return dateB - dateA;
            }
        });
        setSortedData(sorted);
        const sort = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(sort);
    };

    const navigate = useNavigate();

    const h3Style = {
        color: "red"
    };

    const [showPopup, setShowPopup] = useState(false);
    const [popimage, setpopimage] = useState();
    const handlePreviewClick = (image) => {
        const path = imgUrl + (image !== null ? image : defaultSalesFlyerImg); // Ensure popimage is defined and holds the correct base path
        setpopimage(path); // Update the state with the new image path
        setShowPopup(true); // Show the popup
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const editSales = (salesFlyerGuid) => {
        navigate(`/v2/SalesFlyer/Edit/${salesFlyerGuid}`, { state: { salesFlyerId: salesFlyerGuid } });
    };

    const { refetch } = useQuery(useQueryGetSalesFlyer, {
        take: 500,
        skip: 0,
        variables: {
            filter: {
                websiteGuid: { eq: WEBSITE_GUID }
            }
        }
    });
    const EnbleDataAll = async () => {
        const resp = await refetch({
            take: 500,
            skip: 0,
            variables: {
                filter: {
                    websiteGuid: { eq: WEBSITE_GUID }
                }
            }
        });
        handleReset(resp);
    };
    const [DeleteData] = useMutation(useMutationDelete);

    const RemoveFlyer = (itemdata) => {
        // const [DeleteData] = useMutation(useMutationDelete);
        DeleteData({
            variables: {
                Guid: itemdata?.salesFlyerGuid
            }
        }).then((res) => {
            if (res?.data?.deleteSalesFlyer?.statuscode === 200) {
                PopupV3({
                    content: "Sales flyer(s) deleted successfully",
                    type: "Success",
                    classes: "Delete-SalesFlyer",
                    title: "Success",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                window.location.reload();
                            }
                        }
                    ]
                });
            }
        });
    };
    const checkDeletePages = (itemdata) => {
        PopupV3({
            content: `<div class='delete-confirm'>Are you sure you want to delete flyer? <img src="${imgUrl}${itemdata.flyerImage ? itemdata.flyerImage : defaultSalesFlyerImg}" /><span>${itemdata?.flyerName}</span> </div>`,
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: "Are you sure you want to delete flyer?",
            classes: "Delete_Popup salesflyer_del_pop",
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    do: () => {
                        RemoveFlyer(itemdata);
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };

    const ToggleNew = ({ item, index }) => {
        const [isOn, setOn] = useState(item.isActive); // Initialize with item.isActive
        // const [setActiveIndex] = useState(null);
        const [EnbleData] = useMutation(useMutationEnble);
        const toggle = () => {
            setOn((prevIsOn) => !prevIsOn); // Toggle the state of isOn
            // setActiveIndex(index); // Set activeIndex to the current index
            const enbleObject = {
                salesFlyerGuid: item.salesFlyerGuid,
                isActive: !isOn
            };
            EnbleData({
                variables: {
                    entity: enbleObject
                }
            }).then((res) => {
                if (res) {
                    EnbleDataAll();
                }
            });
        };

        return (
            <div className="toggle-button">
                <label className={`slider ${isOn ? "on" : "off"}`} htmlFor={index}>
                    <input type="checkbox" id={index} checked={isOn} onChange={toggle} />
                    <div className="sort clsSales_ActiveInactiveToggleNew"></div>
                </label>
            </div>
        );
    };
    const CheckboxComponents = ({ type, data, index, checked, filterChangeHandler }) => {
        return (
            <div className="checkbox">
                <input type="checkbox" className="clsSales_chkSelectFlyer" data-index={index} checked={checked} onChange={(e) => filterChangeHandler(type, data.salesFlyerGuid, e.target.checked)} />
            </div>
        );
    };

    const [filters, setFilters] = useState({});
    const [selectedCheckbox, setSelectedCheckboxes] = useState([]);
    const filterChangeHandler = useCallback((filterName, label, isChecked) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [label]: isChecked
        }));
        if (isChecked) {
            setSelectedCheckboxes((prevSelected) => [...prevSelected, label]); // Add label to selectedCheckboxes
        } else {
            setSelectedCheckboxes((prevSelected) => prevSelected.filter((item) => item !== label)); // Remove label from selectedCheckboxes
        }
        if (selectedCheckbox.length !== Data) {
            handleCheckboxChange(false);
        }
    }, []);
    const addBreaksAfterWords = (text, wordsPerChunk) => {
        const words = text?.split(" ");
        const result = [];
        for (let i = 0; i < words?.length; i += wordsPerChunk) {
            result?.push(words?.slice(i, i + wordsPerChunk)?.join(" "));
        }
        return result.join("<br/>");
    };
    const handleSelectAllChange = useCallback((isChecked) => {
        const updatedFilters = {};
        Data?.forEach((item) => {
            updatedFilters[item.salesFlyerGuid] = isChecked;
        });
        setFilters(updatedFilters);
        if (isChecked) {
            setSelectedCheckboxes(Data?.map((item) => item?.salesFlyerGuid));
        } else {
            setSelectedCheckboxes([]);
        }
    }, []);
    useEffect(() => {
        setdeletedata(selectedCheckbox);
    }, [selectedCheckbox]);
    useEffect(() => {
        if (selectedCheckboxes[0] === "on") {
            handleSelectAllChange(selectedCheckboxes[0] === "on");
        } else {
            handleSelectAllChange(false);
        }
    }, [selectedCheckboxes]);

    const updateDragData = (itemdata) => {
        UpdateData({
            variables: {
                entity: itemdata

                // [

                //     { salesflyerGuid: "d0cef356-b374-4192-86e2-757f9224b154", sequence: 1 },

                //     { salesflyerGuid: "f029593a-43e3-4781-a7e8-c0c4f8b3vf1d", sequence: 3 }

                // ]
            }
        }).then((res) => {
            if (res?.data?.reorder?.statuscode === 200) {
                PopupV3({
                    content: "Sales flyer(s) sequence changed successfully",

                    type: "Success",
                    classes: "Order-Change",
                    title: "Success",

                    actions: [
                        {
                            text: "Ok",

                            classes: "ok",

                            dismiss: true,

                            do: () => {
                                handleReset();
                                // window.location.reload();
                            }
                        }
                    ]
                });
            }
        });
    };

    const onChange = (sourceId, sourceIndex, targetIndex) => {
        if ((columnName?.columnName === "Sequence" || columnName === "Sequence") && reorder) {
            const nextItems = [...items];

            // Move the source item to the target position
            const [movedItem] = nextItems.splice(sourceIndex, 1);
            nextItems.splice(targetIndex, 0, movedItem);

            // Update the sequence for each item
            const updatedItems = nextItems.map((item, index) => ({
                ...item,
                sequence: index + 1, // Use index + 1 if you want 1-based index
                newSequence: index + 1
            }));

            // Set the updated items
            setItems(updatedItems);

            // Prepare the data of all items
            const allItemsData = updatedItems.map((item) => ({
                salesflyerGuid: item.salesFlyerGuid,
                sequence: item.newSequence
            }));

            // Update the dragged data with all items
            updateDragData(allItemsData);
        } else {
            PopupV3({
                content: "Please select sort by sequence to reorder",
                classes: "forgotPassAlert text-center no-footer",
                type: "Warning",
                timeout: 5000,
                pos: 5,
                actions: [
                    {
                        text: "Ok",
                        classes: "ok",
                        dismiss: true
                    }
                ]
            });
        }
    };

    const { bind } = useGestureResponder({
        onMoveShouldSet: () => true
    });
    const listView = () => (
        <div className="grid-view-header">
            <GridContextProvider onChange={onChange}>
                <GridDropZone {...bind} id="items" boxesPerRow={6} rowHeight={400} className="gridzone" style={{ height: Hightvalue }}>
                    {items ? (
                        items.map((item, index) => {
                            const imageUrl = item.flyerImage !== null && item.flyerImage !== undefined ? `${imgUrl}${item.flyerImage}` : defaultSalesFlyerImg;
                            return (
                                <GridItem key={item.salesFlyerGuid} className="if-grid">
                                    <div className="SalesFlyer-Div">
                                        <div className="card">
                                            <div className="checkbox">
                                                <CheckboxComponents key={item.salesFlyerGuid} type={item.salesFlyerGuid} data={item} index={index} checked={filters[item.salesFlyerGuid] || false} filterChangeHandler={filterChangeHandler} />{" "}
                                            </div>
                                            <div className="card-image-container clsSales_Flyers-image">
                                                <img width="380" height="380" alt={item.salesFlyerGuid} className="lazyload img-fluid" src={imageUrl} placeholder={imageUrl} />
                                            </div>
                                            <div id="Flyerscard" className="card-overlay">
                                                <div>
                                                    <span onClick={() => handlePreviewClick(item.flyerImage)} className="">
                                                        <svg className="previewIcon clsSales_QuickViewPopup" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.00162 9.18373C8.8515 9.18373 9.57331 8.88629 10.1671 8.29141C10.7608 7.69654 11.0577 6.97416 11.0577 6.12429C11.0577 5.27441 10.7602 4.5526 10.1654 3.95885C9.5705 3.3651 8.84812 3.06823 7.99825 3.06823C7.14837 3.06823 6.42656 3.36566 5.83281 3.96054C5.23906 4.55541 4.94218 5.27779 4.94218 6.12766C4.94218 6.97754 5.23962 7.69935 5.8345 8.2931C6.42937 8.88685 7.15175 9.18373 8.00162 9.18373ZM7.99993 8.15098C7.43743 8.15098 6.95931 7.9541 6.56556 7.56035C6.17181 7.1666 5.97493 6.68848 5.97493 6.12598C5.97493 5.56348 6.17181 5.08535 6.56556 4.6916C6.95931 4.29785 7.43743 4.10098 7.99993 4.10098C8.56243 4.10098 9.04056 4.29785 9.43431 4.6916C9.82806 5.08535 10.0249 5.56348 10.0249 6.12598C10.0249 6.68848 9.82806 7.1666 9.43431 7.56035C9.04056 7.9541 8.56243 8.15098 7.99993 8.15098ZM8.00087 11.376C6.27625 11.376 4.70481 10.9002 3.28656 9.94873C1.86831 8.99735 0.824059 7.7231 0.153809 6.12598C0.824059 4.52885 1.86793 3.2546 3.28543 2.30323C4.70306 1.35173 6.27425 0.875977 7.999 0.875977C9.72362 0.875977 11.2951 1.35173 12.7133 2.30323C14.1316 3.2546 15.1758 4.52885 15.8461 6.12598C15.1758 7.7231 14.1319 8.99735 12.7144 9.94873C11.2968 10.9002 9.72562 11.376 8.00087 11.376ZM7.99993 10.251C9.41243 10.251 10.7093 9.8791 11.8906 9.13535C13.0718 8.3916 13.9749 7.38848 14.5999 6.12598C13.9749 4.86348 13.0718 3.86035 11.8906 3.1166C10.7093 2.37285 9.41243 2.00098 7.99993 2.00098C6.58743 2.00098 5.29056 2.37285 4.10931 3.1166C2.92806 3.86035 2.02493 4.86348 1.39993 6.12598C2.02493 7.38848 2.92806 8.3916 4.10931 9.13535C5.29056 9.8791 6.58743 10.251 7.99993 10.251Z"
                                                                fill="#405660"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <p>Preview</p>
                                                </div>
                                                <div>
                                                    <span onClick={() => editSales(item.salesFlyerGuid)}>
                                                        <svg className="previewIcon clsSales_EditFlyer" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.75 11.751H2.69613L10.3735 4.0736L9.42737 3.12748L1.75 10.8049V11.751ZM0.625 12.876V10.3376L10.5179 0.449039C10.6312 0.346039 10.7564 0.266477 10.8934 0.210352C11.0306 0.154102 11.1743 0.125977 11.3247 0.125977C11.4751 0.125977 11.6207 0.152664 11.7616 0.206039C11.9026 0.259414 12.0274 0.344289 12.136 0.460664L13.0519 1.38804C13.1683 1.49666 13.2512 1.62166 13.3007 1.76304C13.3502 1.90441 13.375 2.04579 13.375 2.18716C13.375 2.33804 13.3492 2.48198 13.2977 2.61898C13.2463 2.7561 13.1643 2.88135 13.0519 2.99473L3.16337 12.876H0.625ZM9.89219 3.60879L9.42737 3.12748L10.3735 4.0736L9.89219 3.60879Z" fill="#405660" />
                                                        </svg>
                                                    </span>
                                                    <p>Edit</p>
                                                </div>
                                                <div>
                                                    <span onClick={() => checkDeletePages(item)}>
                                                        <svg className="previewIcon clsSales_DeleteFlyer" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.48081 12.8763C2.10681 12.8763 1.78731 12.7438 1.52231 12.479C1.25744 12.214 1.125 11.8945 1.125 11.5205V2.00127H0.375V0.876266H3.75V0.212891H8.25V0.876266H11.625V2.00127H10.875V11.5205C10.875 11.8993 10.7438 12.22 10.4813 12.4825C10.2188 12.745 9.89806 12.8763 9.51919 12.8763H2.48081ZM9.75 2.00127H2.25V11.5205C2.25 11.5878 2.27162 11.6431 2.31487 11.6864C2.35812 11.7296 2.41344 11.7513 2.48081 11.7513H9.51919C9.57694 11.7513 9.62981 11.7272 9.67781 11.6791C9.72594 11.6311 9.75 11.5782 9.75 11.5205V2.00127ZM4.053 10.2513H5.17781V3.50127H4.053V10.2513ZM6.82219 10.2513H7.947V3.50127H6.82219V10.2513Z" fill="#405660" />
                                                        </svg>
                                                    </span>
                                                    <p>Delete</p>
                                                </div>
                                                <div>
                                                    <span>
                                                        <svg className="previewIcon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5.35198 3.83689C5.29969 3.78465 5.2582 3.72261 5.22989 3.65432C5.20158 3.58604 5.18701 3.51284 5.18701 3.43892C5.18701 3.365 5.20158 3.2918 5.22989 3.22352C5.2582 3.15523 5.29969 3.09319 5.35198 3.04095L7.60198 0.79095C7.65423 0.738651 7.71626 0.697162 7.78455 0.668854C7.85284 0.640547 7.92603 0.625977 7.99995 0.625977C8.07387 0.625977 8.14707 0.640547 8.21536 0.668854C8.28364 0.697162 8.34568 0.738651 8.39792 0.79095L10.6479 3.04095C10.7535 3.1465 10.8128 3.28965 10.8128 3.43892C10.8128 3.58819 10.7535 3.73134 10.6479 3.83689C10.5424 3.94244 10.3992 4.00173 10.25 4.00173C10.1007 4.00173 9.95753 3.94244 9.85198 3.83689L8.56245 2.54665V6.25142C8.56245 6.4006 8.50319 6.54368 8.3977 6.64917C8.29221 6.75466 8.14914 6.81392 7.99995 6.81392C7.85077 6.81392 7.7077 6.75466 7.60221 6.64917C7.49672 6.54368 7.43745 6.4006 7.43745 6.25142V2.54665L6.14792 3.83689C6.09568 3.88919 6.03364 3.93068 5.96536 3.95898C5.89707 3.98729 5.82387 4.00186 5.74995 4.00186C5.67603 4.00186 5.60284 3.98729 5.53455 3.95898C5.46626 3.93068 5.40423 3.88919 5.35198 3.83689ZM9.85198 13.1659L8.56245 14.4562V10.7514C8.56245 10.6022 8.50319 10.4592 8.3977 10.3537C8.29221 10.2482 8.14914 10.1889 7.99995 10.1889C7.85077 10.1889 7.7077 10.2482 7.60221 10.3537C7.49672 10.4592 7.43745 10.6022 7.43745 10.7514V14.4562L6.14792 13.1659C6.04237 13.0604 5.89922 13.0011 5.74995 13.0011C5.60069 13.0011 5.45753 13.0604 5.35198 13.1659C5.24644 13.2715 5.18714 13.4146 5.18714 13.5639C5.18714 13.7132 5.24644 13.8563 5.35198 13.9619L7.60198 16.2119C7.65423 16.2642 7.71626 16.3057 7.78455 16.334C7.85284 16.3623 7.92603 16.3769 7.99995 16.3769C8.07387 16.3769 8.14707 16.3623 8.21536 16.334C8.28364 16.3057 8.34568 16.2642 8.39792 16.2119L10.6479 13.9619C10.7535 13.8563 10.8128 13.7132 10.8128 13.5639C10.8128 13.4146 10.7535 13.2715 10.6479 13.1659C10.5424 13.0604 10.3992 13.0011 10.25 13.0011C10.1007 13.0011 9.95753 13.0604 9.85198 13.1659ZM15.7104 8.10345L13.4604 5.85345C13.3549 5.7479 13.2117 5.68861 13.0625 5.68861C12.9132 5.68861 12.77 5.7479 12.6645 5.85345C12.5589 5.959 12.4996 6.10215 12.4996 6.25142C12.4996 6.40069 12.5589 6.54384 12.6645 6.64939L13.9547 7.93892H10.25C10.1008 7.93892 9.95769 7.99818 9.8522 8.10367C9.74672 8.20916 9.68745 8.35223 9.68745 8.50142C9.68745 8.6506 9.74672 8.79368 9.8522 8.89917C9.95769 9.00466 10.1008 9.06392 10.25 9.06392H13.9547L12.6645 10.3534C12.5589 10.459 12.4996 10.6021 12.4996 10.7514C12.4996 10.9007 12.5589 11.0438 12.6645 11.1494C12.77 11.2549 12.9132 11.3142 13.0625 11.3142C13.2117 11.3142 13.3549 11.2549 13.4604 11.1494L15.7104 8.89939C15.7627 8.84715 15.8042 8.78511 15.8325 8.71682C15.8608 8.64854 15.8754 8.57534 15.8754 8.50142C15.8754 8.4275 15.8608 8.3543 15.8325 8.28601C15.8042 8.21773 15.7627 8.15569 15.7104 8.10345ZM2.04519 9.06392H5.74995C5.89914 9.06392 6.04221 9.00466 6.1477 8.89917C6.25319 8.79368 6.31245 8.6506 6.31245 8.50142C6.31245 8.35223 6.25319 8.20916 6.1477 8.10367C6.04221 7.99818 5.89914 7.93892 5.74995 7.93892H2.04519L3.33542 6.64939C3.44097 6.54384 3.50027 6.40069 3.50027 6.25142C3.50027 6.10215 3.44097 5.959 3.33542 5.85345C3.22987 5.7479 3.08672 5.68861 2.93745 5.68861C2.78819 5.68861 2.64503 5.7479 2.53949 5.85345L0.289485 8.10345C0.237186 8.15569 0.195697 8.21773 0.167389 8.28601C0.139082 8.3543 0.124512 8.4275 0.124512 8.50142C0.124512 8.57534 0.139082 8.64854 0.167389 8.71682C0.195697 8.78511 0.237186 8.84715 0.289485 8.89939L2.53949 11.1494C2.64503 11.2549 2.78819 11.3142 2.93745 11.3142C3.08672 11.3142 3.22987 11.2549 3.33542 11.1494C3.44097 11.0438 3.50027 10.9007 3.50027 10.7514C3.50027 10.6021 3.44097 10.459 3.33542 10.3534L2.04519 9.06392Z"
                                                                fill="#405660"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <p>Move</p>
                                                </div>
                                                {/* <img src={PencilSimple} onClick={handleEdit} alt="edit" className="previewIcon" />
                                <img src={Trash} alt="delete" onClick={() => checkDeletePages(item)} className="previewIcon" />
                                <img src={ArrowsOutCardinal} alt="drag" className="previewIcon" /> */}
                                            </div>
                                        </div>

                                        <div className="card-details">
                                            <p className="Seq-num">#{item.sequence}</p>
                                            <div className="card-title">
                                                <div className="title">
                                                    <h4>{item?.flyerName?.toLowerCase()}</h4>
                                                </div>
                                                <div className="toggle-button">
                                                    <ToggleNew item={item} index={index} />
                                                </div>
                                            </div>
                                            <ul className="dates">
                                                <li>
                                                    <span className="created">Created on</span>

                                                    <span>: {moment(item.createdDateUtc).format("MMM DD, YYYY")}</span>
                                                    {/* <span>: {moment(item.createdDateUtc).format("MM/DD/YYYY")}</span> */}
                                                </li>
                                                {moment(item.expirationDateUTS).isSameOrAfter(moment(), "day") ? (
                                                    <li>
                                                        <span className="expire">Expires on</span>
                                                        <span>: {moment(item.expirationDateUTS).format("MMM DD, YYYY")}</span>
                                                    </li>
                                                ) : (
                                                    <li style={h3Style}>
                                                        <span className="expire">Expires on</span>
                                                        <span>: {moment(item.expirationDateUTS).format("MMM DD, YYYY")}</span>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </GridItem>
                            );
                        })
                    ) : (
                        <p>No flyers available</p>
                    )}
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={handleClosePopup}>
                                    &times;
                                </span>
                                <LazyImage classes="prev-img" src={popimage} alt="alt" />
                            </div>
                            <div className="popup-overlay" onClick={handleClosePopup} />
                        </div>
                    )}
                </GridDropZone>
            </GridContextProvider>
        </div>
    );

    const tableView = () => (
        <div className="List-View-header">
            <div id="zero_config_wrapper" className="dataTables_wrapper">
                <div className="table-responsive">
                    <table id="zero_config" className="table table-striped table-bordered dataTable">
                        <thead>
                            <tr>
                                <th className="tblTitle text-left">
                                    <input type="checkbox" onClick={handleCheckboxChange} />
                                </th>
                                <th className="tblTitle flyer text-left">Flyer</th>
                                <th className="tblTitle name text-left">Name</th>

                                {/* <th className={`tblTitle created-date ${sortConfig.direction === "ASC" ? "asc" : "desc"}`} onClick={() => handleDropdownSort({ dbColname: "createdDateUtc", columnNameNew: "Created On" })}>
                                    Created On
                                </th> */}
                                <th className={`tblTitle created-date text-left ${sortOrder === "ASC" || reversorting === "ASC" ? "ascnew" : "descnew"}`} onClick={handleSort}>
                                    {" "}
                                    Created On
                                    {/* <span className={sortOrder === "asc"} /> */}
                                    <span className={sortOrder === "asc" || reversorting === "ASC" ? "Asc" : "Desc"} />
                                </th>
                                <th className="tblTitle expdate text-left ">Expires On</th>
                                <th className="tblTitle seqNo text-center ">Sequence No.</th>
                                <th></th>
                                <th className="tblTitle status  ">Status</th>
                                <th className="tblTitle action text-center ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Data ? (
                                Data.map((item, index) => { */}
                            {sortedData && sortedData.length > 0 ? (
                                sortedData.map((item, index) => {
                                    const imageUrl = item.flyerImage !== null && item.flyerImage !== undefined ? `${imgUrl}${item.flyerImage}` : defaultSalesFlyerImg;

                                    return (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <tr key={index}>
                                            <td className="flyerCheckbox">
                                                <CheckboxComponents key={item.salesFlyerGuid} type={item.salesFlyerGuid} data={item} index={index} checked={filters[item.salesFlyerGuid] || false} filterChangeHandler={filterChangeHandler} />{" "}
                                            </td>
                                            <td className="flyerImg clsSales_Flyers-image">
                                                <img width="380" height="380" alt={item.salesFlyerGuid} className="lazyload img-fluid" src={imageUrl} placeholder={imageUrl} />
                                            </td>
                                            <td className="flyerName" dangerouslySetInnerHTML={{ __html: addBreaksAfterWords(item?.flyerName?.toLowerCase(), 4) }}></td>
                                            {/* <td className="flyerName">{item.flyerName}</td> */}
                                            <td className="createDate">
                                                <span> {moment(item.createdDateUtc).format("MMM DD, YYYY")}</span>
                                            </td>
                                            <td className="expDate">
                                                {moment(item.expirationDateUTS).isSameOrAfter(moment(), "day") ? <span> {moment(item.expirationDateUTS).format("MMM DD, YYYY")}</span> : <span style={h3Style}> {moment(item.expirationDateUTS).format("MMM DD, YYYY")}</span>}

                                                {/* <span>{moment(item.expirationDateUTS).format("MM/DD/YYYY")}</span> */}
                                            </td>
                                            <td className="sequenceNum text-center">#{item.sequence}</td>
                                            <td></td>
                                            <td className="stutes">
                                                {" "}
                                                <ToggleNew item={item} index={index} />
                                            </td>
                                            <td className="actionBtn text-right">
                                                <span title="Preview" onClick={() => handlePreviewClick(item.flyerImage)} className="clsSales_ListViewNew">
                                                    <svg className="previewIcon clsSales_QuickViewPopup" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M8.00162 9.18373C8.8515 9.18373 9.57331 8.88629 10.1671 8.29141C10.7608 7.69654 11.0577 6.97416 11.0577 6.12429C11.0577 5.27441 10.7602 4.5526 10.1654 3.95885C9.5705 3.3651 8.84812 3.06823 7.99825 3.06823C7.14837 3.06823 6.42656 3.36566 5.83281 3.96054C5.23906 4.55541 4.94218 5.27779 4.94218 6.12766C4.94218 6.97754 5.23962 7.69935 5.8345 8.2931C6.42937 8.88685 7.15175 9.18373 8.00162 9.18373ZM7.99993 8.15098C7.43743 8.15098 6.95931 7.9541 6.56556 7.56035C6.17181 7.1666 5.97493 6.68848 5.97493 6.12598C5.97493 5.56348 6.17181 5.08535 6.56556 4.6916C6.95931 4.29785 7.43743 4.10098 7.99993 4.10098C8.56243 4.10098 9.04056 4.29785 9.43431 4.6916C9.82806 5.08535 10.0249 5.56348 10.0249 6.12598C10.0249 6.68848 9.82806 7.1666 9.43431 7.56035C9.04056 7.9541 8.56243 8.15098 7.99993 8.15098ZM8.00087 11.376C6.27625 11.376 4.70481 10.9002 3.28656 9.94873C1.86831 8.99735 0.824059 7.7231 0.153809 6.12598C0.824059 4.52885 1.86793 3.2546 3.28543 2.30323C4.70306 1.35173 6.27425 0.875977 7.999 0.875977C9.72362 0.875977 11.2951 1.35173 12.7133 2.30323C14.1316 3.2546 15.1758 4.52885 15.8461 6.12598C15.1758 7.7231 14.1319 8.99735 12.7144 9.94873C11.2968 10.9002 9.72562 11.376 8.00087 11.376ZM7.99993 10.251C9.41243 10.251 10.7093 9.8791 11.8906 9.13535C13.0718 8.3916 13.9749 7.38848 14.5999 6.12598C13.9749 4.86348 13.0718 3.86035 11.8906 3.1166C10.7093 2.37285 9.41243 2.00098 7.99993 2.00098C6.58743 2.00098 5.29056 2.37285 4.10931 3.1166C2.92806 3.86035 2.02493 4.86348 1.39993 6.12598C2.02493 7.38848 2.92806 8.3916 4.10931 9.13535C5.29056 9.8791 6.58743 10.251 7.99993 10.251Z"
                                                            fill="#405660"
                                                        />
                                                    </svg>
                                                </span>
                                                <span title="Edit" onClick={() => editSales(item.salesFlyerGuid)}>
                                                    <svg className="previewIcon clsSales_EditFlyer" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.75 11.751H2.69613L10.3735 4.0736L9.42737 3.12748L1.75 10.8049V11.751ZM0.625 12.876V10.3376L10.5179 0.449039C10.6312 0.346039 10.7564 0.266477 10.8934 0.210352C11.0306 0.154102 11.1743 0.125977 11.3247 0.125977C11.4751 0.125977 11.6207 0.152664 11.7616 0.206039C11.9026 0.259414 12.0274 0.344289 12.136 0.460664L13.0519 1.38804C13.1683 1.49666 13.2512 1.62166 13.3007 1.76304C13.3502 1.90441 13.375 2.04579 13.375 2.18716C13.375 2.33804 13.3492 2.48198 13.2977 2.61898C13.2463 2.7561 13.1643 2.88135 13.0519 2.99473L3.16337 12.876H0.625ZM9.89219 3.60879L9.42737 3.12748L10.3735 4.0736L9.89219 3.60879Z" fill="#405660" />
                                                    </svg>
                                                </span>
                                                <span title="Delete" onClick={() => checkDeletePages(item)}>
                                                    <svg className="previewIcon  clsSales_DeleteFlyer" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.48081 12.8763C2.10681 12.8763 1.78731 12.7438 1.52231 12.479C1.25744 12.214 1.125 11.8945 1.125 11.5205V2.00127H0.375V0.876266H3.75V0.212891H8.25V0.876266H11.625V2.00127H10.875V11.5205C10.875 11.8993 10.7438 12.22 10.4813 12.4825C10.2188 12.745 9.89806 12.8763 9.51919 12.8763H2.48081ZM9.75 2.00127H2.25V11.5205C2.25 11.5878 2.27162 11.6431 2.31487 11.6864C2.35812 11.7296 2.41344 11.7513 2.48081 11.7513H9.51919C9.57694 11.7513 9.62981 11.7272 9.67781 11.6791C9.72594 11.6311 9.75 11.5782 9.75 11.5205V2.00127ZM4.053 10.2513H5.17781V3.50127H4.053V10.2513ZM6.82219 10.2513H7.947V3.50127H6.82219V10.2513Z" fill="#405660" />
                                                    </svg>
                                                </span>
                                                {/* <span>
                                                    <svg className="previewIcon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.35198 3.83689C5.29969 3.78465 5.2582 3.72261 5.22989 3.65432C5.20158 3.58604 5.18701 3.51284 5.18701 3.43892C5.18701 3.365 5.20158 3.2918 5.22989 3.22352C5.2582 3.15523 5.29969 3.09319 5.35198 3.04095L7.60198 0.79095C7.65423 0.738651 7.71626 0.697162 7.78455 0.668854C7.85284 0.640547 7.92603 0.625977 7.99995 0.625977C8.07387 0.625977 8.14707 0.640547 8.21536 0.668854C8.28364 0.697162 8.34568 0.738651 8.39792 0.79095L10.6479 3.04095C10.7535 3.1465 10.8128 3.28965 10.8128 3.43892C10.8128 3.58819 10.7535 3.73134 10.6479 3.83689C10.5424 3.94244 10.3992 4.00173 10.25 4.00173C10.1007 4.00173 9.95753 3.94244 9.85198 3.83689L8.56245 2.54665V6.25142C8.56245 6.4006 8.50319 6.54368 8.3977 6.64917C8.29221 6.75466 8.14914 6.81392 7.99995 6.81392C7.85077 6.81392 7.7077 6.75466 7.60221 6.64917C7.49672 6.54368 7.43745 6.4006 7.43745 6.25142V2.54665L6.14792 3.83689C6.09568 3.88919 6.03364 3.93068 5.96536 3.95898C5.89707 3.98729 5.82387 4.00186 5.74995 4.00186C5.67603 4.00186 5.60284 3.98729 5.53455 3.95898C5.46626 3.93068 5.40423 3.88919 5.35198 3.83689ZM9.85198 13.1659L8.56245 14.4562V10.7514C8.56245 10.6022 8.50319 10.4592 8.3977 10.3537C8.29221 10.2482 8.14914 10.1889 7.99995 10.1889C7.85077 10.1889 7.7077 10.2482 7.60221 10.3537C7.49672 10.4592 7.43745 10.6022 7.43745 10.7514V14.4562L6.14792 13.1659C6.04237 13.0604 5.89922 13.0011 5.74995 13.0011C5.60069 13.0011 5.45753 13.0604 5.35198 13.1659C5.24644 13.2715 5.18714 13.4146 5.18714 13.5639C5.18714 13.7132 5.24644 13.8563 5.35198 13.9619L7.60198 16.2119C7.65423 16.2642 7.71626 16.3057 7.78455 16.334C7.85284 16.3623 7.92603 16.3769 7.99995 16.3769C8.07387 16.3769 8.14707 16.3623 8.21536 16.334C8.28364 16.3057 8.34568 16.2642 8.39792 16.2119L10.6479 13.9619C10.7535 13.8563 10.8128 13.7132 10.8128 13.5639C10.8128 13.4146 10.7535 13.2715 10.6479 13.1659C10.5424 13.0604 10.3992 13.0011 10.25 13.0011C10.1007 13.0011 9.95753 13.0604 9.85198 13.1659ZM15.7104 8.10345L13.4604 5.85345C13.3549 5.7479 13.2117 5.68861 13.0625 5.68861C12.9132 5.68861 12.77 5.7479 12.6645 5.85345C12.5589 5.959 12.4996 6.10215 12.4996 6.25142C12.4996 6.40069 12.5589 6.54384 12.6645 6.64939L13.9547 7.93892H10.25C10.1008 7.93892 9.95769 7.99818 9.8522 8.10367C9.74672 8.20916 9.68745 8.35223 9.68745 8.50142C9.68745 8.6506 9.74672 8.79368 9.8522 8.89917C9.95769 9.00466 10.1008 9.06392 10.25 9.06392H13.9547L12.6645 10.3534C12.5589 10.459 12.4996 10.6021 12.4996 10.7514C12.4996 10.9007 12.5589 11.0438 12.6645 11.1494C12.77 11.2549 12.9132 11.3142 13.0625 11.3142C13.2117 11.3142 13.3549 11.2549 13.4604 11.1494L15.7104 8.89939C15.7627 8.84715 15.8042 8.78511 15.8325 8.71682C15.8608 8.64854 15.8754 8.57534 15.8754 8.50142C15.8754 8.4275 15.8608 8.3543 15.8325 8.28601C15.8042 8.21773 15.7627 8.15569 15.7104 8.10345ZM2.04519 9.06392H5.74995C5.89914 9.06392 6.04221 9.00466 6.1477 8.89917C6.25319 8.79368 6.31245 8.6506 6.31245 8.50142C6.31245 8.35223 6.25319 8.20916 6.1477 8.10367C6.04221 7.99818 5.89914 7.93892 5.74995 7.93892H2.04519L3.33542 6.64939C3.44097 6.54384 3.50027 6.40069 3.50027 6.25142C3.50027 6.10215 3.44097 5.959 3.33542 5.85345C3.22987 5.7479 3.08672 5.68861 2.93745 5.68861C2.78819 5.68861 2.64503 5.7479 2.53949 5.85345L0.289485 8.10345C0.237186 8.15569 0.195697 8.21773 0.167389 8.28601C0.139082 8.3543 0.124512 8.4275 0.124512 8.50142C0.124512 8.57534 0.139082 8.64854 0.167389 8.71682C0.195697 8.78511 0.237186 8.84715 0.289485 8.89939L2.53949 11.1494C2.64503 11.2549 2.78819 11.3142 2.93745 11.3142C3.08672 11.3142 3.22987 11.2549 3.33542 11.1494C3.44097 11.0438 3.50027 10.9007 3.50027 10.7514C3.50027 10.6021 3.44097 10.459 3.33542 10.3534L2.04519 9.06392Z"
                                                            fill="#405660"
                                                        />
                                                    </svg>
                                                </span> */}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <p>No flyers available</p>
                            )}
                        </tbody>
                    </table>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content viewIconListing">
                                <span className="close" onClick={handleClosePopup}>
                                    {/* &times; */}
                                </span>
                                <LazyImage classes="prev-img" src={popimage} alt="alt" />
                            </div>
                            <div className="popup-overlay" onClick={handleClosePopup} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    return <div className="salesFlyerListing">{view === "grid" ? listView() : tableView()}</div>;
};

export default Card;

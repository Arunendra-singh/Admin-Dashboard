/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useGetAllCollection } from "common/components/graphQL/queries/Collection/useGetAllCollection";
import { useDeleteCollection } from "common/components/graphQL/mutations/Collection/useDeleteCollection";
import { ClearCache, ClearCacheFeature, ClearCacheGlobalsetting, ClearCategoryCache } from "common/components/graphQL/queries/Js/CacheManager";
// import { useGetclearCacheByKey } from "common/components/graphQL/queries/Collection/useGetclearCacheByKey";
import { PopupV3 } from "common/utils";
import Table from "~/components/common/Table/Table";
import Store from "~/Store";

const Collection = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [querydata, setQuerydata] = useState(null);
    const [Jsondata, setJsondata] = useState(null);
    const [pagePerRecord] = useState(1000);
    const [selectedSortOption, setSelectedSortOption] = useState("Collection Type");
    const [CollectionRemove] = useMutation(useDeleteCollection);
    const [resources] = Store.useStore((store) => store?.resources);
    const [search, setSearch] = useState("");
    const [isExpandednew, setisExpandednew] = useState("");
    const [filters] = useState({
        skip: 1,
        take: pagePerRecord,
        where: null,
        order: null
    });

    const { data: queryData, refetch, loading } = useQuery(useGetAllCollection, { variables: filters });
    // const { refetch: refetch1 } = useQuery(useGetclearCacheByKey, { variables: { key: "" } });

    useEffect(() => {
        ClearCache();
        ClearCacheFeature();
        ClearCacheGlobalsetting();
        if (filters) {
            refetch(filters);
        }
    }, [filters, refetch]);

    useEffect(() => {
        if (queryData) {
            setQuerydata(queryData);
            setJsondata(queryData);
        }
    }, [queryData]);

    const Collectiondata = () => {
        const alldata = querydata?.allCollection?.items;
        setData(alldata);
    };
    useEffect(() => {
        if (querydata && querydata?.allCollection?.items !== undefined) {
            Collectiondata();
        }
    }, [querydata]);
    const handletype = (type) => {
        setSelectedSortOption(type);
        const typedata = Jsondata?.allCollection;
        if (type !== "Collection Type") {
            const filtertype = typedata?.items.filter((item) => item?.collectionType?.toLowerCase().includes(type?.toLowerCase()));
            setQuerydata(filtertype);
            setData(filtertype);
        } else {
            const sorting = Jsondata?.allCollection?.items;
            setData(sorting);
        }
    };
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        const vm = querydata?.allCollection;
        setSearch(searchValue);
        if (searchValue.trim() !== "") {
            const datatype = vm?.items !== undefined ? vm?.items : querydata;
            const filteredItems = datatype
                .filter((item) => {
                    const searchLower = searchValue?.toLowerCase(); // Cache the lowercase search value for reuse

                    const itemMatches = item?.collectionName?.toLowerCase().includes(searchLower);
                    const subCategoriesMatch = item?.subCategories?.some((sub) =>
                        sub?.collectionName?.toLowerCase().includes(searchLower));
                    const subCategoriesMatchAll = item?.subCategories?.some((sub) =>
                        sub?.subCategories?.some((itemsub) =>
                            itemsub?.collectionName?.toLowerCase()?.includes(searchLower)));

                    return itemMatches || subCategoriesMatch || subCategoriesMatchAll;
                })
                .map((item) => {
                // Filter out only matching subcategories
                    const searchLower = searchValue?.toLowerCase(); // Reuse cached value
                    const matchingSubCategories = item?.subCategories?.filter((sub) =>
                        sub?.collectionName?.toLowerCase()?.includes(searchLower));
                    // const subCategoriesMatchAll = item?.subCategories?.some((sub) =>
                    //     sub?.subCategories?.some((itemsub) =>
                    //         itemsub?.collectionName?.toLowerCase().includes(searchLower)));

                    return {
                        ...item,
                        subCategories: matchingSubCategories?.length > 0 ? matchingSubCategories : item?.subCategories,
                    };
                });

            if (searchValue.trim() !== "") {
                setisExpandednew("earch");
            } else {
                setisExpandednew("");
            }
            setData(filteredItems);
        } else if (selectedSortOption === "Collection Type") {
            setQuerydata(Jsondata);
            Collectiondata();
            setisExpandednew("");
        } else {
            handletype(selectedSortOption);
            setisExpandednew("");
        }
    };
    // const handleExportClick = () => {
    //     window.location.href = exportLink;
    // };
    const handleAddCollection = () => {
        navigate("/v2/Collection/Create");
    };

    const clearSearch = () => {
        setSearch("");
        if (selectedSortOption === "Collection Type") {
            setQuerydata(Jsondata);
            Collectiondata();
        } else {
            handletype(selectedSortOption);
        }
        setisExpandednew("");
    };
    const HandleCacheClear = async () => {
        try {
            const response = await ClearCategoryCache();

            if (response !== null) {
                PopupV3({
                    content: resources["Category.PmsgCacheSuccess"],
                    type: "Success",
                    title: "Success",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {
                                refetch(filters);
                            }
                        }
                    ]
                });
            } else {
                // Handle other status codes if needed
                console.error("Failed to clear cache:", response);
            }
        } catch (error) {
            console.error("An error occurred while clearing the cache:", error);
        }
    };

    const RemoveCollection = (guid) => {
        CollectionRemove({
            variables: {
                collectionguid: guid
            }
        }).then((res) => {
            if (res?.data?.deleteCollection?.statuscode === 200) {
                PopupV3({
                    content: resources["Category.PmsgDelSuccess"],
                    type: "Success",
                    title: "Success",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: async () => {
                                clearSearch();
                                const response = await ClearCategoryCache();
                                if (response !== null) {
                                    refetch(filters);
                                }
                            }
                        }
                    ]
                });
            } else {
                PopupV3({
                    content: resources["Category.PmsgDelRestrict"],
                    type: "Warning",
                    title: "Warning",
                    actions: [
                        {
                            text: "Ok",
                            classes: "ok",
                            dismiss: true,
                            do: () => {}
                        }
                    ]
                });
            }
        });
    };
    const CollectionDelete = (ItemRemove) => {
        PopupV3({
            content: `${resources["Category.Delete"]} ${ItemRemove.collectionType} ${ItemRemove.collectionName}?`,
            type: "Confirm", // Assuming you have different types like 'warning', 'info', etc.
            title: `${resources["Category.Delete"]} ${ItemRemove.collectionType} ${ItemRemove.collectionName}?`,
            actions: [
                {
                    dismiss: true,
                    text: "Yes",
                    do: () => {
                        RemoveCollection(ItemRemove.collectionGuid);
                    }
                },
                {
                    text: "No",
                    dismiss: true
                }
            ]
        });
    };
    const HandleExportExsting = () => {
        window.location.href = "/Product/ImportExportCategory";
    };

    return (
        <section className="midContent">
            <div className="content-container salesCard collectionCont container-fluid" id="jumbo-header">
                <div className="search-bar">
                    <div className="search-bar-controls">
                        <div className="select-wrapper">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sortby-dropdown-toggle clsCollcetionListing_CollectionType">
                                    {selectedSortOption || "Collection Type"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handletype("Collection Type")}>Collection Type</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handletype("Section")}>Section</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handletype("Featured icon")}>Featured icon</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handletype("Category")}>Category</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handletype("Supplier")}>Supplier</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handletype("Brand")}>Brand</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="header-second">
                            <div className="input-wrapper mr-3 clsSales_SearchNew">
                                <svg className="search" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.587 15.9628L12.585 12.0518C13.7449 10.6907 14.3234 8.9448 14.1999 7.17741C14.0764 5.41002 13.2606 3.75719 11.9222 2.56275C10.5838 1.36831 8.82572 0.724224 7.0138 0.764474C5.20189 0.804724 3.4756 1.52621 2.19405 2.77886C0.912501 4.0315 0.174362 5.71885 0.133183 7.48989C0.0920041 9.26093 0.750957 10.9793 1.97296 12.2876C3.19497 13.5958 4.88594 14.3932 6.69411 14.5139C8.50229 14.6346 10.2884 14.0692 11.681 12.9354L15.6822 16.8472C15.7416 16.9052 15.8122 16.9513 15.8898 16.9827C15.9674 17.0141 16.0506 17.0303 16.1346 17.0303C16.2186 17.0303 16.3018 17.0141 16.3794 16.9827C16.4571 16.9513 16.5276 16.9052 16.587 16.8472C16.6464 16.7891 16.6935 16.7201 16.7257 16.6443C16.7578 16.5684 16.7744 16.4871 16.7744 16.405C16.7744 16.3228 16.7578 16.2415 16.7257 16.1657C16.6935 16.0898 16.6464 16.0208 16.587 15.9628ZM1.42788 7.65496C1.42788 6.54244 1.76539 5.45491 2.39774 4.52988C3.03008 3.60485 3.92886 2.88388 4.98041 2.45814C6.03197 2.0324 7.18907 1.921 8.30539 2.13805C9.42171 2.35509 10.4471 2.89082 11.2519 3.67749C12.0568 4.46416 12.6049 5.46644 12.8269 6.55758C13.049 7.64872 12.935 8.77972 12.4994 9.80756C12.0639 10.8354 11.3263 11.7139 10.3799 12.332C9.43351 12.9501 8.32088 13.28 7.18268 13.28C5.65693 13.2783 4.19416 12.6851 3.11529 11.6306C2.03642 10.5761 1.42957 9.1463 1.42788 7.65496Z"
                                        fill="#334F5B"
                                    />
                                </svg>
                                <input type="search" aria-label="Search" className="clear-button clsCollcetionListing_Search" onChange={handleSearch} value={search} placeholder="Search by category, section, supplier, feature, etc.." />
                                {search && (
                                    // eslint-disable-next-line react/button-has-type
                                    <button onClick={clearSearch} className="clear-button">
                                        &times; {/* Clear icon (×) */}
                                    </button>
                                )}
                            </div>
                            <span onClick={HandleExportExsting} className="exportbutton clsCollcetionListing_ExportButton mr-2" style={{ cursor: "pointer" }}>
                                <svg width="105" height="37" viewBox="0 0 105 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="1.44482" width="104" height="35" rx="5.5" fill="white" />
                                    <rect x="0.5" y="1.44482" width="104" height="35" rx="5.5" stroke="#00A7E3" />
                                    <mask id="mask0_4192_8111" maskUnits="userSpaceOnUse" x="16" y="8" width="20" height="21">
                                        <rect x="16" y="8.94482" width="20" height="20" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_4192_8111)">
                                        <path d="M25.1667 22.2782V15.4865L23 17.6532L21.8334 16.4449L26 12.2782L30.1667 16.4449L29 17.6532L26.8334 15.4865V22.2782H25.1667ZM21 25.6115C20.5417 25.6115 20.1493 25.4483 19.823 25.1219C19.4966 24.7956 19.3334 24.4032 19.3334 23.9449V21.4449H21V23.9449H31V21.4449H32.6667V23.9449C32.6667 24.4032 32.5035 24.7956 32.1771 25.1219C31.8507 25.4483 31.4584 25.6115 31 25.6115H21Z" fill="#00A7E3" />
                                    </g>
                                    <path
                                        d="M45.106 23.9448V14.0048H51.294V15.9368H47.136V17.9808H50.454V19.9128H47.136V22.0128H51.294V23.9448H45.106ZM57.557 23.9448L55.933 21.8868L54.309 23.9448H51.999L54.715 20.5148L52.069 16.9448H54.337L55.919 19.0868L57.501 16.9448H59.783L57.137 20.5148L59.853 23.9448H57.557ZM62.7424 26.8708H60.8244V16.9448H62.7424V17.7288C62.9197 17.4768 63.1904 17.2575 63.5544 17.0708C63.9184 16.8842 64.3244 16.7908 64.7724 16.7908C65.6964 16.7908 66.4757 17.1502 67.1104 17.8688C67.7451 18.5875 68.0624 19.4462 68.0624 20.4448C68.0624 21.4435 67.7451 22.3022 67.1104 23.0208C66.4757 23.7395 65.6964 24.0988 64.7724 24.0988C64.3244 24.0988 63.9184 24.0055 63.5544 23.8188C63.1904 23.6322 62.9197 23.4128 62.7424 23.1608V26.8708ZM63.0644 21.8168C63.3911 22.1715 63.8204 22.3488 64.3524 22.3488C64.8844 22.3488 65.3091 22.1715 65.6264 21.8168C65.9531 21.4622 66.1164 21.0048 66.1164 20.4448C66.1164 19.8848 65.9531 19.4275 65.6264 19.0728C65.3091 18.7182 64.8844 18.5408 64.3524 18.5408C63.8204 18.5408 63.3911 18.7182 63.0644 19.0728C62.7471 19.4275 62.5884 19.8848 62.5884 20.4448C62.5884 21.0048 62.7471 21.4622 63.0644 21.8168ZM75.289 23.0488C74.5703 23.7488 73.7023 24.0988 72.685 24.0988C71.6677 24.0988 70.7997 23.7488 70.081 23.0488C69.3623 22.3395 69.003 21.4715 69.003 20.4448C69.003 19.4275 69.3623 18.5642 70.081 17.8548C70.7997 17.1455 71.6677 16.7908 72.685 16.7908C73.7023 16.7908 74.5703 17.1455 75.289 17.8548C76.0077 18.5642 76.367 19.4275 76.367 20.4448C76.367 21.4715 76.0077 22.3395 75.289 23.0488ZM72.685 22.3068C73.1797 22.3068 73.5903 22.1342 73.917 21.7888C74.253 21.4342 74.421 20.9862 74.421 20.4448C74.421 19.9035 74.253 19.4602 73.917 19.1148C73.5903 18.7602 73.1797 18.5828 72.685 18.5828C72.181 18.5828 71.761 18.7602 71.425 19.1148C71.0983 19.4602 70.935 19.9035 70.935 20.4448C70.935 20.9862 71.0983 21.4342 71.425 21.7888C71.761 22.1342 72.181 22.3068 72.685 22.3068ZM77.7502 23.9448V16.9448H79.6682V18.0648C79.7895 17.7195 80.0088 17.4348 80.3262 17.2108C80.6528 16.9775 81.0122 16.8608 81.4042 16.8608C81.6468 16.8608 81.8615 16.8888 82.0482 16.9448V18.8908C81.7402 18.7882 81.4508 18.7368 81.1802 18.7368C80.7228 18.7368 80.3542 18.9048 80.0742 19.2408C79.8035 19.5675 79.6682 20.0202 79.6682 20.5988V23.9448H77.7502ZM86.6616 24.0288C85.8776 24.0288 85.2336 23.8142 84.7296 23.3848C84.2349 22.9462 83.9876 22.3162 83.9876 21.4948V18.6248H82.5736V16.9448H83.9876V14.9988H85.9056V16.9448H87.8796V18.6248H85.9056V21.1168C85.9056 21.5462 85.9989 21.8542 86.1856 22.0408C86.3723 22.2182 86.6756 22.3068 87.0956 22.3068C87.3943 22.3068 87.6556 22.2648 87.8796 22.1808V23.8748C87.5436 23.9775 87.1376 24.0288 86.6616 24.0288Z"
                                        fill="#00A7E3"
                                    />
                                </svg>
                            </span>
                            <span onClick={HandleCacheClear} className="cacheclear clsCollcetionListing_ClearCacheButton mr-2" style={{ cursor: "pointer" }}>
                                <svg width="138" height="37" viewBox="0 0 138 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1.30969" y="1.44482" width="136" height="35" rx="5.5" fill="white" />
                                    <rect x="1.30969" y="1.44482" width="136" height="35" rx="5.5" stroke="#CCD3D6" />
                                    <path
                                        d="M20.5962 24.1128C19.1682 24.1128 17.9549 23.6182 16.9562 22.6288C15.9576 21.6302 15.4582 20.4122 15.4582 18.9748C15.4582 17.5375 15.9576 16.3242 16.9562 15.3348C17.9549 14.3362 19.1682 13.8368 20.5962 13.8368C21.5576 13.8368 22.4302 14.0655 23.2142 14.5228C23.9982 14.9708 24.6189 15.5822 25.0762 16.3568L23.6622 17.1688C22.9436 16.0022 21.9216 15.4188 20.5962 15.4188C19.6162 15.4188 18.7902 15.7642 18.1182 16.4548C17.4462 17.1455 17.1102 17.9855 17.1102 18.9748C17.1102 19.9642 17.4462 20.8042 18.1182 21.4948C18.7902 22.1855 19.6162 22.5308 20.5962 22.5308C21.9216 22.5308 22.9436 21.9475 23.6622 20.7808L25.0762 21.5928C24.6189 22.3675 23.9982 22.9835 23.2142 23.4408C22.4302 23.8888 21.5576 24.1128 20.5962 24.1128ZM26.4609 23.9448V13.4448H28.0009V23.9448H26.4609ZM33.2343 24.0848C32.1703 24.0848 31.293 23.7442 30.6023 23.0628C29.921 22.3815 29.5803 21.5088 29.5803 20.4448C29.5803 19.4088 29.9256 18.5455 30.6163 17.8548C31.307 17.1548 32.1796 16.8048 33.2343 16.8048C34.205 16.8048 35.0076 17.1128 35.6423 17.7288C36.2863 18.3448 36.6083 19.1942 36.6083 20.2768C36.6083 20.4635 36.6036 20.6315 36.5943 20.7808H31.0923C31.1296 21.3502 31.349 21.8122 31.7503 22.1668C32.1516 22.5122 32.651 22.6848 33.2483 22.6848C34.1443 22.6848 34.8116 22.3302 35.2503 21.6208L36.4263 22.4608C35.7543 23.5435 34.6903 24.0848 33.2343 24.0848ZM31.1623 19.6608H35.0543C34.9703 19.1755 34.751 18.7975 34.3963 18.5268C34.051 18.2468 33.645 18.1068 33.1783 18.1068C32.693 18.1068 32.259 18.2422 31.8763 18.5128C31.503 18.7835 31.265 19.1662 31.1623 19.6608ZM41.0614 24.0848C40.1094 24.0848 39.3067 23.7302 38.6534 23.0208C38.0094 22.3115 37.6874 21.4528 37.6874 20.4448C37.6874 19.4368 38.0094 18.5782 38.6534 17.8688C39.3067 17.1595 40.1094 16.8048 41.0614 16.8048C41.5374 16.8048 41.9761 16.9122 42.3774 17.1268C42.7787 17.3322 43.0867 17.5842 43.3014 17.8828V16.9448H44.8414V23.9448H43.3014V23.0068C43.0867 23.3055 42.7787 23.5622 42.3774 23.7768C41.9761 23.9822 41.5374 24.0848 41.0614 24.0848ZM39.8434 22.0408C40.2354 22.4702 40.7347 22.6848 41.3414 22.6848C41.9481 22.6848 42.4474 22.4702 42.8394 22.0408C43.2314 21.6115 43.4274 21.0795 43.4274 20.4448C43.4274 19.8102 43.2314 19.2782 42.8394 18.8488C42.4474 18.4195 41.9481 18.2048 41.3414 18.2048C40.7347 18.2048 40.2354 18.4195 39.8434 18.8488C39.4514 19.2782 39.2554 19.8102 39.2554 20.4448C39.2554 21.0795 39.4514 21.6115 39.8434 22.0408ZM46.9277 23.9448V16.9448H48.4677V18.1908C48.5984 17.7988 48.8364 17.4815 49.1817 17.2388C49.5364 16.9962 49.9144 16.8748 50.3157 16.8748C50.5584 16.8748 50.7591 16.8935 50.9177 16.9308V18.5128C50.6937 18.4288 50.4371 18.3868 50.1477 18.3868C49.6811 18.3868 49.2844 18.5782 48.9577 18.9608C48.6311 19.3342 48.4677 19.8568 48.4677 20.5288V23.9448H46.9277ZM59.8892 24.1128C58.4612 24.1128 57.2479 23.6182 56.2492 22.6288C55.2505 21.6302 54.7512 20.4122 54.7512 18.9748C54.7512 17.5375 55.2505 16.3242 56.2492 15.3348C57.2479 14.3362 58.4612 13.8368 59.8892 13.8368C60.8505 13.8368 61.7232 14.0655 62.5072 14.5228C63.2912 14.9708 63.9119 15.5822 64.3692 16.3568L62.9552 17.1688C62.2365 16.0022 61.2145 15.4188 59.8892 15.4188C58.9092 15.4188 58.0832 15.7642 57.4112 16.4548C56.7392 17.1455 56.4032 17.9855 56.4032 18.9748C56.4032 19.9642 56.7392 20.8042 57.4112 21.4948C58.0832 22.1855 58.9092 22.5308 59.8892 22.5308C61.2145 22.5308 62.2365 21.9475 62.9552 20.7808L64.3692 21.5928C63.9119 22.3675 63.2912 22.9835 62.5072 23.4408C61.7232 23.8888 60.8505 24.1128 59.8892 24.1128ZM68.6239 24.0848C67.6719 24.0848 66.8692 23.7302 66.2159 23.0208C65.5719 22.3115 65.2499 21.4528 65.2499 20.4448C65.2499 19.4368 65.5719 18.5782 66.2159 17.8688C66.8692 17.1595 67.6719 16.8048 68.6239 16.8048C69.0999 16.8048 69.5386 16.9122 69.9399 17.1268C70.3412 17.3322 70.6492 17.5842 70.8639 17.8828V16.9448H72.4039V23.9448H70.8639V23.0068C70.6492 23.3055 70.3412 23.5622 69.9399 23.7768C69.5386 23.9822 69.0999 24.0848 68.6239 24.0848ZM67.4059 22.0408C67.7979 22.4702 68.2972 22.6848 68.9039 22.6848C69.5106 22.6848 70.0099 22.4702 70.4019 22.0408C70.7939 21.6115 70.9899 21.0795 70.9899 20.4448C70.9899 19.8102 70.7939 19.2782 70.4019 18.8488C70.0099 18.4195 69.5106 18.2048 68.9039 18.2048C68.2972 18.2048 67.7979 18.4195 67.4059 18.8488C67.0139 19.2782 66.8179 19.8102 66.8179 20.4448C66.8179 21.0795 67.0139 21.6115 67.4059 22.0408ZM77.6822 24.0848C76.6276 24.0848 75.7456 23.7395 75.0362 23.0488C74.3362 22.3488 73.9862 21.4808 73.9862 20.4448C73.9862 19.4088 74.3362 18.5455 75.0362 17.8548C75.7456 17.1548 76.6276 16.8048 77.6822 16.8048C78.4009 16.8048 79.0449 16.9775 79.6142 17.3228C80.1929 17.6682 80.6362 18.1395 80.9442 18.7368L79.6002 19.4648C79.4229 19.0915 79.1662 18.7928 78.8302 18.5688C78.4942 18.3448 78.1116 18.2328 77.6822 18.2328C77.0662 18.2328 76.5576 18.4475 76.1562 18.8768C75.7549 19.2968 75.5542 19.8195 75.5542 20.4448C75.5542 21.0702 75.7549 21.5975 76.1562 22.0268C76.5576 22.4468 77.0662 22.6568 77.6822 22.6568C78.1116 22.6568 78.4942 22.5448 78.8302 22.3208C79.1662 22.0968 79.4229 21.7982 79.6002 21.4248L80.9442 22.1528C80.6362 22.7502 80.1929 23.2215 79.6142 23.5668C79.0449 23.9122 78.4009 24.0848 77.6822 24.0848ZM83.8916 23.9448H82.3516V13.4448H83.8916V17.8968C84.3302 17.1688 85.0396 16.8048 86.0196 16.8048C86.8316 16.8048 87.4802 17.0708 87.9656 17.6028C88.4509 18.1348 88.6936 18.8442 88.6936 19.7308V23.9448H87.1536V19.9828C87.1536 19.4228 87.0229 18.9888 86.7616 18.6808C86.5002 18.3635 86.1456 18.2048 85.6976 18.2048C85.1656 18.2048 84.7316 18.4055 84.3956 18.8068C84.0596 19.2082 83.8916 19.7728 83.8916 20.5008V23.9448ZM93.8281 24.0848C92.7641 24.0848 91.8867 23.7442 91.1961 23.0628C90.5147 22.3815 90.1741 21.5088 90.1741 20.4448C90.1741 19.4088 90.5194 18.5455 91.2101 17.8548C91.9007 17.1548 92.7734 16.8048 93.8281 16.8048C94.7987 16.8048 95.6014 17.1128 96.2361 17.7288C96.8801 18.3448 97.2021 19.1942 97.2021 20.2768C97.2021 20.4635 97.1974 20.6315 97.1881 20.7808H91.6861C91.7234 21.3502 91.9427 21.8122 92.3441 22.1668C92.7454 22.5122 93.2447 22.6848 93.8421 22.6848C94.7381 22.6848 95.4054 22.3302 95.8441 21.6208L97.0201 22.4608C96.3481 23.5435 95.2841 24.0848 93.8281 24.0848ZM91.7561 19.6608H95.6481C95.5641 19.1755 95.3447 18.7975 94.9901 18.5268C94.6447 18.2468 94.2387 18.1068 93.7721 18.1068C93.2867 18.1068 92.8527 18.2422 92.4701 18.5128C92.0967 18.7835 91.8587 19.1662 91.7561 19.6608Z"
                                        fill="#667B84"
                                    />
                                    <mask id="mask0_1890_2672" maskUnits="userSpaceOnUse" x="105" y="9" width="19" height="19">
                                        <rect x="105.81" y="9.94482" width="18" height="18" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_1890_2672)">
                                        <path
                                            d="M113.944 18.3823H115.675V13.017C115.675 12.7756 115.591 12.5711 115.423 12.4033C115.256 12.2354 115.051 12.1515 114.81 12.1515C114.568 12.1515 114.364 12.2354 114.196 12.4033C114.028 12.5711 113.944 12.7756 113.944 13.017V18.3823ZM109.516 21.2381H120.103V19.7381C120.103 19.6707 120.081 19.6154 120.038 19.5722C119.995 19.5289 119.94 19.5073 119.872 19.5073H109.747C109.68 19.5073 109.625 19.5289 109.581 19.5722C109.538 19.6154 109.516 19.6707 109.516 19.7381V21.2381ZM108.674 25.7381H110.569V24.0506C110.569 23.8912 110.623 23.7576 110.731 23.6497C110.839 23.542 110.973 23.4881 111.132 23.4881C111.292 23.4881 111.425 23.542 111.533 23.6497C111.641 23.7576 111.694 23.8912 111.694 24.0506V25.7381H114.247V24.0506C114.247 23.8912 114.301 23.7576 114.409 23.6497C114.517 23.542 114.651 23.4881 114.81 23.4881C114.969 23.4881 115.103 23.542 115.211 23.6497C115.318 23.7576 115.372 23.8912 115.372 24.0506V25.7381H117.925V24.0506C117.925 23.8912 117.979 23.7576 118.087 23.6497C118.195 23.542 118.328 23.4881 118.488 23.4881C118.647 23.4881 118.781 23.542 118.889 23.6497C118.996 23.7576 119.05 23.8912 119.05 24.0506V25.7381H120.945C121.022 25.7381 121.085 25.7081 121.133 25.6479C121.181 25.5878 121.193 25.5217 121.169 25.4496L120.332 22.3631H109.287L108.451 25.4496C108.427 25.5217 108.439 25.5878 108.487 25.6479C108.535 25.7081 108.597 25.7381 108.674 25.7381ZM121.003 26.8631H108.616C108.191 26.8631 107.846 26.6934 107.58 26.3539C107.313 26.0145 107.238 25.6361 107.353 25.2187L108.391 21.3607V19.6948C108.391 19.3304 108.519 19.0206 108.775 18.7652C109.03 18.5099 109.34 18.3823 109.704 18.3823H112.819V13.017C112.819 12.4641 113.013 11.9941 113.4 11.607C113.787 11.22 114.257 11.0265 114.81 11.0265C115.363 11.0265 115.833 11.22 116.22 11.607C116.607 11.9941 116.8 12.4641 116.8 13.017V18.3823H119.916C120.28 18.3823 120.59 18.5099 120.845 18.7652C121.1 19.0206 121.228 19.3304 121.228 19.6948V21.3607L122.266 25.2332C122.405 25.6457 122.339 26.0205 122.069 26.3576C121.799 26.6946 121.443 26.8631 121.003 26.8631Z"
                                            fill="#697C85"
                                        />
                                    </g>
                                </svg>
                            </span>
                            <button className="btn btn_create clsCollcetionListing_CreateButton" type="button" onClick={handleAddCollection}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 6.65625H0.75V5.15625H5.25V0.65625H6.75V5.15625H11.25V6.65625H6.75V11.1562H5.25V6.65625Z" fill="white" />
                                </svg>
                                &nbsp; Add Collection
                            </button>
                        </div>
                    </div>
                    <Table data={data} CollectionDelete={CollectionDelete} loading={loading} handleAddCollection={handleAddCollection} isExpandednew={isExpandednew} HandleCacheClear={HandleCacheClear} />
                </div>
            </div>
        </section>
    );
};

export default Collection;

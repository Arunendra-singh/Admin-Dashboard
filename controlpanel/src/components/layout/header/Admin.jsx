/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useEffect, useRef } from "react";
import HeaderLogo from "./logo";

const AdminMenu = ({ openSubMenu }) => {
    const adminMenu = window?.fepermission?.AdminMenu;
    const [setActiveLink] = useState(0);
    const [setOpenSubMenu] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const sidebarRef = useRef(null);

    const permissions = window?.fepermission?.PermissionDetailGuids;
    const websiteurl = window?.fepermission?.WebsiteURL;
    const [menuisOn, setMenuIsOn] = useState(true);

    useEffect(() => {
        if (menuisOn) {
            document.body.classList.add("sidebar-mini");
        } else {
            document.body.classList.remove("sidebar-mini");
        }
    }, [menuisOn]);

    const toggleMyMenu = useCallback(() => {
        setMenuIsOn((prevMenuIsOn) => !prevMenuIsOn);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenuIsOn(true);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!openSubMenu) {
            setOpenSubmenu(null);
        } else {
            setOpenSubmenu(openSubMenu);
        }
    }, [menuisOn, openSubMenu, setOpenSubmenu]);

    const handleToggleSubmenu = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
        setMenuIsOn(false);
    };

    const handleLinkClick = () => {
        setMenuIsOn(true);
    };

    return (
        <aside className="left-sidebar" ref={sidebarRef}>
            <HeaderLogo setActiveLink={setActiveLink} setOpenSubMenu={setOpenSubMenu} menuisOn={menuisOn} setMenuIsOn={setMenuIsOn} />
            <div className={`menu-container sidebarMenu ${!menuisOn ? "active" : ""}`} onClick={toggleMyMenu}>
                <div className="res_monu_link">
                    <div className="iconsBox">
                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-18wq8ra" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2" d="M3.4375 6.31055V17.3105H18.5625V8.37305L16.5 6.31055H3.4375Z" fill="#00A7E3"></path>
                            <path
                                d="M2.75001 11.8109C2.75001 11.9933 2.82244 12.1681 2.95137 12.2971C3.08031 12.426 3.25517 12.4984 3.43751 12.4984H12.375C12.5573 12.4984 12.7322 12.426 12.8611 12.2971C12.9901 12.1681 13.0625 11.9933 13.0625 11.8109C13.0625 11.6286 12.9901 11.4537 12.8611 11.3248C12.7322 11.1959 12.5573 11.1234 12.375 11.1234H3.43751C3.25517 11.1234 3.08031 11.1959 2.95137 11.3248C2.82244 11.4537 2.75001 11.6286 2.75001 11.8109ZM12.375 6.99843H3.43751C3.25517 6.99843 3.08031 6.926 2.95137 6.79706C2.82244 6.66813 2.75001 6.49327 2.75001 6.31093C2.75001 6.12859 2.82244 5.95372 2.95137 5.82479C3.08031 5.69586 3.25517 5.62343 3.43751 5.62343H12.375C12.5573 5.62343 12.7322 5.69586 12.8611 5.82479C12.9901 5.95372 13.0625 6.12859 13.0625 6.31093C13.0625 6.49327 12.9901 6.66813 12.8611 6.79706C12.7322 6.926 12.5573 6.99843 12.375 6.99843ZM3.43751 16.6234H18.5625C18.7448 16.6234 18.9197 16.6959 19.0486 16.8248C19.1776 16.9537 19.25 17.1286 19.25 17.3109C19.25 17.4933 19.1776 17.6681 19.0486 17.7971C18.9197 17.926 18.7448 17.9984 18.5625 17.9984H3.43751C3.25517 17.9984 3.08031 17.926 2.95137 17.7971C2.82244 17.6681 2.75001 17.4933 2.75001 17.3109C2.75001 17.1286 2.82244 16.9537 2.95137 16.8248C3.08031 16.6959 3.25517 16.6234 3.43751 16.6234ZM15.8125 13.1859C15.6765 13.186 15.5434 13.1458 15.4303 13.0702C15.3171 12.9947 15.2289 12.8873 15.1768 12.7616C15.1248 12.6359 15.1111 12.4976 15.1377 12.3642C15.1643 12.2307 15.2298 12.1082 15.3261 12.012L18.2781 9.06093L15.3261 6.10984C15.1971 5.98083 15.1246 5.80587 15.1246 5.62343C15.1246 5.44099 15.1971 5.26603 15.3261 5.13702C15.4551 5.00802 15.6301 4.93555 15.8125 4.93555C15.9949 4.93555 16.1699 5.00802 16.2989 5.13702L19.7364 8.57452C19.8003 8.63837 19.851 8.7142 19.8856 8.79766C19.9202 8.88112 19.938 8.97058 19.938 9.06093C19.938 9.15128 19.9202 9.24074 19.8856 9.3242C19.851 9.40766 19.8003 9.48349 19.7364 9.54734L16.2989 12.9848C16.235 13.0487 16.1592 13.0993 16.0757 13.1338C15.9923 13.1683 15.9028 13.186 15.8125 13.1859Z"
                                fill="#2E3B41"
                            >
                            </path>
                        </svg>
                    </div>
                    <span className="hide-menu">Menu</span>
                </div>
            </div>
            <nav className="Main-menubar">
                <div className="categorymenu" id="smoothmenu2">
                    <ul id="tiles1" className="adminLayoutMenu">
                        {adminMenu?.map((item) => {
                            if (!item.ParentMenuGuid) {
                                const childMenus = adminMenu.filter((items) => items.ParentMenuGuid === item.MenuGuid).sort((a, b) => a.MenuName.localeCompare(b.MenuName));
                                if (childMenus.length > 0) {
                                    const childPermissionsCount = permissions.filter((permission) => childMenus.some((childMenu) => childMenu.ControllerName?.toLowerCase() === permission.ControllerName?.toLowerCase() && childMenu.ActionName?.toLowerCase() === permission.ActionName?.toLowerCase())).length;
                                    if (childPermissionsCount > 0) {
                                        const className = item.MenuName?.toLowerCase().replace(" ", "-");

                                        return (
                                            <li key={item.MenuGuid} className="menu-item" style={{ order: `${item.Sequence}` }}>
                                                <div className={`sidebar-link hasmenu ${openSubmenu === `${item.MenuName}` ? "active" : ""}`} onClick={() => handleToggleSubmenu(item.MenuName)}>
                                                    <div className="iconsBox">
                                                        <i className={`simple-line-icon ${className}`}></i>
                                                        <span className="hide-menu">{item.MenuName}</span>
                                                        <i className="icon-chevron_right arrow"></i>
                                                    </div>
                                                </div>
                                                {openSubmenu === item.MenuName && (
                                                    <ul className="submenu">
                                                        <li onClick={handleLinkClick}>
                                                            <div className="sidebar-link submenu-item-header">{item.MenuName}</div>
                                                        </li>
                                                        {childMenus.map((child) => {
                                                            const lstPermission1 = permissions.filter((permission) => permission.ControllerName.toLowerCase() === child.ControllerName.toLowerCase() && permission.ActionName.toLowerCase() === child.ActionName.toLowerCase() && !permission.AliasName.toLowerCase().includes("mcp"));
                                                            if (lstPermission1.length > 0) {
                                                                return (
                                                                    <li key={child.MenuGuid}>
                                                                        {child.MenuName === "Sales Flyer" || child.MenuName === "Sales Flyer Report" || child.MenuName === "Add Collection" || child.MenuName === "View Collections" || child.MenuName === "Order Catalog Report" || child.MenuName === "Order Sample Report" || child.MenuName === "Request Quote Report" || child.MenuName === "Newsletter Report" || child.MenuName === "ContactUs Report" || child.MenuName === "Order Mock-Up Report" || child.MenuName === "Submit PO report" || child.MenuName === "Analytics Report" ? (
                                                                            <a className="sidebar-link" href={`${websiteurl}v2/${child.URL}`} aria-label={child.MenuName}>
                                                                                {child.MenuName}
                                                                            </a>
                                                                        ) : (
                                                                            <a className="sidebar-link" href={websiteurl + child.URL} aria-label={child.MenuName}>
                                                                                {child.MenuName}
                                                                            </a>
                                                                        )}
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    }
                                }
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default AdminMenu;

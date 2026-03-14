import { CDN_URL } from "common/utils/vars";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

const HeaderLogo = ({ setActiveLink, setOpenSubMenu, menuisOn, setMenuIsOn }) => {
    useEffect(() => {}, [menuisOn]);

    const handleLinkClick = () => {
        setMenuIsOn(true); // Close menu when clicking a link
        setActiveLink(0);
        setOpenSubMenu("dashboard");
    };
    return (
        <div className="logoWrapper mt-2 mb-2" onClick={handleLinkClick}>
            <a href="/dashboard">
                <img className={menuisOn ? "logo-mini-icon" : "logo-icon"} alt="logo" src={`${CDN_URL}/ewizlogo/${menuisOn ? "EwizOnlyIcon.png" : "ewizcolor225.png"} `} />
            </a>
        </div>
    );
};

export default HeaderLogo;

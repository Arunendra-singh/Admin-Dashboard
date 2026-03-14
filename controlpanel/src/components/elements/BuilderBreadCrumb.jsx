import { Link } from "react-router-dom";

const BuilderBreadCrumb = ({ activeLink = null, children = null, elemId, style }) => (
    <>
        <div className="breadCrumbWrapper" id={elemId}>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {children}
                {activeLink !== null && (<li className="breadcrumb-item active">{activeLink}</li>)}
            </ul>
        </div>
        <style>
            {style}
        </style>
    </>

);

export default BuilderBreadCrumb;

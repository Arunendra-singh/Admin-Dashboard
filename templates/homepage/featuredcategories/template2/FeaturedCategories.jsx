import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { Link } from "react-router-dom";
import styles from "./FeaturedCategories.module.scss";
import LazyImg from "../shared/Lazyload/LazyLoad";

const FeaturedCategories = ({ id }) => (
    <section id={id} className={`${styles.FeaturedCategories} container-fluid`}>
        <div className="title-main-wrapper">
            <div className="list-title">
                <h3 className="title">Shop By Category</h3>
            </div>
        </div>
        <div className="shopByCategoriesWrap">
            <div className="imgWrap">
                <Link to="/category/View-All-Caps">
                    <LazyImg alt="caps" src={`${CDN_URL}/${WEBSITE_GUID}/StaticImages/caps.png`} title="caps" width="315px" height="340px" />
                    <p>caps</p>
                </Link>
            </div>
            <div className="imgWrap">
                <Link to="/category/View-All-Visors">
                    <LazyImg alt="visors" src={`${CDN_URL}/${WEBSITE_GUID}/StaticImages/visors.png`} title="Visors" width="315px" height="340px" />
                    <p>visors</p>
                </Link>
            </div>
            <div className="imgWrap">
                <Link to="/category/View-All-Beanies">
                    <LazyImg alt="knits" src={`${CDN_URL}/${WEBSITE_GUID}/StaticImages/knits.png`} title="knits" width="315px" height="340px" />
                    <p>knits</p>
                </Link>
            </div>
            <div className="imgWrap">
                <Link to="category/View-All-Closeouts">
                    <LazyImg alt="closeouts" src={`${CDN_URL}/${WEBSITE_GUID}/StaticImages/closeouts.png`} title="closeouts" width="315px" height="340px" />
                    <p>closeouts</p>
                </Link>
            </div>
        </div>
    </section>
);

export default FeaturedCategories;

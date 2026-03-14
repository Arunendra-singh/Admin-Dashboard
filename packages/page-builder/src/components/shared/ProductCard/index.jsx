import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { LazyImage } from "common/components";
import { defaultImg } from "~/helpers/utils/resources";
import AddtoWishlist from "./AddToWishlist";
import ProductColors from "./productColors";
import QuickViewPopUp from "./QuickViewPopUp";
import AddToPresentation from "./AddToPresentation";
import AddToCompare from "./AddToCompare";
import AddToCart from "./Cart/AddToCart";
import FeatureIcons from "./FeatureIcons";

const ProductCard = ({ productdata, customFunction = null, resource = null, view = "grid" }) => {
    const _detailLink = `/${productdata?.detailurl}`;
    const [openQuickView, setQuickView] = useState(false);

    const [isAddedToWishList, setWishlist] = useState(productdata?.isaddedinwishlist);

    const updateWishlistData = useCallback(
        (_isAddedToWishList) => {
            setWishlist(_isAddedToWishList);
        },
        [isAddedToWishList]
    );

    const listContent = () => (
        <div className="list-content">
            <h3>{productdata?.productcode}</h3>
            <Link to={_detailLink} state={{ productdata }}>
                <h4 onClick={() => customFunction(true)}>{productdata?.productname}</h4>
            </Link>
            <div className="product-price">
                <div className="price">
                    <span className="text"> {resource?.aslowas} </span>
                    <span className={`price-span ${productdata?.price > 0 ? "strike" : ""}`}>
                        <span className="currencySymbol" />
                        {productdata?.price?.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );

    const cardContent = () => (
        <>
            <FeatureIcons iconList={productdata.featurediconsvm} />
            <Link to={_detailLink} state={{ productdata }}>
                <div className="productImage" onClick={() => customFunction(true)}>
                    <LazyImage width={380} height={380} src={productdata?.imageurl || productdata?.productimageurl ? `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${productdata?.imageurl || productdata?.productimageurl}` : defaultImg} alt={productdata?.productname} classes="lazyload img-fluid" placeholder={defaultImg} />
                </div>
            </Link>
            <div className="onlyMob d-lg-none addToWishlistMobile">
                <AddtoWishlist updateWishlistData={updateWishlistData} isAddedToWishList={isAddedToWishList} resource={resource} productdata={productdata} customFunction={customFunction} />
            </div>
            <div className="quick-view-wrap">
                <button type="button" className="btn btn-primary" onClick={() => setQuickView(true)}>
                    {resource?.quickview}
                </button>
            </div>
            {openQuickView && <QuickViewPopUp guid={productdata?.productguid} productdata={productdata} onClose={() => setQuickView(false)} />}
            {view === "grid" && listContent()}
            <div className="card-block">
                <ProductColors swatches={productdata?.swatches} />
                <div className="icons-box">
                    <div className="compare-presentation icon compareIcon">
                        <AddToCompare resource={resource} productdata={productdata} />
                    </div>
                    <div className="compare-presentation icon presentationIcon">
                        <AddToPresentation productdata={productdata} />
                    </div>
                    <div className="compare-presentation icon wishlistIcon">
                        <AddtoWishlist updateWishlistData={updateWishlistData} isAddedToWishList={isAddedToWishList} resource={resource} productdata={productdata} customFunction={customFunction} />
                    </div>
                    <div className="compare-presentation icon active cartIcon">
                        <AddToCart isPopUp resource={resource} productdata={productdata} />
                    </div>
                </div>
            </div>
        </>
    );

    return view === "grid" ? (
        <div className="card-search product-card">{cardContent()}</div>
    ) : (
        <div className="row mb-3 product-card-list-view">
            <div className="card-search product-card col-4">{cardContent()}</div>
            {view === "list" && <div className="col-8">{listContent()}</div>}
        </div>
    );
};

export default ProductCard;

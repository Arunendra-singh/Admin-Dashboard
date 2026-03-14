import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CDN_URL, COOKIE_DETAILS, WEBSITE_GUID } from "common/utils/vars";
import { defaultImg } from "~/helpers/utils/resources";
import AddtoWishlist from "./AddToWishlist";
import QuickViewPopUp from "./QuickViewPopUp";
import AddToPresentation from "./AddToPresentation";
import AddToCompare from "./AddToCompare";
import AddToCart from "./Cart/AddToCart";
import FeatureIcons from "./FeatureIcons";
import classes from "./index.module.scss";
import LazyImg from "../Lazyload/LazyLoad";

const PriceData = ({ price, disountedPrice, discountCode }) => {
    const { EmailAddress } = COOKIE_DETAILS;

    return (
        <>
            <span className="price-span" data-discount={disountedPrice}>
                <span className="currencySymbol" />
                {price?.toFixed(2)} {EmailAddress && <span className="discountCodeNBlankPrice">Blank Price</span>}
            </span>
            {discountCode && !EmailAddress && <span className="discountCodeNBlankPrice">({discountCode}) Blank Price</span>}
        </>
    );
};

const ProductCard = ({ productdata, customFunction = null, resource = null, view = "grid" }) => {
    const _detailLink = `/${productdata?.detailurl}`;
    const [openQuickView, setQuickView] = useState(false);
    const { EmailAddress } = COOKIE_DETAILS;

    const _image = useMemo(() => {
        const defImg = productdata?.productmediavm?.filter((item) => item?.mediagroupdisplayimage);
        const imgName = defImg?.length > 0 ? defImg[0]?.media : productdata?.productimageurl;
        return `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${imgName}`;
    }, [productdata]);

    const [isAddedToWishList, setWishlist] = useState(productdata?.isaddedinwishlist);

    const updateWishlistData = useCallback(
        (_isAddedToWishList) => {
            setWishlist(_isAddedToWishList);
        },
        [isAddedToWishList]
    );

    const listContent = () => (
        <div className="list-content">
            <h3 className="product-code">{productdata?.productcode}</h3>
            <Link className="product-name" to={_detailLink} state={{ productdata }}>
                <h4>{productdata?.productname}</h4>
            </Link>
            <div className="product-price">
                <div className="price">
                    {productdata?.minprice > 0 ? (
                        <>
                            <span className="text"> {resource?.aslowas} </span>
                            {!EmailAddress ? <PriceData price={productdata?.minprice} disountedPrice={productdata?.minstrikeprice} discountCode={productdata?.discountcode} /> : <PriceData price={productdata?.mindiscountedprice} disountedPrice={productdata?.minstrikeprice} discountCode={productdata?.discountcode} />}
                        </>
                    ) : (
                        resource?.callforprice
                    )}
                </div>
            </div>
        </div>
    );

    const cardContent = () => (
        <>
            <div className="card-upper-block">
                <Link to={_detailLink} state={{ productdata }}>
                    <div className="productImage">{!productdata?.selectedcolorimage ? <LazyImg width="240px" height="240px" src={productdata ? _image : defaultImg} alt={productdata?.productname} classes="lazyload img-fluid" placeholder={defaultImg} /> : <LazyImg width="240px" height="240px" src={productdata ? `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${productdata.selectedcolorimage}` : defaultImg} alt={productdata?.productname} classes="lazyload img-fluid" placeholder={defaultImg} />}</div>
                </Link>
                <FeatureIcons iconList={productdata.featurediconsvm} />
                <div className="onlyMob d-lg-none addToWishlistMobile">
                    <AddtoWishlist updateWishlistData={updateWishlistData} isAddedToWishList={isAddedToWishList} resource={resource} productdata={productdata} customFunction={customFunction} />
                </div>

                <div className="icons-box">
                    <div className="compare-presentation icon wishlistIcon">
                        <AddtoWishlist updateWishlistData={updateWishlistData} isAddedToWishList={isAddedToWishList} resource={resource} productdata={productdata} customFunction={customFunction} />
                    </div>
                    <div className="compare-presentation icon compareIcon">
                        <AddToCompare resource={resource} productdata={productdata} />
                    </div>
                    <div className="compare-presentation quick-view-wrap">
                        <button type="button" className="quick-view" onClick={() => setQuickView(true)}>
                            <i className="sli icon-eye" aria-hidden="true" />
                            <span>{resource?.quickview}</span>
                        </button>
                    </div>
                    <div className="compare-presentation icon presentationIcon">
                        <AddToPresentation productdata={productdata} />
                    </div>
                    <div className="compare-presentation icon cartIcon">
                        <AddToCart isPopUp resource={resource} productdata={productdata} />
                    </div>
                </div>
            </div>

            <div className="card-block d-flex flex-column">
                {openQuickView && <QuickViewPopUp guid={productdata?.productguid} productdata={productdata} onClose={() => setQuickView(false)} />}
                {view === "grid" && listContent()}
            </div>
        </>
    );

    return view === "grid" ? (
        <>
            <span className="d-none customFieldText">{productdata?.customField2?.[0]}</span>
            <div className={`${classes.product_card_style} card-search product-card `}> {cardContent()}</div>
        </>
    ) : (
        <div className="row mb-3 product-card-list-view product-card product_card_style">
            <div className="card-search col-4">{cardContent()}</div>
            {view === "list" && <div className="col-8 card-block">{listContent()}</div>}
        </div>
    );
};

export default ProductCard;

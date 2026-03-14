import { useGetProductDetail } from "common/hooks/react/api";
import { SVGImageURI } from "common/utils";
import { useState } from "react";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { Link } from "react-router-dom";
import MediaListCarousal from "./MediaListCarousal";
import DialogBox from "../DialogBox";
import ProductPricing from "./ProductPricing";

const QuickViewPopUp = ({ guid, onClose, productdata }) => {
    // const [prodGuid, setGuid] = useState(null);
    const [selectedCarousal, setSelectedCarousal] = useState(null);
    const { data: apiData } = useGetProductDetail(guid);
    const placeholderImage = SVGImageURI(380, 380, "#ebebeb");

    const onCarousalClick = (val) => {
        setSelectedCarousal(val);
        // setGuid(val.skuguid);
    };

    const data = apiData || { ...productdata, imagename: productdata?.productimageurl, productskus: productdata?.productnewskuvm };
    return (
        <DialogBox title="Quick View" customClasses="modal-xl" dialogId="quick-view-pop-up" closePopup={() => onClose()}>
            <div className="row quick-view-container">
                <div className="col-12 col-sm-5">
                    <div className="detail-content">
                        <div className="ProdDefaultImage ">
                            <div className="divclom1">
                                <div className="imgBox ">
                                    <div className="prodImg">
                                        <div className="SKUfeaturedIcon d-none" />
                                        {data?.imagename ? <img className="lazyload img-fluid" src={`${CDN_URL}/${WEBSITE_GUID}/Products/Medium/${selectedCarousal?.imagename || data?.imagename}`} height="300px" width="300px" alt={data?.productname} loading="lazy" /> : <img className="lazyload img-fluid" src={placeholderImage} height="300px" width="300px" alt={data?.productname} loading="lazy" />}
                                        <div className="featuredIcon" />
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </div>
                        </div>
                        <MediaListCarousal slidesPerView={4} productMediaList={data?.productskus} showNote={false} handleClick={(val) => onCarousalClick(val)} />
                    </div>
                </div>
                <div className="col-12 col-sm-7">
                    <div className="ProdCode">
                        <div className="prodCode" role="region">
                            <h5 aria-label="Productcode" role="presentation">
                                <span>#</span>
                                {data?.productcode}
                            </h5>
                        </div>
                    </div>
                    <div className="ProdName">
                        <div className="prodName" role="region">
                            <h1 className="page-heading ">
                                <span>{data?.productname}</span>
                            </h1>
                        </div>
                    </div>
                    <ProductPricing priceingData={selectedCarousal || data?.productskus?.[0]} />
                    <div className="view-prod-btn">
                        <Link to={`/${data?.detailurl}`} state={{ productdata: data }} id="" className="theme-color">
                            View Details
                        </Link>
                    </div>
                    <div className="ProdDescription">
                        <div className="collapsible-details product-description" role="region">
                            <h4 className="d-flex justify-content-between detail-header" data-toggle="collapse" href="#Product-Description" role="presentation" aria-controls="Product-Description">
                                <span>Product Description</span>
                            </h4>
                            <div className="collapse show" id="Product-Description">
                                <div className="detail-content">
                                    <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DialogBox>
    );
};

export default QuickViewPopUp;

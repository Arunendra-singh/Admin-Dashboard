import { SVGImageURI } from "common/utils";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const MediaListCarousal = ({ productMediaList, showNote = true, handleClick = () => {}, selectedSKUguid, slidesPerView = 10, navigation = false }) => {
    console.log(productMediaList);
    const defaultSVGImg = SVGImageURI(200, 200, "#f1f1f1");
    const smallImageInitialPath = `${CDN_URL}/${WEBSITE_GUID}/Products/Medium/`;
    return (
        <div className="pen-color-crousol">
            <div className="title">
                <h2>Available Colors</h2>
            </div>
            <div className="crousol-box">
                <Swiper navigation={navigation} modules={[Navigation]} className=" " spaceBetween={10} slidesPerView={slidesPerView}>
                    {productMediaList?.productskus?.map((colors) => (
                        <SwiperSlide key={colors.skuguid}>
                            <div className={`pen-color-img ${selectedSKUguid === colors.skuguid ? "active" : ""}`} onClick={() => handleClick(colors)}>
                                <img className="lazyload" alt={colors.imagename} src={defaultSVGImg} data-src={`${smallImageInitialPath}${colors.imagename}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {showNote && (
                    <div className="note-text">
                        <span>Note:</span>
                        <span> Price Includes 1-color imprint, 1 location</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default MediaListCarousal;

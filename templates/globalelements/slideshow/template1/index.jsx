import { useGetSlideShowData } from "common/hooks/react/api";
import { Link } from "react-router-dom";
import { SVGImageURI } from "common/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import classes from "./SliderOne.module.scss";
import "swiper/css/autoplay";
import LazyImg from "../shared/Lazyload/LazyLoad";

const BannerSlideShow = ({ slideShowGuid }) => {
    const { data, isSuccess } = useGetSlideShowData(slideShowGuid);
    const placeholderImg = SVGImageURI("100%", "auto", "#f1f1f1");

    return (
        <div className={classes.homepageBanner}>
            {isSuccess && (
                <Swiper className="homePageBannerStc" lazy modules={[Autoplay, Navigation, Pagination]} navigation={true} pagination={{ clickable: true }} spaceBetween={0} slidesPerView={1} autoplay={{ delay: 6000 }}>
                    {data.map((bannerdetail) => {
                        const bannerUrl = bannerdetail.navigateurl;

                        return (
                            <SwiperSlide key={bannerdetail.imageurl}>
                                <Link to={bannerUrl} aria-label={bannerdetail.imagename}>
                                    <LazyImg className="img-fluid lazy" src={bannerdetail.imageurl} data-src={placeholderImg} alt={bannerdetail.imagename} width="100%" height="650px" />
                                    <div className="overylayText" dangerouslySetInnerHTML={{ __html: bannerdetail.overlaytext }} />
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default BannerSlideShow;

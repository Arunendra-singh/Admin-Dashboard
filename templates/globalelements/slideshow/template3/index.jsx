import { useGetSlideShowData } from "common/hooks/react/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/autoplay";

const BannerSlideShow = ({ slideShowGuid }) => {
    const { data, isSuccess } = useGetSlideShowData(slideShowGuid);
    return (
        <div className="homepage-banner">
            {isSuccess && (
                <Swiper lazy modules={[Pagination, Autoplay]} pagination={{ clickable: true }} spaceBetween={0} slidesPerView={1} autoplay={{ delay: 5000 }}>
                    {data.map((bannerdetail) => {
                        const bannerUrl = bannerdetail.navigateurl;

                        return (
                            <SwiperSlide>
                                <Link key={bannerdetail.imageurl} to={bannerUrl} aria-label={bannerdetail.imagename}>
                                    <img className="img-fluid lazy" src={bannerdetail.imageurl} data-src={bannerdetail.imageurl} alt={bannerdetail.imagename} width="100%" height="650px" />
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

import { useGetSlideShowData } from "common/hooks/react/api";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css/autoplay";
import { useRef } from "react";
import styles from "./BannerSlideShow.module.scss";

SwiperCore.use([Autoplay]);

const BannerSlideShowTwo = ({ slideShowGuid }) => {
    const { data, isSuccess } = useGetSlideShowData(slideShowGuid);
    const swiperRef = useRef(null);
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
            swiperRef.current.swiper.autoplay.stop();
        }
    };

    const handleMouseLeave = () => {
        if (swiperRef.current && !swiperRef.current.swiper.autoplay.running) {
            swiperRef.current.swiper.autoplay.start();
        }
    };

    return (
        <div className={`${styles.homepageBanner} homePageBannerS`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isSuccess && (
                <Swiper
                    ref={swiperRef}
                    lazy="true"
                    modules={[Navigation, Autoplay]}
                    navigation={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                >
                    {data.map((bannerdetail) => {
                        const bannerUrl = bannerdetail.navigateurl;

                        return (
                            <SwiperSlide key={bannerdetail?.slideshowimageguid}>
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

export default BannerSlideShowTwo;

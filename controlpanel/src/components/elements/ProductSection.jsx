import { useGetAllDataByCollection } from "common/hooks/react/api";
import PageContainer from "~/hoc/PageContainer";
import SectionTitleHeader from "~/hoc/SectionTitleHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ProductCard from "../shared/ProductCard";

const ProductSection = ({ elemId, isCarousel = false, sectionname = "NEWARRIVALS", CategoryGuid = "30B138BC-A747-4D13-A6B6-C1D341B202C6", NoofSwatches = 5, IsSwatchesEnabled = true, ProductCount = 1 }) => {
    const { data, isSuccess, isLoading } = useGetAllDataByCollection(sectionname, { CategoryGuid, NoofSwatches, IsSwatchesEnabled, ProductCount });
    return (
        <section className="collection-element" id={elemId}>
            {isSuccess && !isLoading && (
                <PageContainer fluid={true}>
                    <SectionTitleHeader data={data} />

                    {isSuccess ? (
                        <Swiper
                            breakpoints={{
                                1200: {
                                    slidesPerView: 6
                                },
                                1024: {
                                    slidesPerView: 5
                                },
                                991: {
                                    slidesPerView: 4
                                },
                                767: {
                                    slidesPerView: 3
                                },
                                575: {
                                    slidesPerView: 2
                                },
                                320: {
                                    slidesPerView: 1
                                }
                            }}
                            navigation={true}
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={6}
                        >
                            {data?.productlstdata?.map((product) => (
                                <SwiperSlide key={product.productName + product.productcode}>
                                    <ProductCard resource={data?.resource} productdata={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="noProducts">No Products found.</div>
                    )}
                </PageContainer>
            )}
        </section>
    );
};

export default ProductSection;

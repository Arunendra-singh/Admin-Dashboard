import { useGetCategoryMenu } from "common/hooks/react/api";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import { Link } from "react-router-dom";
import PageContainer from "~/hoc/PageContainer";
import { SVGImageURI } from "common/utils";
import { LazyImage } from "common/components";
import { useEffect, useState } from "react";
import styles from "./FeaturedCategories.module.scss";

const FeaturedCategories = ({ sectionname, header, id }) => {
    const { data: topCategories, isSuccess } = useGetCategoryMenu(sectionname, header);
    const placeholderImage = SVGImageURI(400, 400, "#f1f1f1");

    const [menuUpdated, setMenuUpdated] = useState([]);
    const _data = topCategories?.sort((a, b) => {
        if (a.displayorder < b.displayorder) {
            return -1;
        }
        if (a.displayorder > b.displayorder) {
            return 1;
        }
        return 0;
    });
    useEffect(() => {
        setMenuUpdated(_data);
    }, [topCategories, isSuccess]);

    return (
        <section id={id}>
            {isSuccess && (
                <div className={`${styles.FeaturedCategories} section_padding_bottom section_padding_top `}>
                    <PageContainer fluid={true} id="feature-category">
                        <div className="list-title text-center">
                            <h3>Featured Categories</h3>
                            <Link to="categories"> View All</Link>
                        </div>
                        <div className="collection-without-carousel TopCategoriesCategoryView">
                            <div className="row">
                                {isSuccess ? (
                                    menuUpdated?.slice(0, 8).map((category) => {
                                        const imageURL = category.categoryimageurl != null ? `${CDN_URL}/${WEBSITE_GUID}/Collections/Default/${category.categoryimageurl}` : placeholderImage;
                                        return (
                                            <Link className="category" to={`/category/${category.alias}`} state={{ categoryData: category }} key={category.alias}>
                                                <div className="category-image">
                                                    <LazyImage width={380} height={380} className="lazyload img-fluid" src={imageURL} data-src={imageURL} alt={category.collectionname} />
                                                </div>
                                                <div className="category-name">
                                                    <h3>{category.collectionname}</h3>
                                                    <p>{category.productcount} Products </p>
                                                </div>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="noProducts">No top category found.</div>
                                )}
                            </div>
                        </div>
                    </PageContainer>
                </div>
            )}
        </section>
    );
};

export default FeaturedCategories;

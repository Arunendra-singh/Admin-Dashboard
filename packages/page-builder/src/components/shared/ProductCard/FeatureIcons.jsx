import { SVGImageURI } from "common/utils";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";

const FeatureIcons = ({ iconList }) => {
    const loaderImg = SVGImageURI(20, 20);
    return (
        <div className="featureIcon">
            {iconList?.map((icon) => (
                <img key={`${icon.collectionname}-${icon.collectionguid}`} width="80" className="lazyload img-fluid" src={loaderImg} data-src={`${CDN_URL}/${WEBSITE_GUID}/Collections/Default/${icon.iconimagename}`} alt={icon.collectionname} />
            ))}
        </div>
    );
};

export default FeatureIcons;

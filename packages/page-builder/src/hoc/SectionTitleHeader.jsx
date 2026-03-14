import { Link } from "react-router-dom";

const SectionTitleHeader = ({ data }) => {
    const title = data?.collectionguids?.length ? data?.collectionguids[0]?.collectionname : data?.resource?.heading;
    const viewAllURL = data?.redirectionurl ? `/viewAll/${data?.redirectionurl?.substring(data.redirectionurl.lastIndexOf("/") + 1)}` : `/category/${data?.collectionguids[0]?.alias}`;
    return title ? (
        <div className="title-main-wrapper">
            <div className="list-title">
                <h3 className="title">{title}</h3>
                <Link to={viewAllURL}>{data?.resource?.sectionviewall}</Link>
            </div>
        </div>
    ) : (
        ""
    );
};

export default SectionTitleHeader;

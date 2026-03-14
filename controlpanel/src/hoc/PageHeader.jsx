// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

const PageHeader = ({ title }) => (
    <h3 className="page-heading">
        <span className="text-color">{title}</span>
        <div className="infor">
            <i className="icon-info" />
        </div>
    </h3>
);

PageHeader.propTypes = {
    title: PropTypes.string.isRequired, // Ensure title is required if necessary
};

export default PageHeader;

const Loader = ({ customClass = "" }) => (
    <div className={`loadingData ${customClass}`}>
        <div className="custom-animsition-loading">
            <div className="loader">
                <div className="loader-inner line-scale">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    </div>
);

export default Loader;

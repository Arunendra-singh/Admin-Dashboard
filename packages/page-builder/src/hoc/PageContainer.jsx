const PageContainer = ({ children, id = "", fluid = false, classes = "" }) => {
    const container = [fluid ? "container-fluid" : "container", classes];
    const classList = container.map((c) => c.trim()).filter((c) => c !== "").join(" ");
    return (
        <div className={classList} id={id}>
            {children}
        </div>
    );
};

export default PageContainer;

import { useEffect, useState } from "react";

const Button = ({ id = "", label = null, buttonType = "submit", onClick, buttonClassName, children, isDisabled = false, isLoading = false, ariaLabel = "" }) => {
    const [disableBtn, setDiableBtn] = useState(isDisabled);

    useEffect(() => {
        if (isLoading) setDiableBtn(isLoading);
        else setDiableBtn(isDisabled);
    }, [isLoading]);

    return (
        // eslint-disable-next-line react/button-has-type
        <button type={buttonType} className={buttonClassName} onClick={onClick} disabled={disableBtn} id={id} aria-label={ariaLabel ?? label ?? ""}>
            {isLoading && <div className="loadingSpinner" />}
            {label && label}
            {children}
        </button>
    );
};

export default Button;

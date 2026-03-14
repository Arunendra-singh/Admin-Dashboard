import { useEffect } from "react";
import Button from "./Button";

const DialogBox = ({ title, dialogId, closePopup, customClasses = "", dialogType = "success", children }) => {
    useEffect(() => {
        if (!document.getElementById(dialogId).hasAttribute("open")) document.getElementById(dialogId).showModal();
    }, [dialogId]);

    const closeDialogBox = () => {
        document.getElementById(dialogId).close();
        closePopup();
    };

    return (
        <dialog id={dialogId} data-shm className={`dialog-${dialogType} is-modal ${customClasses}`}>
            <div className="dialog-container">
                <div className="dialog-content">
                    <div className={`dialog-header ${dialogType}`}>
                        <h5 className="dialog-title">{title}</h5>
                        <Button buttonType="button" onClick={closeDialogBox} buttonClassName="close" label="">
                            <span className="icon-close" />
                        </Button>
                    </div>
                    <div className="dialog-body">{children}</div>
                </div>
            </div>
        </dialog>
    );
};

export default DialogBox;

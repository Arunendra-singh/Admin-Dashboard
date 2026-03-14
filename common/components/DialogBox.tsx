import { useEffect, useRef } from "react";

interface IDialogBoxProps {
    id?: string;
    children: JSX.Element;
    className?: string;
    title?: string;
    dialogType?: string;
    CloseBtnContent?: React.ComponentType<any>;
    onClose?: () => void;
}

const DefaultCloseBtnContent = (): JSX.Element => <>&times;</>;

export function DialogBox({ id = `DialogBox_${new Date().getTime()}`, children, className = "", CloseBtnContent = DefaultCloseBtnContent, title = "", dialogType = "success", onClose = () => {} }: IDialogBoxProps): JSX.Element {
    const ref = useRef<HTMLDialogElement>(null);

    const CloseHandler = () => {
        if (ref.current !== null) ref.current.close();
        onClose();
    };

    useEffect(() => {
        const dialog = ref.current;
        if (dialog !== null) {
            dialog.showModal();

            // dialog.addEventListener("click", function (event) {
            //     const rect = dialog.getBoundingClientRect();
            //     const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
            //     if (!isInDialog) CloseHandler();
            // });
        }
    }, [ref]);

    return (
        <dialog data-shm id={id} ref={ref} className={className}>
            <div className="dialog-container">
                <div className="dialog-content">
                    <div className={`dialog-header ${dialogType}`}>
                        <h5 className="dialog-title">{title}</h5>
                        <button type="button" className="close" onClick={CloseHandler}>
                            <CloseBtnContent />
                        </button>
                    </div>
                    <div className="dialog-body">{children}</div>
                </div>
            </div>
        </dialog>
    );
}

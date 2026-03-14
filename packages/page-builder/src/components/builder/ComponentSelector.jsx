import { useCallback, useState } from "react";
import DialogBox from "~/components/shared/DialogBox";
import { categories } from "~/helpers/json/components.json";

const ComponentSelector = ({ elemId }) => {
    const [modalRef, showModelRef] = useState(false);
    const [multiOption, showMultiOptions] = useState(null);

    const postMessageData = (data) => {
        window.postMessage(JSON.stringify({
            type: "select-element",
            component: data,
            elemId
        }), "*");
    };

    const toggleModal = useCallback(() => {
        showModelRef(!modalRef);
    }, [modalRef]);

    const closeOptionDialogBox = useCallback(() => {
        showMultiOptions(null);
    }, [multiOption]);

    const selectHandler = (component) => {
        if (component.type === "multiple-option") {
            toggleModal();
            showMultiOptions(component);
        } else postMessageData(component);
    };

    const onDragOverHandler = (event) => {
        event.preventDefault();

        const dataStr = event.dataTransfer.getData("text");
        if (!dataStr) return;

        const data = JSON.parse(dataStr);

        if (data.type === "multiple-option") {
            toggleModal();
            showMultiOptions(data);
        } else postMessageData(data);
    };

    return (
        <>
            <div onClick={toggleModal} onDrop={onDragOverHandler} className="pb-component-selector">
                <i className="icon-plus" />

            </div>
            {modalRef && (
                <DialogBox dialogId="componentListPopup" customClasses="pb-dialog" title="Select Component" closePopup={toggleModal}>

                    {categories.map((category) => (
                        <div className="componentListWithTitle" key={category.name}>
                            <strong className="title">{category.name}</strong>
                            <ul className="componentList">
                                {category.components.map((comp) => (
                                    <li key={comp.label} onClick={() => selectHandler(comp)}>
                                        {comp.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </DialogBox>
            )}

            {
                multiOption != null && (
                    <DialogBox title={`Select Options for ${multiOption.label}`} dialogId="multiOption" closePopup={closeOptionDialogBox}>
                        <ul className="componentList">
                            {multiOption.option.map((option) => <li key={option.label} onClick={() => postMessageData(option)}>{option.label}</li>)}
                        </ul>
                    </DialogBox>
                )
            }
        </>
    );
};

export default ComponentSelector;

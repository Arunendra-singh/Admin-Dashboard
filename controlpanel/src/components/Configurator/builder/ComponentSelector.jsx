import { useCallback, useState } from "react";
import DialogBox from "../../shared/DialogBox";
// import { categories } from "~/helpers/json/components.json";

const ComponentSelector = ({ elemId }) => {
    // const [modalRef, showModelRef] = useState(false);
    const [multiOption, showMultiOptions] = useState(null);

    const postMessageData = (data) => {
        window.postMessage(
            JSON.stringify({
                type: "select-element",
                component: data,
                elemId
            }),
            "*"
        );
    };

    // const toggleModal = useCallback(() => {
    //     showModelRef(!modalRef);
    // }, [modalRef]);

    const closeOptionDialogBox = useCallback(() => {
        showMultiOptions(null);
    }, [multiOption]);

    // const selectHandler = (component) => {
    //     if (component.type === "multiple-option") {
    //         toggleModal();
    //         showMultiOptions(component);
    //     } else postMessageData(component);
    // };

    const onDragOverHandler = (event) => {
        event.preventDefault();

        const dataStr = event.dataTransfer.getData("text");
        if (!dataStr) return;

        const data = JSON.parse(dataStr);

        if (data.type === "multiple-option") {
            // toggleModal();
            showMultiOptions(data);
        } else postMessageData(data);
    };

    const onDragStartHandler = (event) => {
        event.target.classList.add("dragging");
    };

    const onDragEndHandler = (event) => {
        event.preventDefault();
        event.target.classList.remove("dragging");
    };

    const dragColumn = () => {

    };
    const onDelete = () => {
        window.postMessage(
            JSON.stringify({
                type: "remove-row-column",
                elemId
            }),
            "*"
        );
    };

    return (
        <div className="pb-container child" onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} draggable>
            <div className="skip_iframe child-drag-actions">
                <span title="Drag Column" className="drag icon-ArrowsOutCardinal-1" onClick={dragColumn} />
                <span title="Remove Column" className="remove icon-trash" onClick={onDelete} />
            </div>
            <div onDrop={onDragOverHandler} className="pb-component-selector" />
            {/* onClick={toggleModal} */}
            {/* <div className="layoutplusbtn"><i onClick={(e) => copyemptyrow(e)} className="fa fa-plus skip_iframe" /></div > */}
            {/* {modalRef && (
                    // console.log("modalRef", modalRef)
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
                )
                } */}

            {
                multiOption != null && (
                    <DialogBox title={`Select Options for ${multiOption.label}`} dialogId="multiOption" closePopup={closeOptionDialogBox}>
                        <ul className="componentList">
                            {multiOption.option.map((option) => (
                                <li key={option.label} onClick={() => postMessageData(option)}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </DialogBox>
                )
            }
        </div>
    );
};

export default ComponentSelector;

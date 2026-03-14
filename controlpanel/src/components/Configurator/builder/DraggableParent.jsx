const DraggableParent = ({ children, ...rest }) => {
    const getDragAfterElem = (draggable, y) => {
        const draggableElems = Array.from(draggable.parentElement.children).filter((elem) => !elem.classList.contains("dragging"));

        return draggableElems.reduce((closest, element) => {
            const box = element.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element };
            }
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    };

    const onDragOverHandler = (event) => {
        event.preventDefault();

        const container = event.currentTarget; // source element with the OnDragOver event
        let draggable = container.querySelector(":scope > .dragging");
        if (draggable == null) {
            draggable = container.querySelector(".dragging.child");
        }
        // const overElem = event.target; // element directly under the dragged element

        if (!draggable) return;

        const afterElem = getDragAfterElem(draggable, event.clientY);

        const isChild = draggable.classList.contains("child");
        const targetContainer = isChild ? draggable.parentElement : container;
        const insertMethod = afterElem == null ? "appendChild" : "insertBefore";

        if (insertMethod === "appendChild") {
            targetContainer.appendChild(draggable);
        } else {
            targetContainer.insertBefore(draggable, afterElem);
        }
        if (draggable !== null) {
            const elemId = draggable.childNodes[1].id;
            window.postMessage(
                JSON.stringify({
                    type: "element-position-change",
                    elemId
                }),
                "*"
            );
        }
    };

    return (
        <div onDragOver={onDragOverHandler} {...rest}>
            {children}
        </div>
    );
};

export default DraggableParent;

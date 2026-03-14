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
        const draggable = container.querySelector(":scope > .dragging");
        // const overElem = event.target; // element directly under the dragged element

        if (!draggable) return;

        const afterElem = getDragAfterElem(draggable, event.clientY);

        if (afterElem == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElem);
        }
    };

    return (
        <div onDragOver={onDragOverHandler} {...rest}>
            {children}
        </div>
    );
};

export default DraggableParent;

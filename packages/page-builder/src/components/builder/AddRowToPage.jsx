import Button from "~/components/shared/Button";
import rowDivider from "../../helpers/json/rowDividerData";

const AddRowToPage = ({ addNewRowToConfig }) => {
    const generateId = () => `elem-${new Date().getTime()}-${Math.random().toString(36).slice(2)}`;

    const onSubmit = (colSpan) => {
        const _children = [];
        for (let i = 0; i < colSpan.length; i++) {
            const _elemId = generateId();
            const obj = {
                type: "jsx",
                element: "ComponentSelector",
                elemId: _elemId,
                props: {
                    cols: colSpan[i]
                }
            };
            _children.push(obj);
        }

        const _elemId = generateId();
        const newConfig = {
            type: "jsx",
            element: "DraggableRowContainer",
            props: {
                cols: colSpan.length,
                gridColumn: {
                    desktop: colSpan.join("fr ").concat("fr"),
                    tablet: colSpan.join("fr ").concat("fr"),
                    mobile: colSpan.join("fr ").concat("fr")
                }
            },
            children: _children,
            elemId: _elemId,
        };

        addNewRowToConfig(newConfig);
    };

    return (
        <div id="add-row-to-page">
            {rowDivider.map((buttonData) => <Button ariaLabel={buttonData.label} key={buttonData.label} buttonType="button" label={buttonData.label} onClick={() => onSubmit(buttonData.colSpan)} />)}

        </div>
    );
};

export default AddRowToPage;

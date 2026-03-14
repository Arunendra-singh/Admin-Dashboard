import { useAddRemovePresentation } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import { COOKIE_DETAILS } from "common/utils/vars";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import Store from "~/store";

const AddToPresentation = ({ productdata }) => {
    const [presentationCount, setPresentationCount] = Store.useStore((store) => store?.presentationCount);
    const [isAddedToPresentation, setPresentationList] = useState(productdata?.isAddedToPresentation);

    const { mutateAsync } = useAddRemovePresentation(productdata?.productcode, !isAddedToPresentation);

    const navigate = useNavigate();
    const updatePresentation = useCallback(async () => {
        if (productdata?.productcode) {
            if (COOKIE_DETAILS.EmailAddress !== null) {
                const result = await mutateAsync(productdata?.isAddedToPresentation);
                setPresentationList(result);
                const _content = result ? "Item added to your Presentation!" : "Item removed from your Presentation!";
                PopupV3({
                    content: _content,
                    classes: "notification text-center",
                    type: "success",
                    size: "md",
                    timeout: 2000,
                    pos: 3
                });
                setPresentationCount({ presentationCount: result ? presentationCount + 1 : presentationCount - 1 });
            } else {
                PopupV3({
                    content: "Login Required",
                    classes: "text-center",
                    type: "Warning",
                    pos: 5,
                    actions: [
                        {
                            text: "OK",
                            dismiss: true,
                            do: () => navigate(`/Login/Index?returnurl=${window.location.pathname}`)
                        },
                        { text: "Cancel", dismiss: true }
                    ]
                });
            }
        }
    }, [isAddedToPresentation, presentationCount, productdata]);

    return (
        <div role="button" tabIndex="0" className={`wishlistIcon ${isAddedToPresentation ? "checked" : ""}`} title={!isAddedToPresentation ? "Add to presentation" : "Remove from presentation"} onClick={() => updatePresentation()}>
            {/* <span className="text">{isAddedToPresentation ? "Remove from" : "Add to"} presentation</span> */}
            <i className="sli icon-blank_notebook" />
        </div>
    );
};

export default AddToPresentation;

import { useAddRemoveCompare } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import { COOKIE_DETAILS } from "common/utils/vars";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Store from "~/store";

const AddToCompare = ({ productdata, resource, icon = "icon-compare" }) => {
    const [compareCount, setCompareCount] = Store.useStore((store) => store?.compareCount);
    const [compareGuids, setCompareGuids] = Store.useStore((store) => store?.compareGuids);
    const [isAddedToCompare, setCompareList] = useState(compareGuids?.includes(productdata?.productguid));
    const { mutateAsync } = useAddRemoveCompare(productdata?.productguid);
    const title = isAddedToCompare ? resource?.removecompare : resource?.addcompare;

    useEffect(() => {
        setCompareList(compareGuids?.includes(productdata?.productguid));
    }, [compareGuids]);

    const navigate = useNavigate();
    const updateCompare = useCallback(async () => {
        if (productdata?.productguid) {
            if (COOKIE_DETAILS.EmailAddress !== null) {
                await mutateAsync(productdata?.isAddedToCompare);
                setCompareList(true);
                let _content = "Item added to your Compare!";
                if (compareGuids.length > 0) {
                    const isExists = compareGuids.split(",").find((item) => item === productdata?.productguid);
                    let newGuids = "";
                    if (isExists) {
                        newGuids = compareGuids
                            .split(",")
                            .filter((val) => val !== productdata?.productguid)
                            .join(",");
                        setCompareCount({ compareCount: compareCount - 1 });
                        setCompareList(false);
                        _content = "Item removed from your Compare!";
                    } else {
                        newGuids = `${compareGuids},${productdata?.productguid}`;
                        setCompareCount({ compareCount: compareCount + 1 });
                    }
                    setCompareGuids({ compareGuids: newGuids });
                } else {
                    setCompareGuids({ compareGuids: productdata?.productguid });
                    setCompareCount({ compareCount: compareCount + 1 });
                }
                PopupV3({
                    content: _content,
                    classes: "notification text-center",
                    type: "success",
                    size: "md",
                    timeout: 2000,
                    pos: 3
                });
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
    }, [isAddedToCompare, compareCount, productdata]);

    return (
        <div role="button" tabIndex="0" className={`wishlistIcon ${isAddedToCompare ? "checked" : ""}`} title={title} onClick={() => updateCompare()}>
            <span className="text">{title}</span>
            <i className={`sli ${icon}`} />
        </div>
    );
};

export default AddToCompare;

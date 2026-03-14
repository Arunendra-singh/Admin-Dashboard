import { useAddRemoveWishlist } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import { COOKIE_DETAILS } from "common/utils/vars";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import Store from "~/store";

const AddtoWishlist = ({ productdata, resource, isAddedToWishList, updateWishlistData }) => {
    const navigate = useNavigate();
    const [wishlistCount, setWishlistCount] = Store.useStore((store) => store?.wishlistCount);

    const { mutateAsync } = useAddRemoveWishlist(productdata?.productguid, !isAddedToWishList);

    const updateWishlist = useCallback(async () => {
        if (productdata?.productguid) {
            if (COOKIE_DETAILS.EmailAddress !== null) {
                const result = await mutateAsync(productdata?.isaddedinwishlist);
                updateWishlistData(result);
                const _content = result ? "Item added to your Wishlist!" : "Item removed from your Wishlist!";
                PopupV3({
                    content: _content,
                    classes: "notification text-center",
                    type: "success",
                    size: "md",
                    timeout: 2000,
                    pos: 3
                });
                setWishlistCount({ wishlistCount: result ? wishlistCount + 1 : wishlistCount - 1 });
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
    }, [isAddedToWishList, wishlistCount, productdata]);

    const title = isAddedToWishList ? resource?.removewishlist : resource?.addtowishlist;
    return (
        <div role="button" tabIndex="0" id={`addToWhishlist-${productdata?.productguid}`} className={`wishlistIcon ${isAddedToWishList ? "checked" : ""}`} title={title} onClick={() => updateWishlist()}>
            <span className="text">{title}</span>
            <i className="sli icon-wishlist" />
        </div>
    );
};

export default AddtoWishlist;

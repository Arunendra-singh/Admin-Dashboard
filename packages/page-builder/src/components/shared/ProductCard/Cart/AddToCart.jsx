import { useState } from "react";
import { useAddToCart } from "common/hooks/react/api";
import { PopupV3 } from "common/utils";
import { CURRENCY_GUID, SESSION_GUID, USER_EMAIL, USER_GUID, WEBSITE_GUID, COOKIE_DETAILS } from "common/utils/vars";
import Store from "~/store";
import CartPopUp from "./CartPopUp";

const AddToCart = ({ productdata, resource, isPopUp = false }) => {
    const [openPopUp, setOpenPopUp] = useState(false);
    const popUpPayLoad = {
        UserGuid: USER_GUID || COOKIE_DETAILS.UserGuid,
        SessionGuid: SESSION_GUID || COOKIE_DETAILS.SessionGuid,
        EmailAddress: USER_EMAIL || COOKIE_DETAILS.EmailAddress,
        ProductGuid: productdata?.productguid,
        ProductCode: "",
        SKUGuid: "",
        Quantity: "",
        PricingGuid: productdata?.pricingguid,
        CurrencyGuid: CURRENCY_GUID || COOKIE_DETAILS.CurrencyGuid,
        WebsiteGuid: WEBSITE_GUID || COOKIE_DETAILS.WebsiteGuid,
        CustomField: "",
        DecimalPrecision: "2",
        CustomField2: "",
        PricingName: "Price",
        ImprintMethodGuid: "",
        ImprintLocations: [],
        NumberOfImprintLocations: "",
        NumberOfImprintColors: ""
    };
    const _payLoad = {
        UserGuid: COOKIE_DETAILS.UserGuid || null,
        SessionGuid: COOKIE_DETAILS.SessionGuid || "",
        EmaiAddress: COOKIE_DETAILS.EmailAddress || null,
        productGuid: productdata?.productguid,
        productcode: productdata?.productcode,
        productname: productdata?.productname,
        skuGuid: "",
        quantity: 1,
        Price: productdata?.price,
        sku: "",
        imageName: "",
        variantName: "",
        pricingGuid: "",
        inventory: "",
        ImprintMethodGuid: "",
        ImprintLocations: [],
        ImprintColors: ""
    };
    const [payLoad, setPayLoad] = useState(isPopUp ? popUpPayLoad : _payLoad);
    const { mutateAsync } = useAddToCart();
    const [basketCount, setBasket] = Store.useStore((store) => store?.basketCount);
    const [basketItems] = Store.useStore((store) => store?.basketItems);

    const addToCartHandler = async () => {
        const result = await mutateAsync([payLoad]);
        if (result === 200) {
            const isAlreadAdded = basketItems.filter((prodGuid) => prodGuid === productdata.productguid).length;
            if (isAlreadAdded === 0) {
                const _basketItemList = basketItems;
                _basketItemList.push(productdata.productguid);
                setBasket({ basketItems: _basketItemList, basketCount: basketCount + 1 });
            }
            const msg = isAlreadAdded === 0 ? "Item added to your cart!" : "Items updated in your cart!";
            setOpenPopUp(false);
            PopupV3({
                content: msg,
                classes: "notification text-center",
                type: "success",
                size: "md",
                timeout: 2000,
                pos: 3
            });
        }
    };

    return (
        <>
            <div role="button" tabIndex="0" className="wishlistIcon" title={`${resource?.addtobasket}`} onClick={() => (isPopUp ? setOpenPopUp(true) : addToCartHandler())}>
                <span className="text">{resource?.addtobasket}</span>
                <i className="sli icon-shopping-bag" />
            </div>
            {openPopUp && <CartPopUp productdata={productdata} onClose={() => setOpenPopUp(false)} setPayLoad={setPayLoad} payLoad={payLoad} addToCartHandler={addToCartHandler} />}
        </>
    );
};

export default AddToCart;

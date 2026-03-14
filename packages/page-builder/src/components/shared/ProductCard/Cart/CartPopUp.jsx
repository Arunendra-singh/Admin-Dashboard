import { useGetProductDetail } from "common/hooks/react/api";
import { COOKIE_DETAILS } from "common/utils/vars";
import { PopupV3 } from "common/utils";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import MediaListCarousal from "../MediaListCarousal";
import DialogBox from "../../DialogBox";
import CartImprintLocations from "./CartImprintLocations";
import CartImprintMethods from "./CartImprintMethods";
import Loader from "../../Loader";

const CartPopUp = ({ productdata, onClose, payLoad, setPayLoad, addToCartHandler }) => {
    const { data, isSuccess } = useGetProductDetail(productdata.productguid);
    const navigate = useNavigate();
    const [imprintmethoddetails, setImprintmethoddetails] = useState([]);
    const [selectedImprintmethoddetails, setSelectedImprintmethoddetails] = useState({});

    useEffect(() => {
        if (isSuccess && data) {
            setPayLoad({
                ...payLoad,
                SKUGuid: data?.productskus?.find((sku) => sku.imagename === productdata.productimageurl)?.skuguid || data?.productskus?.[0]?.skuguid,
                ProductCode: data?.productcode,
                ImprintMethodGuid: data?.productskus?.[0]?.imprintmethoddetailswithname?.[0]?.imprintmethodguid
            });
            setImprintmethoddetails(data?.productskus?.[0]?.imprintmethoddetailswithname);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (payLoad?.ImprintMethodGuid && !!imprintmethoddetails?.length) {
            const _selected = imprintmethoddetails?.find((detail) => detail.imprintmethodguid === payLoad.ImprintMethodGuid);
            if (_selected) setSelectedImprintmethoddetails(_selected);
        }
    }, [payLoad.ImprintMethodGuid, imprintmethoddetails]);

    const handleQuantity = (val) => {
        const _quantity = val.replace(/[^0-9-]/g, "");
        setPayLoad({ ...payLoad, Quantity: `${_quantity}` });
    };

    const handleCarousel = (val) => {
        setImprintmethoddetails(val.imprintmethoddetailswithname);
        setPayLoad({ ...payLoad, SKUGuid: val.skuguid, PricingGuid: val.productprices[0]?.priceguid || productdata.pricingguid });
    };

    const handleLocation = (location, checked) => {
        let ImprintLocations = [];
        if (checked) ImprintLocations = [...payLoad.ImprintLocations, { ImprintLocationGuid: location.imprintlocationguid }];
        else {
            ImprintLocations = payLoad.ImprintLocations.filter((_location) => _location.ImprintLocationGuid !== location.imprintlocationguid);
        }
        setPayLoad({
            ...payLoad,
            ImprintLocations,
            NumberOfImprintLocations: checked ? `${+payLoad.NumberOfImprintLocations + 1}` : `${+payLoad.NumberOfImprintLocations - 1}`
        });
    };

    const handleimprintColor = (color, location, checked) => {
        let { ImprintLocations } = payLoad;
        ImprintLocations = ImprintLocations.map((impLocation) => {
            if (impLocation.ImprintLocationGuid === location.imprintlocationguid) {
                if (checked) return { ...impLocation, ImprintColors: impLocation.ImprintColors ? [...impLocation.ImprintColors, color.imprintcolorguid] : [color.imprintcolorguid] };
                return { ...impLocation, ImprintColors: impLocation.ImprintColors.filter((_color) => _color !== color.imprintcolorguid) };
            }
            return impLocation;
        });
        setPayLoad({ ...payLoad, ImprintLocations, NumberOfImprintColors: checked ? `${+payLoad.NumberOfImprintColors + 1}` : `${+payLoad.NumberOfImprintColors - 1}` });
    };

    const errorWarning = (errorMsg) => {
        PopupV3({
            content: errorMsg,
            classes: "text-center",
            type: "Warning",
            pos: 5,
            actions: [
                {
                    text: "OK",
                    dismiss: true
                }
            ]
        });
    };

    const validate = async () => {
        if (COOKIE_DETAILS.EmailAddress === null) {
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
        } else {
            if (!payLoad.Quantity) {
                return errorWarning("Please enter quantity.");
            }
            if (payLoad.Quantity && payLoad.Quantity < productdata.minquantity) {
                return errorWarning(`Minimum quantity should be ${productdata.minquantity}`);
            }
            if (!payLoad.ImprintLocations.length) {
                return errorWarning("Please select an imprint location!");
            }
            if (!!payLoad.ImprintLocations.length && !!payLoad.ImprintLocations.filter((location) => !location?.ImprintColors?.length)?.length) {
                return errorWarning("No colors selected.");
            }
            addToCartHandler();
        }
        return "";
    };

    return (
        <DialogBox title="Basket" dialogId="viewDialogModel-guid" customClasses=" fluid-model" closePopup={() => onClose()}>
            {isSuccess && data ? (
                <div className="collapsible-details add-to-cart">
                    <h4 className="d-flex justify-content-between detail-header" data-toggle="collapse" aria-controls="collapseAddcart">
                        <span>Select Color</span>
                    </h4>
                    <MediaListCarousal selectedSKUguid={payLoad.SKUGuid} productMediaList={data?.productskus} showNote={false} handleClick={(val) => handleCarousel(val)} navigation={data?.productskus?.length > 9} slidesPerView={9} />
                    <br />
                    <div className="sku-container">
                        <div className="size">
                            <span className="label minQuant">
                                Quantity:<span className="minText">(Min: {productdata.minquantity})</span>
                                <span className="Inventory">
                                    <span> 0 left</span>
                                </span>
                            </span>
                            <input className="skuQty qty form-control" min="0" placeholder="Enter Quantity" aria-label="Enter Quantity" value={payLoad.Quantity} onChange={(e) => handleQuantity(e.target.value)} />
                            {!!imprintmethoddetails?.length && (
                                <>
                                    <CartImprintMethods imprintmethoddetails={imprintmethoddetails} onChange={(e) => setPayLoad({ ...payLoad, ImprintMethodGuid: e.target.value })} />
                                    <br />
                                    <br />
                                    <CartImprintLocations payLoad={payLoad} selectedImprintmethoddetails={selectedImprintmethoddetails} handleLocation={handleLocation} handleimprintColor={handleimprintColor} />
                                    <br />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="btn btn-primary" onClick={() => validate()}>
                        <i className="sli icon-shopping-bag" />
                        <span>Add To Cart</span>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </DialogBox>
    );
};

export default CartPopUp;

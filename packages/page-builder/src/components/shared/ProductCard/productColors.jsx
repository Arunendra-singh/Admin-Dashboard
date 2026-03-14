import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import React from "react";

const regex = /.*\/|\..*/g;

const ProductColors = ({ swatches = [] }) => {
    const extra = swatches.length > 5 ? swatches.length - 5 : 0;
    return (
        <div className="pro-swatches sw-color">
            {!!swatches.length &&
                swatches.map((swatch, index) => {
                    const title = swatch?.replace(regex, "").replace(/[^a-zA-Z0-9\s]/g, " ");
                    if (index < 5) {
                        return (
                            <div data-toggle="tooltip" className="color" key={swatch + index.toString()} title={title}>
                                <img alt={swatch} src={`${CDN_URL}/${WEBSITE_GUID}/${swatch}`} title={title} />
                            </div>
                        );
                    }
                    return "";
                })}

            {extra ? <span>{` +${extra}`}</span> : ""}
        </div>
    );
};

export default ProductColors;

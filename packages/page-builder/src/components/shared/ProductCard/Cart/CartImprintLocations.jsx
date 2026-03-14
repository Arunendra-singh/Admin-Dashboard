const CartImprintLocations = ({ selectedImprintmethoddetails, payLoad, handleLocation, handleimprintColor }) => (
    <div className="imprint-locations">
        <b>Imprint Locations:</b>
        {selectedImprintmethoddetails?.imprintlocations?.map((location) => {
            const showColor = !!payLoad?.ImprintLocations.length && payLoad?.ImprintLocations.find((_location) => _location.ImprintLocationGuid === location.imprintlocationguid);
            return (
                <>
                    <label htmlFor={location.imprintlocationguid} key={location.imprintlocationguid}>
                        <input label="text" type="checkbox" id={location.imprintlocationguid} value={location.imprintlocationguid} onChange={(e) => handleLocation(location, e.target.checked)} />
                        {location.imprintlocationname}
                    </label>
                    {showColor && (
                        <div className="imprint-colors mt-3">
                            <b>
                                {showColor?.ImprintColors?.length ? `${showColor?.ImprintColors?.length} Color(s) Selected` : "Imprint Location Color"} (Max: {selectedImprintmethoddetails?.maximprintcolors})
                            </b>
                            <div className="color-select-box">
                                {selectedImprintmethoddetails?.imprintcolors.map((color) => (
                                    <label htmlFor={color.imprintcolorguid} key={color.imprintcolorguid}>
                                        <input label="text" type="checkbox" id={color.imprintcolorguid} value={color.imprintcolorguid} onChange={(e) => handleimprintColor(color, location, e.target.checked)} disabled={showColor?.ImprintColors?.length === selectedImprintmethoddetails?.maximprintcolors && !showColor?.ImprintColors?.find((_colorGuid) => _colorGuid === color.imprintcolorguid)} />
                                        {color.imprintcolorname}
                                    </label>
                                ))}
                            </div>
                            <br />
                        </div>
                    )}
                </>
            );
        })}
    </div>
);

export default CartImprintLocations;

const ProductPricing = ({ productsku }) => {
    const getFilteredKeys = (type, Obj) => Object.keys(Obj).filter((key) => key.includes(type) && key.length === type.length + 2 && !!Obj[key]);

    const renderTableHeadings = (prices) => {
        const quantityKeys = getFilteredKeys("quantity", prices?.[0]);
        return (
            <>
                <th className="PriceQuantity">Quantity</th>
                {quantityKeys?.map((quantityKey) => (
                    <th className={quantityKey}> {prices?.[0]?.[quantityKey]}</th>
                ))}
            </>
        );
    };

    const renderTableBody = (prices) =>
        prices?.map((price) => {
            const priceKeys = getFilteredKeys("price", price);
            const discountKeysValuesObj = getFilteredKeys("discountcode", price)
                .map((discount) => price[discount])
                .reduce((acc, curr) => {
                    acc[curr] = (acc[curr] || 0) + 1;
                    return acc;
                }, {});
            const discountCodes = Object.keys(discountKeysValuesObj)
                .map((key) => `${discountKeysValuesObj[key]}${key}`)
                .join("");
            return (
                <tr>
                    <td className="PriceQuantity">Price</td>
                    {priceKeys?.map((priceKey) => (
                        <td className={`Price ${priceKey}`}>
                            <span className="dispPrice">
                                <span className="currencySymbol" />
                                <span className="Productprice numbertocomma">{price?.[priceKey]?.toFixed(2)}</span>
                            </span>
                        </td>
                    ))}
                    <td className="td_discode">{discountCodes}</td>
                </tr>
            );
        });

    const renderNoteText = (prices) => {
        if (prices.find((price) => price.notetext)) {
            return (
                <div className="note-text">
                    <span>Note: </span>
                    {prices?.map((price) => (
                        <span>{price?.notetext}</span>
                    ))}
                </div>
            );
        }
        return "";
    };

    return (
        <div className="product-pricing">
            <div className="title">
                <h2>Pricing</h2>
            </div>
            {productsku?.productprices?.length > 0 && (
                <div className="collapse show " id="collapsePricing">
                    <div className="table-responsive pricingTable ">
                        <table className="table" role="grid" id="detailPriceTable" aria-label="PriceTable">
                            <tbody>
                                <tr role="row">{renderTableHeadings(productsku?.productprices)}</tr>
                                {renderTableBody(productsku?.productprices)}
                            </tbody>
                        </table>
                    </div>

                    {renderNoteText(productsku?.productprices)}
                </div>
            )}
        </div>
    );
};

export default ProductPricing;

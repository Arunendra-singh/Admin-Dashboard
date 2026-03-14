const CartImprintMethods = ({ onChange, imprintmethoddetails }) => (
    <>
        <span className="label">Imprint Methods:</span>
        <select className="imprintMethodList" aria-label="Imprint Methods-1" onChange={(e) => onChange(e)}>
            {imprintmethoddetails.map((method) => (
                <option key={method.imprintmethodguid} value={method.imprintmethodguid}>
                    {method.imprintmethodname}
                </option>
            ))}
        </select>
    </>
);

export default CartImprintMethods;

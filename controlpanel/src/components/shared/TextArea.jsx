const TextArea = ({ fieldId, labelName, placeholder, errroMsg, customProps, required, isDisabled = false, customClass = "", inputType = "text", _maxLength, _minLength, _max, _min }) => (
    <div className={`form-group textarea-${fieldId} ${required ? "required" : ""} input-${inputType}`}>
        <label htmlFor={fieldId} className="label">
            {labelName}
        </label>
        <br />
        <textarea autoComplete="new-password" type={inputType} id={fieldId} className={`form-control ${customClass}`} placeholder={placeholder} {...customProps} disabled={isDisabled} name={fieldId} maxLength={_maxLength || null} minLength={_minLength || null} max={_max || null} min={_min || null} />

        {errroMsg !== undefined && (
            <small className="text-danger" role="alert">
                {errroMsg}
            </small>
        )}
    </div>
);

export default TextArea;

import React from "react";

const Select = ({ fieldId, labelName, placeholder, errroMsg, customProps, required, isDisabled = false, isReadOnly = false, customClass = "", inputType = "select", selectOptions }) => (
    <div className={`form-group input-${fieldId} ${required === true ? "required" : ""} input-${inputType} ${customClass}`}>
        {labelName && (
            <label htmlFor={fieldId} className="label">
                {labelName}
            </label>
        )}

        <select name={fieldId} disabled={isDisabled || isReadOnly} type={inputType} {...customProps} className={`form-control ${customClass}`} id={fieldId}>
            <option data-json="{}" value="" className="disabled-value">
                {placeholder}
            </option>
            {selectOptions?.map((option) => (
                <option data-json={JSON.stringify(option)} key={option.name} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>

        {selectOptions?.length > 0 && errroMsg !== undefined && (
            <small className="text-danger" role="alert">
                {errroMsg}
            </small>
        )}
    </div>
);

export default React.memo(Select);

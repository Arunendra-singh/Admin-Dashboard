import { OtpInput } from "common/components";

const Input = ({ fieldId, labelName, placeholder, errroMsg, customProps, required, isDisabled = false, isReadOnly = false, customClass = "", inputType = "text", otpInputType = "text", _maxLength, _minLength, _max, _min, setValue, custProps }) => (
    <div className={`form-group input-${fieldId} ${custProps} ${required === true ? "required" : ""} input-${inputType}`}>
        {labelName && (
            <label htmlFor={fieldId} className="label">
                {labelName}
            </label>
        )}

        <input autoComplete="new-password" type={inputType === "otp" ? "hidden" : inputType} id={fieldId} className={`form-control ${customClass}`} placeholder={placeholder} {...customProps} disabled={isDisabled} name={fieldId} maxLength={_maxLength || null} minLength={_minLength || null} max={_max || null} min={_min || null} readOnly={isReadOnly} />

        {inputType === "otp" && (
            <OtpInput
                inputLength={_maxLength}
                inputType={otpInputType}
                onUpdate={(value) => {
                    document.getElementById(fieldId).value = value;
                    setValue(fieldId, value);
                }}
            />
        )}

        {errroMsg !== undefined && (
            <small className="text-danger" role="alert">
                {errroMsg}
            </small>
        )}
    </div>
);

export default Input;

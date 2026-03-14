/**
 * Author: Rohan Gaikwad
 * Date: 2023-03-23
 * Pending: validation, paste otp
 */
import React, { useEffect, useRef } from "react";

type IOTPInputParams = {
    id?: string;
    inputLength?: number;
    placeholder?: string;
    autofocus?: boolean;
    disabled?: boolean;
    inputType?: "text" | "number" | "password";
    allowedChars?: string;
    onUpdate?: (otpValue: string) => void;
};

const nums = "0123456789";
const alphaNums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const OtpInput = ({ id = `otp_${new Date().getTime()}`, inputLength = 4, onUpdate = (otpValue) => {}, placeholder = "", autofocus = false, disabled = false, inputType = "number", allowedChars = inputType === "number" ? nums : alphaNums }: IOTPInputParams) => {
    const value = useRef(new Array(inputLength).fill(""));

    useEffect(() => {
        if (autofocus) {
            const otpInputElem = document.querySelector(`#${id} input`) as HTMLInputElement;
            otpInputElem.focus();
        }
    }, []);

    const focusHandler = (evt: React.FocusEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        target.select();
    };

    const keyUpHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = evt;
        const _value = [...value.current];
        const target = evt.target as HTMLInputElement;
        const parent = target.parentElement as HTMLDivElement;
        const index = [...parent.children].indexOf(target);

        const nextSibling = target.nextElementSibling as HTMLInputElement;
        const prevSibling = target.previousElementSibling as HTMLInputElement;

        const chars = allowedChars.split("");
        const _key = key.toLowerCase();

        let curValue = target.value;
        if (chars.includes(key)) {
            curValue = key;
        } else if (_key === "backspace" || _key === "delete") {
            curValue = "";
        }

        if (chars.includes(key) && index < inputLength - 1 && nextSibling !== null) {
            nextSibling.focus();
        } else if (_key === "backspace" && index > 0 && prevSibling !== null) {
            prevSibling.focus();
        } else if (_key === "arrowleft" && index > 0) {
            prevSibling.focus();
        } else if (_key === "arrowright" && index < inputLength - 1) {
            nextSibling.focus();
        }

        target.value = _value[index] = curValue;
        value.current = _value;

        onUpdate(_value.join(""));
    };

    return (
        <div className="otp-input" id={id}>
            {value.current.map((val, i) => (
                <input key={i} maxLength={1} placeholder={placeholder} defaultValue={val} type={inputType === "password" ? inputType : "text"} size={1} onFocus={focusHandler} onKeyUp={keyUpHandler} disabled={disabled} />
            ))}
        </div>
    );
};

export default OtpInput;

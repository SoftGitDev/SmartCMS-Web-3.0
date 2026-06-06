import React, { ChangeEventHandler } from "react";
// import './TextField.css'

interface props {
    label?: string;
    name?: string;
    id?: string;
    required?: boolean;
    className?: string;
    size?: string;
    placeholder?: string;
    style?: {};
    width?: string;
    value?: any;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown?: any;
    readOnly?: boolean;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    tabIndex?: any;
    rows?:number
}

const TextArea = ({ label, name, id, required, size, placeholder, style, width, value, onBlur, onChange, readOnly, maxLength, minLength, onKeyDown, disabled, tabIndex ,rows}: props) => {

    return (
        <div className="textfield textArea" style={{ width: width }}>
            <div className="material-textfield ">
                {label && (
                    <label htmlFor={id} className={`label-14 ps-1 text-md ${required ? "required" : ""}`}> {label}</label>
                )}
                <textarea
                    placeholder={placeholder ? placeholder : ""}
                    className={` form-control ${size === "small"
                        ? `form-sm`
                        : `form-normal`
                        } ${label ? "labelActive" : "labelDeactive"
                        }`}
                    style={{ ...style, width: width, }}
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={rows || 5}
                    tabIndex={tabIndex}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    onKeyDown={onKeyDown}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete="off"
                />

            </div>
        </div>
    )
};

export default TextArea;

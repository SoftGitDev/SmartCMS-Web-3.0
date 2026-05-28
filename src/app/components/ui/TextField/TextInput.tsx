import React, { ChangeEventHandler, useState } from "react";
import './Textfield.css';
import { Form, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";

interface props {
  label?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  IconProp?: any;
  className?: string;
  size?: "sm" | "lg" | undefined;
  placeholder?: string;
  style?: {};
  width?: string;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: any;
  max?: any;
  multiline?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  step?: number;
  autoFocus?: boolean;
  onInput?: any;
  EyeIconProp?: any;
  suffix?: React.ReactNode;
  onFocus?: any;
  inputGroupLeft?: any;
  inputGroupRight?: any;
  ref?: any;
  accept?: string;
  labelIcon?: React.ReactNode;
}

const Textfield = ({
  label,
  type,
  name,
  id,
  required,
  onInput,
  IconProp,
  EyeIconProp,
  size,
  placeholder,
  style,
  width,
  value,
  onBlur,
  onChange,
  readOnly,
  maxLength,
  minLength,
  min,
  max,
  onKeyDown,
  onKeyUp,
  multiline,
  disabled,
  tabIndex,
  step,
  autoFocus,
  suffix,
  onFocus,
  inputGroupLeft,
  inputGroupRight,
  ref,
  accept,
  labelIcon
}: props) => {

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type || "text";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="textfield" style={{ width: width }}>
      <div className="material-textfield">
        <label className={`input-label text-xs d-flex align-items-center gap-1 ${required ? 'required' : ''} ${labelIcon ? 'mb-2' : ''}`} style={{ fontSize: "12px", marginBottom: "2px" }}>
          {labelIcon && (
            <span className="icon-wrapper-xs">
              {labelIcon}
            </span>
          )}
          {label}
        </label>

        <InputGroup>
          {inputGroupLeft}
          <Form.Control
            placeholder={placeholder ? placeholder : ""}
            type={inputType}
            className={`form-control customShadow ${IconProp ? "paddingforIcon-sm" : ""} ${isPasswordField ? "paddingforIcon-eye" : ""} ${type === "file" ? "input-file" : ""}`}
            style={{ ...style, height: "40px" }}
            size={size}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            tabIndex={tabIndex}
            min={min}
            max={max}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            maxLength={maxLength}
            minLength={minLength}
            multiple={multiline}
            disabled={disabled}
            autoComplete="off"
            step={step}
            onInput={onInput}
            onFocus={onFocus}
            ref={ref}
            accept={accept}
          />
          {inputGroupRight}

          {suffix && <InputGroup.Text className="subfix-box"> {suffix} </InputGroup.Text>}
        </InputGroup>

        {IconProp && (
          <div className="form-icon ms-2">
            <IconProp className="text-muted" style={{ width: "16px", height: "16px" }} />
          </div>
        )}

        {isPasswordField && (
          <div
            className="form-icon-eye"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <EyeOff className="text-muted" style={{ width: "16px", height: "16px" }} />
            ) : (
              <Eye className="text-muted" style={{ width: "16px", height: "16px" }} />
            )}
          </div>
        )}

        {EyeIconProp && !isPasswordField && (
          <div className="form-icon-eye">
            <EyeIconProp style={{ width: "16px", height: "16px" }} />
          </div>
        )}
      </div>
    </div>
  )
};

export default Textfield;
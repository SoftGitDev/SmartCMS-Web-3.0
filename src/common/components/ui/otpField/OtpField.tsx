import React, { useRef } from "react";
import './Otp.css'

interface OtpFieldProps {
  name?: string;
  otpValues?: any;
  setOtpValues?: any;
  disable?: boolean;
}
const OtpField = ({ name, otpValues, setOtpValues, disable, }: OtpFieldProps) => {
  const otpFieldsRef = useRef<any[]>([]);
  const handleInput = (index: number, value: any) => {
    if (value.length > 1) {
      return;
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    const regex = /^[0-9]*[.,]?[0-9]*$/;

    if (!regex.test(newOtpValues[index].toString())) {
      return;
    } else {
      setOtpValues(newOtpValues);
    };
    if (value.length === 1 && index < otpValues.length - 1 && value !== '') {
      otpFieldsRef.current[index + 1].focus();
    }
  };


  const handleBackspace = (index: number) => {
    if (otpValues[index] !== "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1].focus();
    }
  };


  const handlePaste = (e: any) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!paste) return;

    const pasteArray = paste.split('').slice(0, 6);
    const newOtp = [...otpValues];
    pasteArray.forEach((char: any, idx: number) => {
      newOtp[idx] = char;
    });
    setOtpValues(newOtp);

    // Focus last filled input
    const lastIndex = pasteArray.length - 1;
    if (otpFieldsRef.current[lastIndex]) {
      otpFieldsRef.current[lastIndex].focus();
    }

    e.preventDefault();
  };

  return (
    <div className="otp-container d-flex p-4 justify-content-center" onPaste={handlePaste}>
      {otpValues.map((value: any, index: number) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="otp-input"
          inputMode="numeric"
          disabled={disable}
          name={name}
          autoFocus={index === 0}
          // value={value}
          value={value.replace(/^(\d{1})$/, "*")}
          onChange={(e: any) => {
            handleInput(index, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(index);
            }
          }}
          ref={(ref: any) => {
            otpFieldsRef.current[index] = ref;
          }}
        />
      )
      )}
    </div>
  );
};

export default OtpField;

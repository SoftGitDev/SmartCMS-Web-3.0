import React, { useState, useEffect, useCallback, Suspense } from "react";
import "./Otp.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginLayout from "../layout/Layout";
import { Button } from "react-bootstrap";
import * as urls from '../../../utils/url';
import { SweetAlerts } from "../../../utils/sweetAlert";
import { encData, setLocalToken, setLocalUserData } from "../../../utils/common";
import { Loader } from "lucide-react";
import toastNotify from "../../../utils/tostNotify";
import LoaderUI from "../../../components/loader/Loader";
import { apiRequest } from "../../../utils/apiRequest";
import { autoFocusOnOtp, convertMinutesSeconds } from "../../../utils/Helper";
import OtpField from "../../../components/ui/otpField/OtpField";

const OtpVerificationForm = () => {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();
    const initialTime = 120;
    const { convertedminutes, convertedseconds } = convertMinutesSeconds(initialTime);
    const [minutes, setMinutes] = useState(convertedminutes);
    const [seconds, setSeconds] = useState(convertedseconds);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const location = useLocation();
    const state = location.state;

    const joinOTP = otpValues.join();
    const OTPValues = joinOTP.replace(/,/g, "");


    const howManyShowWordInEmail = state?.email && state?.email?.split("@")[0].length > 3 ? 3 : 1;
    const emailSplitLenght = state?.email ? state?.email?.split("@")[0].length - (state?.email?.split("@")[0].length - howManyShowWordInEmail) : 0;


    // Check Session and if user reload OTP screen than navigate to login
    // useEffect(() => {
    //     var reloadflag = sessionStorage.getItem("reloadflag");
    //     if (reloadflag === "1" || state === null) {
    //         navigate("/");
    //     } else {
    //         sessionStorage.setItem("reloadflag", "1");
    //     }
    // }, [])

    useEffect(() => {
        if (state?.flag === "G") {
            return;
        }

        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prev:any) => prev - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                } else {
                    setMinutes((prev:any) => prev - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);


    // Google Code Verify to OTP
    const handleVerifyOTP = useCallback(async () => {

        try {
            setIsLoading(true);

            const payload = {
                otp: encData(OTPValues),
                bankCd: encData(state.bankCode),
                userId: encData(state.userId),
                sessionId: state.sessionId,
            };

            const result = await apiRequest("POST", urls.otpVerify, payload);

            if (result.status === "200" && result.success) {
                const { token, tokenExpiry, refreshToken, refreshTokenExpiry, ...response } = result.response;
                const jwtToken = {
                    token: token || "",
                    tokenExpiry: tokenExpiry || "",
                    refreshToken: refreshToken || "",
                    refreshTokenExpiry: refreshTokenExpiry || "",
                };

                setLocalUserData({ ...response, loginFlag: "Y" });
                setLocalToken(jwtToken);
                navigate("/dashboard");
            } else {
                result.status === "401" && navigate("/");
                setOtpValues(["", "", "", "", "", ""]);
                SweetAlerts("Error !", result.message, 'error');
            }
        } catch (error) {
            setOtpValues(["", "", "", "", "", ""]);
            autoFocusOnOtp("OTP0");
        } finally {
            setIsLoading(false);
        }
    }, [OTPValues, navigate, state]);


    // Forgot Password OTP Verify with new password
    const forgotPasswordOTPVerify = async (values: any, { resetForm }: any) => {
        try {
            setIsLoading(true);

            // Validate OTP is entered
            if (OTPValues.length !== 6) {
                toastNotify("Please enter complete OTP", "error");
                return;
            }

            const payload = {
                bankCode: encData(state?.bankCode) || "",
                userId: encData(state?.userId) || "",
                sessionId: state?.sessionId || "",
                otpCode: encData(OTPValues),
                password: encData(values?.newPass), // Send the new password
            };

            const config = {};
            const result = await apiRequest('POST', urls.forgetPasswordVerify, payload, config);

            if (result.status === "200" && result.success) {
                // Clear OTP values
                setOtpValues(["", "", "", "", "", ""]);
                // Navigate to login
                navigate("/");
            } else {
                SweetAlerts("Error !", result.message, 'error');
                setOtpValues(["", "", "", "", "", ""]);
                autoFocusOnOtp("OTP0");
                resetForm();
            }
        } catch (error: any) {
            setOtpValues(["", "", "", "", "", ""]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const validateOTP = () => {
            if (OTPValues.length < 6) {
                return false;
            } else if (OTPValues.length === 6 && state?.flag !== "FGT") {
                // This worked on new generate G_AUTH
                // handleVerifyOTP();
                navigate("/dashboard");

            } else if (OTPValues.length === 6 && state?.flag === "FGT") {
                // This worked on new generate G_AUTH
                // handleVerifyOTP();
                navigate("/reserPwd");

            }
        };
        validateOTP();
    }, [OTPValues.length, handleVerifyOTP, state?.Flag]);



    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <LoginLayout
                    title={
                        <>
                            {(state?.flag === "G" &&
                                <h5 className="text-center fw-semibold pt-3 px-4 mx-4">Google authentication code</h5>
                            ) || ((state?.flag === "M" || state?.flag === "E") &&
                                <h5 className="text-center fw-semibold pt-3 px-4 mx-4">OTP Verification</h5>
                                )}


                            {(state?.flag === "M" || state?.flag === "E") &&
                                <p className="text-center text-sm mt-0 pt-2 px-4 mx-2">  {
                                    ((state?.flag === "M") && state?.Message) ||
                                    ((state?.flag === "E") && `OTP has been send on your registered email id ${state?.email !== "" ? Array(state?.email?.split("@")[0].length - howManyShowWordInEmail).fill("*").toString().replaceAll(",", "") : ""}${state?.email !== "" ? state?.email?.substr(state?.email?.split("@")[0].length - emailSplitLenght) : ""}`)} </p>
                            }

                            {(state?.flag === "G" &&
                                <p className="text-center text-sm mt-0 pt-2 px-4 mx-2">
                                    Kindly authenticate yourself by entering 6-digit
                                    google authentication code. (Open Google
                                    Authenticator app to get 6-digit authentication code
                                    to the login.)
                                </p>
                            )}

                            {state?.flag === "FGT" && OTPValues.length !== 6 && (
                                <>
                                    <h5 className="text-center fw-semibold pt-3 mb-4 px-4 mx-4">
                                        OTP Verification
                                    </h5>

                                    <p className="text-center text-sm mb-0 text-muted px-3">
                                        {state?.Message ||
                                            "A One-Time Password (OTP) has been sent to your registered mobile number ending with XXXX8890. Please enter the OTP to continue resetting your password."}
                                    </p>
                                </>
                            )}
                        </>
                    }
                >

                    <div className="otp-input-container m-0">
                        <OtpField
                            name="OTP"
                            otpValues={otpValues}
                            setOtpValues={setOtpValues}
                        />
                    </div>

                    {state?.authStatus !== "N" && (
                        <div className="d-flex justify-content-center mt-0 mb-3 text-md">
                            {IsLoading && (
                                <>
                                    <Loader size={18} className='bx-spin text-lg me-2' /> Loading...
                                </>
                            )}
                        </div>
                    )}

                    {state?.flag !== "G" &&
                        <div className="otp-footer tex-center mt-1">
                            <div className="otp-timer text-center">
                                {(seconds > 0 || minutes > 0) ? (
                                    <p className="text-sm">
                                        You can resend OTP after this{" "}
                                        {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                ) : (
                                    <Button variant="transparent" className="text-primary text-xs">
                                        Resend OTP
                                    </Button>
                                )}
                            </div>
                        </div>
                    }

                    {/* {OTPValues.length === 6 &&
                        <div className="px-3">
                            {state?.flag === "FGT" && (
                                <Formik
                                    initialValues={{
                                        newPass: "",
                                        confirmPass: "",
                                    }}
                                    validationSchema={Yup.object({
                                        newPass: Yup.string()
                                            .min(8, 'Password must be at least 8 characters')
                                            .required('New Password is required')
                                            .matches(pwd, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long').test(
                                                'no-sequence',
                                                'Sequential numbers (e.g., 12, 123, 09, 098) are not allowed',
                                                (value) => {
                                                    if (!value) return true;

                                                    const isSequential = (str: string) => {
                                                        if (str.length < 2) return false;

                                                        const digits = str.split('').map(Number);

                                                        // Get the direction: +1 or -1 (mod 10 to handle circular like 0→9→8)
                                                        const diff = ((digits[1] - digits[0]) + 10) % 10;

                                                        // Only valid sequential diffs are 1 (ascending) or 9 (descending circular = -1 mod 10)
                                                        if (diff !== 1 && diff !== 9) return false;

                                                        for (let i = 2; i < digits.length; i++) {
                                                            if (((digits[i] - digits[i - 1]) + 10) % 10 !== diff) return false;
                                                        }
                                                        return true;
                                                    };

                                                    // Extract contiguous digit groups from password
                                                    const digitGroups = value.match(/\d+/g);
                                                    if (!digitGroups) return true;

                                                    for (const group of digitGroups) {
                                                        if (isSequential(group)) return false;
                                                    }

                                                    return true;
                                                }
                                            ),
                                        confirmPass: Yup.string()
                                            .min(8, 'Password must be at least 8 characters')
                                            .required('Confirm Password is required')
                                            .oneOf([Yup.ref('newPass')], 'Passwords must match'),
                                    })}
                                    onSubmit={forgotPasswordOTPVerify}
                                >
                                    {({ values, handleChange, handleBlur, handleSubmit }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <div>
                                                    <Textfield
                                                        label="New Password"
                                                        placeholder="Enter New Password"
                                                        required
                                                        name="newPass"
                                                        tabIndex={7}
                                                        maxLength={32}
                                                        type="password"
                                                        value={values.newPass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="newPass" className='ErrorMessage' component="div" />
                                                </div>
                                                <div className="mt-2">
                                                    <Textfield
                                                        label="Confirm Password"
                                                        placeholder="Enter Confirm Password"
                                                        required
                                                        type="password"
                                                        tabIndex={8}
                                                        maxLength={32}
                                                        name="confirmPass"
                                                        value={values.confirmPass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="confirmPass" className='ErrorMessage' component="div" />
                                                </div>
                                            </div>
                                            <Button
                                                // type="submit"
                                                variant="primary"
                                                tabIndex={9}
                                                onClick={() => navigate('/')}
                                                className="w-100 mt-3 mb-2"
                                                disabled={IsLoading || OTPValues.length !== 6}
                                            >
                                                {!IsLoading ? "Reset Password" : (
                                                    <>
                                                        <Loader className="bx-spin text-white text-lg me-2" />
                                                        Processing...
                                                    </>
                                                )}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    } */}

                    <div className="text-center text-primary text-sm mt-2 customeLink">
                        <Link to="/" className='ms-1'>
                            Back to login
                        </Link>
                    </div>
                </LoginLayout>
            </Suspense>

        </>
    );
};

export default OtpVerificationForm;
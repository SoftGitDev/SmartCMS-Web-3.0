import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import "../../../assets/styles/Otp.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as urls from '../../../services/axios/url';
import { Loader } from "lucide-react";
import { apiRequest } from "../../../services/api/apiRequest";
import { SweetAlerts } from "../../../services/notification/sweetAlert";
import LoaderUI from "../../../common/components/feedBack/loader/Loader";
import OtpField from "../../../common/components/ui/otpField/OtpField";
import { autoFocusOnOtp, convertMinutesSeconds } from "../../../services/storage/Helper";
import { encData, setLocalToken, setLocalUserData } from "../../../services/storage/common";

const LoginLayout = lazy(() => import('../components/Layout'))


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
                setSeconds((prev: any) => prev - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                } else {
                    setMinutes((prev: any) => prev - 1);
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
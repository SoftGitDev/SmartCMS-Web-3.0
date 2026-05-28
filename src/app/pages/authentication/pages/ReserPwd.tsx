import React, { lazy, Suspense, useState } from 'react'
import { Button } from "react-bootstrap";
import { Loader } from "lucide-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { encData } from '../../../utils/common';
import * as urls from '../../../utils/url'
import { useLocation, useNavigate } from 'react-router-dom';
import { autoFocusOnOtp } from '../../../utils/Helper';
import { apiRequest } from '../../../utils/apiRequest';
import { SweetAlerts } from '../../../utils/sweetAlert';
import LoaderUI from '../../../components/loader/Loader';
import Textfield from '../../../components/ui/TextField/TextInput';

const LoginLayout = lazy(() => import("../layout/Layout"));

const ReserPwd = () => {
    const pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const location = useLocation();
    const state = location.state;

    const joinOTP = otpValues.join();
    const OTPValues = joinOTP.replace(/,/g, "");


    // Forgot Password OTP Verify with new password
    const forgotPasswordOTPVerify = async (values: any, { resetForm }: any) => {
        try {
            setIsLoading(true);

            // Validate OTP is entered
            // if (OTPValues.length !== 6) {
            //     toastNotify("Please enter complete OTP", "error");
            //     return;
            // }

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

    return (
        <Suspense fallback={<LoaderUI />}>
            <LoginLayout
                title="Reset Your Password"
                Note="Set a new secure password to protect your CMS account and activities."
            >
                <div >
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
                                    className="w-100 mt-3 mb-0 mt-4"
                                    disabled={IsLoading}
                                >
                                    {!IsLoading ? "Submit" : (
                                        <>
                                            <Loader className="bx-spin text-white text-lg me-2" />
                                            Processing...
                                        </>
                                    )}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </LoginLayout>
        </Suspense>
    )
}

export default ReserPwd

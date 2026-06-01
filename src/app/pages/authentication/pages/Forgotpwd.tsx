import React, { lazy, Suspense, useCallback, useState } from 'react'
import LoaderUI from '../../../components/loader/Loader'
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Building2, Loader, Phone, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiRequest';
import { SweetAlerts } from '../../../utils/sweetAlert';
import { encData } from '../../../utils/common';
import * as urls from '../../../utils/url'
import Textfield from '../../../components/ui/TextField/TextInput';


const LoginLayout = lazy(() => import("../layout/Layout"));

const Forgotpwd = () => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const navigate = useNavigate();


    const forgotPassword = useCallback(async (val: any, resetForm: any) => {
        try {
            setIsLoader(true);

            const payload = {
                mobileNo: encData(val.mobileNo),
                userId: encData(val.userName),
                // organizationCd: process.env.REACT_APP_PORTAL_PREMISE_TYPE === "S" ? encData(val.organizationCd) : encData(bankLogoDetails.organizationCd),
            };

            console.log("payload", val.mobileNo);
            // console.log("payload", process.env.REACT_APP_PORTAL_PREMISE_TYPE === "S" ? val.organizationCd : bankLogoDetails.organizationCd);

            const config = {};
            const result = await apiRequest('POST', urls.forgetPassword, payload, config)
            if (result.status === '204') {
                const response = result.response
                navigate("/otp", { state: { ...response, flag: 'FGT', message: result.message } });
            } else {
                SweetAlerts("Forgot Password Failed", result.message, "error");
            };
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    }, []);

    return (
        <Suspense fallback={<LoaderUI />}>
            {/* <LoginLayout title="Forgot Password !" Note="Please enter your details !" > */}
            <LoginLayout
                Headertitle='Forgot'
                title="Forgot Password"
                Note="Verify your account using OTP to reset your password securely."
            >
                <Formik
                    initialValues={{
                        organizationCd: "",
                        userName: "",
                        mobileNo: "",
                    }}
                    validationSchema={Yup.object().shape({
                        organizationCd: Yup.string().required("Clint ID is required"),
                        userName: Yup.string().required("Username is required"),
                        mobileNo: Yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number").required("Mobile number is required"),
                    })}
                    onSubmit={forgotPassword}
                >
                    {({ values, handleSubmit, handleBlur, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            {/* {envFlag === "S" && */}
                            {/* <div className="mb-3">
                                <Textfield
                                    label="Clint ID"
                                    name="organizationCd"
                                    id="organizationCd"
                                    placeholder="Enter Clint ID"
                                    maxLength={4}
                                    tabIndex={1}
                                    IconProp={Building2}
                                    value={values.organizationCd}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;
                                        const regex = /^[0-9,\\]*$/;
                                        if (regex.test(value)) {
                                            setFieldValue("organizationCd", value.trim());
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    required
                                />
                                <ErrorMessage name="organizationCd" component="div" className="ErrorMessage" />
                            </div> */}
                            {/* } */}

                            <div className="mb-3">
                                <Textfield
                                    label="Username"
                                    name="userName"
                                    id="userName"
                                    placeholder="Username"
                                    maxLength={30}
                                    tabIndex={2}
                                    required
                                    value={values.userName}
                                    onChange={(e: any) => setFieldValue("userName", e.target.value.trim())}
                                    onBlur={handleBlur}
                                    // onChange={handleChange}
                                    IconProp={UserRound}
                                />
                                <ErrorMessage name="userName" component="div" className="ErrorMessage" />
                            </div>

                            <div className="mb-3">
                                <Textfield
                                    label="Mobile No"
                                    name="mobileNo"
                                    type="text"
                                    id="mobileNo"
                                    size="sm"
                                    placeholder="Please enter Mobile No."
                                    tabIndex={3}
                                    maxLength={10}
                                    required
                                    value={values.mobileNo}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]*[.,-]?[0-9]*$/;
                                        if (regex.test(value.toString())) {
                                            setFieldValue("mobileNo", value.trim());
                                        }
                                    }}
                                    onBlur={(e: any) => {
                                        handleBlur(e);
                                    }}
                                    IconProp={Phone}
                                />
                                <ErrorMessage name="mobileNo" component="div" className="ErrorMessage" />
                            </div>

                            {/* Back to Login Link */}
                            <div className="d-flex mt-2 justify-content-end customeLink">
                                <Link to="/" className="text-end btn-secondary me-1" style={{ fontSize: "12px" }} > Back to Login </Link>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4">
                                <Button onClick={() =>
                                    navigate("/otp", { state: { flag: 'FGT', message: 'k' } })

                                } variant="primary" disabled={isLoader} className="px-3 py-2 w-100 " type="submit">{!isLoader ? <>Forget Password</> : <><Loader size={16} className="bx-spin text-white text-lg me-1" /> Loading...</>}</Button>
                            </div>

                        </Form>
                    )}
                </Formik>
                {/* </Layout> */}
            </LoginLayout>
        </Suspense>
    )
}

export default Forgotpwd

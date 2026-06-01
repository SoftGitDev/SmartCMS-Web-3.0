// Purpose: Login Component
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish  | Created the Login component


import React, { lazy, Suspense, useState } from 'react';
import { Building2, Loader, LockKeyhole, LogIn, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../../components/ui/TextField/TextInput';
import LoaderUI from '../../../components/loader/Loader';

const LoginLayout = lazy(() => import("../layout/Layout"));

/** Shape of the login form values */
interface LoginFormValues {
    organisationCd: string;
    userName: string;
    password: string;
}



const loginValidationSchema = Yup.object().shape({
    organisationCd: Yup.string().required("Clint ID is required"),
    userName: Yup.string()
        .max(30, "Maximum 30 characters allowed")
        .required("Username is required"),
    password: Yup.string()
        .max(30, "Maximum 30 characters allowed")
        .required("Password is required"),
});


const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const userLogin = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            setIsLoading(true);
            console.log('Login values:', values);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
            actions.setSubmitting(false);
        }
    };

    return (
        <Suspense fallback={<LoaderUI />}>
            {/* <LoginLayout title="Login" Note="Please enter your credentials to sign in !"> */}
            <LoginLayout
                Headertitle='Login'
                title="Welcome to Complaint Management System"
                Note="Manage complaints, track tickets, and streamline support operations securely."
            >
                <Formik
                    initialValues={{
                        organisationCd: process.env.REACT_APP_ENV === "U" ? "0258" : '',
                        userName: process.env.REACT_APP_ENV === "U" ? "softtech" : '',
                        password: process.env.REACT_APP_ENV === "U" ? "Admin@1232" : '',
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={userLogin}
                >
                    {({ handleChange, values, handleBlur, setFieldValue }) => (
                        <FormikForm>

                            {/* <div className="mb-3">
                                <Textfield
                                    label="Clint ID"
                                    name="organisationCd"
                                    id="organisationCd"
                                    placeholder=" Enter Clint ID"
                                    maxLength={4}
                                    tabIndex={1}
                                    IconProp={Building2}
                                    value={values.organisationCd}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { value } = e.target;
                                        const upperValue = value.toUpperCase();
                                        const regex = /^[A-Z0-9]*$/;
                                        if (regex.test(upperValue)) {
                                            setFieldValue("organisationCd", upperValue.trim());
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    required
                                />
                                <ErrorMessage name="organisationCd" component="div" className="ErrorMessage" />
                            </div> */}

                            <div className="mb-3">
                                <Textfield
                                    label="Username"
                                    name="userName"
                                    id="userName"
                                    placeholder="Username"
                                    maxLength={30}
                                    tabIndex={2}
                                    IconProp={UserRound}
                                    value={values.userName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                <ErrorMessage name="userName" component="div" className="ErrorMessage" />
                            </div>

                            <div className="mb-3">
                                <Textfield
                                    label="Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    tabIndex={3}
                                    maxLength={30}
                                    IconProp={LockKeyhole}
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                />
                                <ErrorMessage name="password" component="div" className="ErrorMessage" />
                            </div>


                            <div className="d-flex mt-2 customeLink justify-content-end">
                                <Link
                                    to="/forgotpwd"
                                    className="text-end btn-secondary me-1 text-md"
                                >
                                    Forgot password
                                </Link>
                            </div>

                            {/* ── Submit Button ───*/}
                            <div className="mt-4">
                                <Button
                                    variant='primary'
                                    type='submit'
                                    // Disable button while API call is in progress
                                    disabled={isLoading}
                                    className="ms-auto w-100"
                                    onClick={() => navigate("/otp", { state: { flag: 'G' } })}
                                >
                                    {!isLoading
                                        ? <><LogIn size={16} className='me-1' /> Login</>
                                        : <><Loader size={16} className="bx-spin text-white text-lg me-1" /> Loading...</>
                                    }
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </LoginLayout>
        </Suspense>
    );
};

export default Login;
import { CheckCheck, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { Link } from 'react-router-dom';
import SMSImg from '../../../assets/images/commone/text-message.png'
import gAuth from "../../../assets/images/commone/google-auth.png";
import dummyQr from "../../../assets/images/commone/google-auth-qr.png";
import appstore from "../../../assets/images/commone/appstore.jpg";
import bothSMSMail from '../../../assets/images/commone/text-message.png'
import googlePlaystore from "../../../assets/images/commone/googleplaystore.png";
import * as Yup from "yup";
import OtpField from '../../../common/components/ui/otpField/OtpField';
import Textfield from '../../../common/components/ui/TextField/TextInput';

interface mfaProps {
    userData?: any | null,
    updateUserProfile?: (data: any, flag: "2") => void
}


const Mfa: React.FC<mfaProps> = ({ userData, updateUserProfile }) => {

    const [authenticationType, setAuthentiacation] = useState<string>("GOOGLE_AUTHENTICATION");
    const [qrcode, setQrcode] = useState<any>({});

    const [gAuthStatus, setGAuthStatus] = useState<string>(""); // this state store true or false for G-Auth verificartion, this help to show OTP inputs 
    const [gAuthShow, setGAuthShow] = useState<boolean>(false); // this state store true or false for G-Auth verificartion, this help to show OTP inputs when Re-Generate to QR code and Keys 
    const [isLoader, setIsLoader] = useState<{ generateNew: boolean, verify: boolean }>({ generateNew: false, verify: false });
    const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
    const joinOTP = otpValues.join();
    const OTPValues = joinOTP.replace(/,/g, "").toString();

    return (
        <div>
            <Row className='mt-2 pb-4'>
                <Col sm={3} onClick={() => { setAuthentiacation("OTP_MOBILE"); authenticationType !== "OTP_MOBILE" && updateUserProfile?.({ mfaType: "OTP_MOBILE" }, "2") }}>
                    <div className={`twoFauthOption w-100 px-4 ${authenticationType === "OTP_MOBILE" ? "actice" : ""}`} >
                        <img src={SMSImg} alt="sms-icon" style={{ width: 40 }} />
                        <div>
                            <div>Through SMS</div>
                        </div>
                        {authenticationType === "OTP_MOBILE" &&
                            <CheckCheck className='ms-auto text-primary' style={{ fontSize: 30 }} />
                        }
                    </div>
                </Col>

                <Col sm={3} onClick={() => { setAuthentiacation("OTP_EMAIL"); authenticationType !== "OTP_EMAIL" && updateUserProfile?.({ mfaType: "OTP_EMAIL" }, "2") }}>
                    <div className={`twoFauthOption w-100 px-4 ${authenticationType === "OTP_EMAIL" ? "actice" : ""}`}>
                        <img src={SMSImg} alt="sms-icon" style={{ width: 40 }} />
                        <div>
                            <div>Through Email</div>
                        </div>
                        {authenticationType === "OTP_EMAIL" &&
                            <CheckCheck className='ms-auto text-primary' style={{ fontSize: 30 }} />
                        }
                    </div>
                </Col>

                <Col sm={3} onClick={() => { setAuthentiacation("GOOGLE_AUTHENTICATION"); authenticationType !== "GOOGLE_AUTHENTICATION" && updateUserProfile?.({ mfaType: "GOOGLE_AUTHENTICATION" }, "2") }} className='mt-sm-0 mt-3'>
                    <div className={`twoFauthOption w-100 px-4 ${authenticationType === "GOOGLE_AUTHENTICATION" ? "actice" : ""}`} >
                        <img src={gAuth} alt="sms-icon" style={{ width: 40 }} />
                        <div>
                            <div>Google Authentication</div>
                        </div>
                        {authenticationType === "GOOGLE_AUTHENTICATION" &&
                            <CheckCheck className='ms-auto text-primary' style={{ fontSize: 30 }} />
                        }
                    </div>
                </Col>

                <Col sm={3} className='mt-sm-0 mt-3' onClick={() => { setAuthentiacation("OTP_BOTH"); }}>
                    <div className={`twoFauthOption w-100 ${authenticationType === "OTP_BOTH" ? "actice" : ""}`} >
                        <img src={bothSMSMail} alt="sms-icon" style={{ width: 40 }} />
                        <div>
                            <div>OTP Send On Your Both Registers</div>
                        </div>
                        {authenticationType === "OTP_BOTH" &&
                            <CheckCheck className='ms-auto text-primary' style={{ fontSize: 30 }} />
                        }
                    </div>
                </Col>
            </Row>

            {authenticationType === "GOOGLE_AUTHENTICATION" ? <>
                <fieldset className="border rounded-3 p-3  mt-2">
                    <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">Google Authenticator</legend>
                    <Row>
                        <Col md={6}>
                            <div>
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <img src={qrcode.QrCode ? `data:image/png;base64,${qrcode.QrCode}` : dummyQr} alt="QR-code" style={{ width: 150 }} />
                                    {qrcode.Key &&
                                        <div className='text-sm key-bg'>Key : {qrcode.Key}</div>
                                    }
                                </div>
                                <div className='text-sm text-slate-500 mt-2 text-center'>Scan this QR using Google Authentication</div>
                            </div>
                        </Col>


                        <Col md={6} className='mt-md-0 mt-3'>

                            {gAuthStatus === "S" ?
                                <>
                                    <div className='text-sm text-slate-500 mb-2 text-center'>Access your Google Authenticator app and input the 6-digit code provided to finalize the login procedure.</div>
                                    <OtpField
                                        otpValues={otpValues}
                                        setOtpValues={setOtpValues}
                                    />

                                    <div className="text-center mt-2">
                                        {!isLoader.verify ? <Button variant="transparent" className="btn-sm mt-2 p-0 text-danger" onClick={() => { setQrcode({}); setGAuthStatus("") }}>Cancel</Button> : <><LoaderCircle className='icon-loader text-lg' /> verification...</>}
                                    </div>
                                </>
                                :
                                <div className='d-flex align-items-center flex-column'>
                                    <div className='text-sm text-center'>Show your Google Auth QR Code. you will need to verify 6-digit authentize code using Google Autheriztor App</div>
                                    <Button variant={gAuthShow ? "secondary" : "primary"} className="btn-sm mt-2" onClick={() => {
                                        if (gAuthShow) {
                                            setQrcode({});
                                            setGAuthShow(false)
                                        } else {
                                            setGAuthStatus("S")
                                        }
                                    }}>{gAuthShow ? "Hide QR Code" : "Show QR Code"}</Button>
                                </div>
                            }

                            <div className='d-flex align-items-center justify-content-center my-3'>
                                <div className='divider'></div>
                                <div className='px-2'>OR</div>
                                <div className='divider'></div>
                            </div>

                            {
                                (gAuthStatus === "V" &&
                                    <>
                                        <div className='text-sm text-slate-500 mb-2 text-center'>Access your Google Authenticator app and input the 6-digit code provided to finalize the login procedure.</div>
                                        <OtpField
                                            otpValues={otpValues}
                                            setOtpValues={setOtpValues}
                                        />

                                        <div className="text-center mt-2">
                                            {!isLoader.verify ? <Button variant="transparent" className="btn-sm mt-2 p-0 text-danger" onClick={() => { setQrcode({}); setGAuthStatus("") }}>Cancel</Button> : <><LoaderCircle className='icon-loader text-lg' /> verification...</>}
                                        </div>
                                    </>
                                )
                                ||
                                (gAuthStatus === "N" &&
                                    <div className='d-flex align-items-center justify-content-center gap-2'>
                                        <div style={{ width: 350 }}>
                                            <Formik
                                                initialValues={{ password: "" }}
                                                validationSchema={Yup.object({
                                                    password: Yup.string().min(8, 'Password must be at least 8 characters')
                                                        .required('Password is a required field')
                                                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long')
                                                })}
                                                onSubmit={(values) => {
                                                    // generateNewQrCode(values);
                                                }}
                                            >

                                                {({ values, handleChange, handleBlur }) => (
                                                    <Form>
                                                        <Textfield
                                                            label="Password"
                                                            name="password"
                                                            type="password"
                                                            id="password"
                                                            tabIndex={1}
                                                            maxLength={25}
                                                            required
                                                            disabled={isLoader.generateNew}
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <ErrorMessage name="password" className='ErrorMessage' component="div" />

                                                        <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                disabled={isLoader.generateNew}
                                                                onClick={() => setGAuthStatus("")}
                                                                size='sm'
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                variant="primary"
                                                                disabled={isLoader.generateNew}
                                                                size='sm'>
                                                                {isLoader.generateNew ? <><LoaderCircle size={16} className="bx-spin text-white text-lg" /> Loading...</> : <>
                                                                    Verify
                                                                </>}
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                )}

                                            </Formik>
                                        </div>
                                    </div>
                                )
                                ||
                                <div className='d-flex align-items-center flex-column'>
                                    <div className='text-sm text-center'>If you want to New-Generate to Google Auth QR Code click to below button.</div>
                                    <Button variant="danger" className="btn-sm mt-2" onClick={() => setGAuthStatus("N")}>New-Generate QR Code</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </fieldset>

                <div className='my-3'>
                    <div className='text-sm mb-2'>Install Google Authenticator APP on your phone</div>

                    <ul className='ps-0 mb-0'>
                        <li className='text-xs text-slate-500 '>if you are an IOS user, please download the authenticator App from the <Link target="_blank" to="https://apps.apple.com/us/app/google-authenticator/id388497605"> <img src={appstore} alt="App Store" style={{ height: 20, width: 20 }} /> App store</Link></li>
                        <li className='text-xs text-slate-500 '>if you are an Android user, Please visit <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN"> <img src={googlePlaystore} alt="App Store" style={{ height: 20, width: 20 }} /> Google Play</Link> or use mobile web to search fro 'Google Authenticator' to download this app. </li>
                    </ul>
                </div>
            </> : ""}
        </div >
    )
}

export default Mfa

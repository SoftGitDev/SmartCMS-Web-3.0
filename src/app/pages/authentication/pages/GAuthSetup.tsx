// Purpose: Set-up to google authentication When generate new
// Created by: Harish
// Created Date: 21-05-2026

// Change History:


import { useCallback, useState } from 'react';
import { Copy, Smartphone, TriangleAlert, CheckCircle2, MessageSquareLock, CircleArrowLeft, LoaderCircle } from "lucide-react";
import SetupLayout from "../layout/SetupLayout";
import OtpField from '../../../components/ui/otpField/OtpField';
import { useLocation, useNavigate } from 'react-router-dom';
import { SweetAlerts } from '../../../utils/sweetAlert';
import { apiRequest } from '../../../utils/apiRequest';
import * as urls from '../../../utils/url';
import { encData } from '../../../utils/common';
import { Button } from 'react-bootstrap';
import QRCode from '../../../assets/images/dummayQr.png'
import appstore from "../../../assets/images/appstore.jpg";
import googlePlaystore from "../../../assets/images/googleplaystore.png";

const googleAuthSetStep = [
    {
        id: 1, title: 'Download the App', desc: 'Install Google Authenticator from your device\'s app store.', buttons: [
            {
                label: 'iOS',
                icon: appstore,
            },
            {
                label: 'Android',
                icon: googlePlaystore
            }
        ]
    },
    { id: 2, title: 'Add Your Account', desc: 'Open the app and tap the "+" icon. Choose "Scan a QR code" or "Enter a setup key".' },
    { id: 3, title: 'Scan the QR Code', desc: 'Point your camera at the QR code on the left, or manually enter the secret key shown below it.' },
    { id: 4, title: 'Save and Continue', desc: 'Your account will appear in the app with a 6-digit code. Click continue to verify it.' }
]

const GAuthSetup = () => {
    const [showOtp, setShowOtp] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();
    const state = useLocation().state;
    const [isLoadar, setIsLoader] = useState<boolean>(false);


    const handleGoogleCodeVerify = useCallback(async () => {
        try {
            if (!showOtp) {
                setShowOtp(true);
                return;
            }
            setIsLoader(true);
            const payload = {
                otpToken: state?.otpToken,
                bankCode: encData(state?.bankCode),
                userId: encData(state?.userId),
                sessionId: state?.sessionId,
                code: encData(otpValues?.join('')),
            };

            const result = await apiRequest("POST", urls.gAuthVerify, payload, true);
            if (result.status === "200" && result.success) {
                state?.tempPass === "Y" ? navigate("/changepassword", { state: state, replace: true }) : navigate("/");
            } else {
                SweetAlerts("Error !", result.message, 'error');
            }
        } catch (error) {
            // Ignore Case;
        } finally {
            setIsLoader(false);
        }

    }, [otpValues, state])



    return (
        <SetupLayout
            title="Google Authenticator Setup"
            subtitle="Secure your account with two-factor authentication using Google Authenticator"
        >
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="setup-card border-0 bg-white p-5 shadow-lg h-100 d-flex flex-column align-items-center text-center">
                        {!showOtp ? (
                            <>
                                <h6 className="fw-semibold mb-1">Scan QR Code</h6>
                                <p className="text-muted small mb-4">Use Google Authenticator app to scan this code</p>

                                <div className="qr-white-box p-1 rounded-4 card shadow-lg border-0 mb-4">
                                    <img
                                        // src={`data:image/png;base64,${state?.googleQr}`}
                                        src={QRCode}
                                        alt="QR Code"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>

                                <div className="w-100 text-start">
                                    <label className="small text-muted mb-2">Or enter this secret key manually:</label>
                                    <div className="secret-key-field d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                                        <span className="fw-bold">{state?.googleKey || '656ASAsASDSADQWEGF'}</span>
                                        <Copy size={15} role="button" className="text-primary" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-100 my-auto d-flex flex-column align-items-center">
                                <div
                                    className="text-white rounded-4 p-3 mb-4 shadow-sm d-flex align-items-center justify-content-center"
                                    style={{ width: '70px', height: '70px', background: 'var(--primaryColor50)' }}
                                >
                                    <MessageSquareLock size={35} className='text-primary' strokeWidth={1.5} />
                                </div>

                                <h5 className="fw-bold mb-1 text-dark">Verify OTP</h5>
                                <p className="text-muted small mb-0 px-4">
                                    Enter the 6-digit code generated by your app
                                </p>

                                <div className="py-4 w-100">
                                    <div className="mb-3">
                                        <OtpField
                                            name="Otp"
                                            otpValues={otpValues}
                                            setOtpValues={setOtpValues}
                                        />
                                    </div>
                                </div>

                                <Button
                                    variant=''
                                    className="btn btn-link text-primary text-decoration-none text-lg fw-medium mt-2"
                                    onClick={() => {
                                        setShowOtp(false);
                                        setOtpValues(['', '', '', '', '', '']);
                                    }}
                                >
                                    <CircleArrowLeft size={20} className="me-2" />
                                    Need to rescan the QR code?
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Card: Steps (Remains Static) */}
                <div className="col-lg-6">
                    <div className="setup-card border-0 bg-white shadow-lg p-5 h-100">
                        <h6 className="fw-semibold mb-4">Setup Instructions</h6>
                        {googleAuthSetStep.map((step) => (
                            <div className="d-flex mb-4" key={step.id}>
                                <div className={`step-circle me-3 fw-normal ${showOtp && step.id < 4 ? 'bg-success text-white' : ''}`}>
                                    {showOtp && step.id < 4 ? <CheckCircle2 size={18} /> : step.id}
                                </div>
                                <div>
                                    <h6 className="mb-1 fw-semibold small">{step.title}</h6>
                                    <p className="text-muted small mb-2" style={{ lineHeight: '1.4' }}>{step.desc}</p>
                                    {/* {step.buttons && (
                                        <div className="d-flex gap-2">
                                            {step.buttons.map(btn => (
                                                <button key={btn} className="btn btn-sm rounded-5 btn-light border-0 text-muted px-3" style={{ fontSize: '12px' }}>{btn}</button>
                                            ))}
                                        </div>
                                    )} */}
                                    {step.buttons && (
                                        <div className="d-flex gap-2 flex-wrap">
                                            {step.buttons.map((btn: any) => (
                                                <button
                                                    key={btn.label}
                                                    className="btn btn-sm rounded-5 btn-light border d-flex align-items-center gap-2 px-3 py-2"
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    <img
                                                        src={btn.icon}
                                                        alt={btn.label}
                                                        width={16}
                                                        height={16}
                                                        className="object-fit-contain"
                                                    />
                                                    {btn.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Security Alert */}
            <div className="alert mt-4 border-0 d-flex align-items-center shadow-sm" style={{ backgroundColor: '#fff9dfff', borderRadius: '16px', color: '#765b4bff' }}>
                <div className="me-3 fs-5"><TriangleAlert /></div>
                <div className="small">
                    <strong>Important Security Note:</strong> Keep your secret key in a safe place. You'll need it to recover access if you lose your device. Never share this key with anyone.
                </div>
            </div>

            {/* Footer Action */}
            <div className="text-end mt-4">
                <button
                    onClick={handleGoogleCodeVerify}
                    className="btn btn-primary text-white  fw-normal shadow"
                >
                    {!showOtp ? (
                        <><Smartphone size={16} className="me-2" /> I've Scanned – Continue to Verify</>
                    ) : (
                        <>
                            {isLoadar ? <><LoaderCircle size={18} className='icon-loader text-white text-lg' /> Loading...</> : <><CheckCircle2 size={16} className="me-2" /> Complete Verification</>}
                        </>
                    )}
                </button>
            </div>
        </SetupLayout >
    );
};

export default GAuthSetup;
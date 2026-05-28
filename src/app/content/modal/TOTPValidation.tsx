// Purpose: Manage Account Type 
// Created by: Harish 
// Created Date: 25-05-2026

// Change History:

import React from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { LoaderCircle, ShieldCheck } from 'lucide-react';


import OtpField from '../../components/ui/otpField/OtpField';

interface accountType {
    isOpen: boolean;
    toggle: () => void;
    setOtpValues: any;
    otpValues: any;
    onVerifySuccess: (otp: string) => void;
    isUpdateLicenseLoader: boolean
}

const TOTPValidation: React.FC<accountType> = ({ isOpen, toggle, otpValues, setOtpValues, onVerifySuccess, isUpdateLicenseLoader }) => {

    return (
        <Modal
            show={isOpen}
            onHide={toggle}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header className='border-0' closeButton>
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h6 className="mb-0">TOTP Verification</h6>
                        <span className="text-md fw-light">Enter your authentication code</span>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center mb-3">
                    <p className="text-muted small">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>

                <div className="otp-input-container m-0">
                    <OtpField
                        name="OTP"
                        otpValues={otpValues}
                        setOtpValues={setOtpValues}
                    />
                </div>

            </Modal.Body>

            <Modal.Footer className='border-0'>
                <Button
                    variant="light"
                    className='btn-sm'
                    onClick={toggle}
                    disabled={isUpdateLicenseLoader}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className='btn-sm'
                    onClick={() => onVerifySuccess(otpValues.join(''))}
                    disabled={isUpdateLicenseLoader || otpValues.some((val: string) => val === '')}
                >
                    {isUpdateLicenseLoader ? (
                        <>
                            <LoaderCircle size={16} className='icon-loader text-white text-lg me-2' />
                            Verifying...
                        </>
                    ) : (
                        'Verify OTP'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TOTPValidation




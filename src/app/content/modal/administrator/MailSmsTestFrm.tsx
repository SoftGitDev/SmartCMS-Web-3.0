// Purpose: Test Mail / SMS Configuration Modal
// Created by: Harish
// Created Date: 30-03-2026

import React, { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { LoaderCircle, Mail, MessageSquare, Send } from 'lucide-react';
import { apiRequest } from '../../../utils/apiRequest';
import { SweetAlerts } from '../../../utils/sweetAlert';
import * as urls from '../../../utils/url';
import Textfield from '../../../components/ui/TextField/TextInput';

// ── Types ─────────────────────────────────────────────────────────────────────

type TestType = 'MAIL' | 'SMS';

interface TestMailSmsMdlProps {
    isOpen: boolean;
    toggle: () => void;
    testType: TestType;
}

interface FormValues {
    toEmail: string;      // MAIL only
    subject: string;      // MAIL only
    mobileNumber: string; // SMS only
    message: string;      // shared
}

// ── Initial Values ─────────────────────────────────────────────────────────────

const initialValues: FormValues = {
    toEmail: '',
    subject: '',
    mobileNumber: '',
    message: '',
};

// ── Validation Schema (dynamic based on testType) ──────────────────────────────

const buildValidationSchema = (testType: TestType) =>
    Yup.object({
        toEmail: testType === 'MAIL'
            ? Yup.string().email('Enter a valid email address').required('Email address is required')
            : Yup.string(),
        mobileNumber: testType === 'SMS'
            ? Yup.string().matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number').required('Mobile number is required')
            : Yup.string(),
    });

// ── Main Component ─────────────────────────────────────────────────────────────

const TestMailSmsMdl: React.FC<TestMailSmsMdlProps> = ({ isOpen, toggle, testType }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);

    const isMail = testType === 'MAIL';

    const handleSubmit = async (values: FormValues) => {
        try {
            setIsLoader(true);

            const payload = {
                type: testType === "MAIL" ? "M" : "S",
                emailId: values.toEmail,
                mobileNo: values.mobileNumber,
            };

            const result = await apiRequest("POST", urls.testMailSms, payload);
            if (result.status === "200" && result.success) {
                SweetAlerts("Success!", result.message || `Test ${isMail ? 'mail' : 'SMS'} sent successfully.`, "success");
                toggle();
            } else {
                SweetAlerts("Error!", result.message || `Failed to send test ${isMail ? 'mail' : 'SMS'}.`, "error");
            }
        } catch (error) {
            // Ignore Case

            console.log("error", error);
        } finally {
            setIsLoader(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={toggle} backdrop="static" keyboard={false}>

            <Modal.Header closeButton className="border-0">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper" style={{ width: '44px', height: '44px', borderRadius: '8px' }}>
                        {isMail
                            ? <Mail size={22} className="text-primary" />
                            : <MessageSquare size={22} className="text-primary" />
                        }
                    </div>
                    <div>
                        <h6 className="mb-0 fw-medium">
                            Test {isMail ? 'Mail' : 'SMS'} Configuration
                        </h6>
                        <small className="text-muted fw-muted text-sm">
                            {isMail ? 'Send a test email to verify your SMTP setup' : 'Send a test SMS to verify your SMS gateway setup'}
                        </small>
                    </div>
                </div>
            </Modal.Header>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={buildValidationSchema(testType)}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <Modal.Body className="py-3">
                            <Row className="g-3">
                                {isMail && (
                                    <>
                                        <Col md={12}>
                                            <Textfield
                                                label="Email Address"
                                                required
                                                type="email"
                                                name="toEmail"
                                                placeholder="e.g. test@example.com"
                                                value={values.toEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name="toEmail" className="ErrorMessage" component="div" />
                                        </Col>
                                    </>
                                )}

                                {!isMail && (
                                    <Col md={12}>
                                        <Textfield
                                            label="Mobile Number"
                                            required
                                            type="text"
                                            name="mobileNumber"
                                            placeholder="e.g. 9876543210"
                                            value={values.mobileNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={10}
                                        />
                                        <ErrorMessage name="mobileNumber" className="ErrorMessage" component="div" />
                                    </Col>
                                )}

                            </Row>
                        </Modal.Body>

                        <Modal.Footer className="border-0 pt-0">
                            <Button variant="light" type="button" className="btn-sm" onClick={toggle}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-sm d-flex align-items-center gap-2"
                                disabled={isLoader}
                            >
                                {isLoader
                                    ? <><LoaderCircle size={15} className="spinner-animation" /> Sending...</>
                                    : <><Send size={15} /> Send Test {isMail ? 'Mail' : 'SMS'}</>
                                }
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default TestMailSmsMdl;
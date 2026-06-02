import React, { useState } from 'react';
import { apiRequest } from '../../../utils/apiRequest';
import toastNotify from '../../../utils/tostNotify';
import { ErrorMessage, Formik } from 'formik';
import { Button, Card, Col, Row, ListGroup, CardBody } from 'react-bootstrap';
import { CheckCircle2, Circle, LoaderCircle, SaveIcon, ShieldCheck } from 'lucide-react';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import * as urls from "../../../utils/url";
import PageHeaeder from '../../../components/common/PageHeaeder';
import Textfield from '../../../components/ui/TextField/TextInput';

const ChangePwd = () => {
    const [isLoader, setIsLoader] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>("");

    const validation = Yup.object({
        currentPwd: Yup.string().required('Current Password is required'),
        newPwd: Yup.string()
            .min(8, 'Minimum 8 characters')
            .required('New Password is required')
            .matches(/[A-Z]/, 'Must have an uppercase letter')
            .matches(/[a-z]/, 'Must have a lowercase letter')
            .matches(/[0-9]/, 'Must have a number')
            .matches(/[!@#$%^&*]/, 'Must have a special character').test(
                'no-sequence',
                'Sequential numbers (e.g., 12, 123, 09, 098) are not allowed',
                (value) => {
                    if (!value) return true;

                    const isSequential = (str: string) => {
                        if (str.length < 2) return false;

                        const digits = str.split('').map(Number);

                        const diff = ((digits[1] - digits[0]) + 10) % 10;

                        if (diff !== 1 && diff !== 9) return false;

                        for (let i = 2; i < digits.length; i++) {
                            if (((digits[i] - digits[i - 1]) + 10) % 10 !== diff) return false;
                        }

                        return true;
                    };
                    const digitGroups = value.match(/\d+/g);
                    if (!digitGroups) return true;

                    for (const group of digitGroups) {
                        if (isSequential(group)) return false;
                    }

                    return true;
                }).notOneOf([Yup.ref('currentPwd')], 'Cannot be the same as current password'),
        confirmPwd: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('newPwd')], 'Passwords must match'),
    });

    const changePwd = async (val: any) => {
        try {
            setIsLoader(true);
            const payload = {
                oldPassword: val.currentPwd,
                newPassword: val.confirmPwd
            };
            const result = await apiRequest("PUT", urls.changeUserPassword, payload, {});
            if (result.success) {
                toastNotify(result.message, 'success');
                navigate('/');
            } else {
                toastNotify(result.message, 'error');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoader(false);
        }
    };

    // Password Criteria Check Helper
    const CriteriaItem = ({ met, label }: { met: boolean; label: string }) => (
        <ListGroup.Item className="bg-transparent border-0 px-0 d-flex align-items-center py-1">
            {met ? (
                <CheckCircle2 size={18} className="text-success me-2" />
            ) : (
                <Circle size={18} className="text-muted opacity-50 me-2" />
            )}
            <span className={met ? 'text-dark fw-medium' : 'text-muted small'}>{label}</span>
        </ListGroup.Item>
    );

    return (
        <>

            {/* ── Page Header Card ── */}
            {/* <div className="mb-3">
                <PageHeaeder
                    Icon={ShieldCheck}
                    title={'Security Settings'}
                    description={'Update your account password to keep it secure'}

                />
            </div> */}

            <div>
                <Card>
                    <CardBody>
                        <div style={{ overflowX: 'hidden', }}>
                            <Formik
                                initialValues={{ currentPwd: '', newPwd: '', confirmPwd: '' }}
                                validationSchema={validation}
                                onSubmit={changePwd}
                            >
                                {({ values, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Row className="g-4">
                                            {/* Left Column: Form Fields */}
                                            <Col lg={5}>
                                                <div className="mb-3">
                                                    <Textfield
                                                        label="Current Password"
                                                        placeholder='••••••••'
                                                        name="currentPwd"
                                                        type="password"
                                                        maxLength={32}
                                                        tabIndex={1}
                                                        value={values.currentPwd}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={isLoader}
                                                    />
                                                    <ErrorMessage name="currentPwd" component="div" className="ErrorMessage" />
                                                </div>

                                                <div className="mb-3">
                                                    <Textfield
                                                        label="New Password"
                                                        placeholder='••••••••'
                                                        name="newPwd"
                                                        type="password"
                                                        maxLength={32}
                                                        tabIndex={2}
                                                        value={values.newPwd}
                                                        onChange={(e: any) => { handleChange(e); setPassword(e.target.value) }}
                                                        onBlur={handleBlur}
                                                        disabled={isLoader}
                                                    />
                                                    <ErrorMessage name="newPwd" component="div" className="ErrorMessage" />
                                                </div>

                                                <div className="mb-4">
                                                    <Textfield
                                                        label="Confirm New Password"
                                                        placeholder='••••••••'
                                                        name="confirmPwd"
                                                        type="password"
                                                        maxLength={32}
                                                        tabIndex={3}
                                                        value={values.confirmPwd}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={isLoader}
                                                    />
                                                    <ErrorMessage name="confirmPwd" component="div" className="ErrorMessage" />
                                                </div>

                                                <div className="d-grid d-md-flex justify-content-md-start">
                                                    <Button size='sm' variant="primary" type='submit' className='px-3 py-2 fw-semibold shadow-sm' tabIndex={4} disabled={isLoader}>
                                                        {isLoader ? <><LoaderCircle size={18} className='animate-spin me-2' /> Updating...</> : <><SaveIcon size={15} className='me-2' />Update Password</>}
                                                    </Button>
                                                </div>
                                            </Col>

                                            {/* Right Column: Policy Tracker */}
                                            <Col lg={5}>
                                                <div className="bg-light rounded-4 p-4 h-100 border border-white">
                                                    <h6 className="fw-bold text-dark mb-3">Password Requirements</h6>
                                                    <p className="text-muted small mb-4">To create a strong password, ensure the following criteria are met:</p>

                                                    <ListGroup className="mb-0">
                                                        <CriteriaItem met={password.length >= 8} label="At least 8 characters long" />
                                                        <CriteriaItem met={/[A-Z]/.test(password)} label="One uppercase letter (A-Z)" />
                                                        <CriteriaItem met={/[a-z]/.test(password)} label="One lowercase letter (a-z)" />
                                                        <CriteriaItem met={/[0-9]/.test(password)} label="At least one numerical digit" />
                                                        <CriteriaItem met={/[!@#$%^&*(),.?":{}|<>]/.test(password)} label="One special character (e.g. @, #, $)" />
                                                    </ListGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </CardBody>
                </Card>
            </div>


        </>
    );
};

export default ChangePwd;
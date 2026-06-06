import React, { useCallback, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { InfoIcon, LoaderCircle, Mail, MessageCircle } from 'lucide-react';
import * as urls from '../../../services/axios/url';
import { SMTPConfigListProps } from '../types/MailSMSTemp';
import { apiRequest } from '../../../services/api/apiRequest';
import { SweetAlerts } from '../../../services/notification/sweetAlert';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import RadioBtn from '../../../common/components/ui/Radio/RadioBtn';
import Textfield from '../../../common/components/ui/TextField/TextInput';

interface smtpConfigProps {
    isOpen: boolean,
    handleClose: () => void,
    getSmtpConfigList: () => void,
    editSMTPData: any | null,
    userData: any
}

export interface MailFormInitialValues {
    smtpHost: string;
    port: string;
    encryption: string;
    encryptionLabel: string;
    username: string;
    password: string;
    fromEmail: string;
    fromName: string;
    smtpTls?: boolean;
    Status?: boolean;
    description?: string;
    smtpType: string;
}


const Instruction = [
    { apiNm: 'Please ensure all fields are filled with correct SMTP server credentials' },
    { apiNm: 'Select the appropriate Encryption: TLS, SSL, or None based on your mail server requirements.' },
    { apiNm: 'The Host, Port, Username, Password, and From Email must match your email provider\'s settings.' },
];

const SMTPConfigFrm: React.FC<smtpConfigProps> = ({ isOpen, handleClose, getSmtpConfigList, editSMTPData, userData }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [updateFormData, setUpdatedFormData] = useState<SMTPConfigListProps | object>(editSMTPData || {})



    const AddSmtpConfig = useCallback(async (data: MailFormInitialValues) => {
        try {
            setIsLoader(true);


            const payload = {
                mailType: 'SMTP',
                host: data.smtpHost,
                description: data.description,
                port: parseInt(data.port),
                encryption: data.encryption,
                userName: data.username,
                tls: data.smtpTls || false,
                pass: data.password,
                fromId: data.fromEmail,
                fromName: data.fromName,
                status: data.Status || true
            };
            const result = await apiRequest("POST", urls.addSmtpConfig, payload);
            if (result.success && result.status === "200") {
                // SweetAlerts("Success!", result.message, 'success');
                getSmtpConfigList();
                handleClose()
            } else {
                SweetAlerts("Error!", result.message, 'error');
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, []);


    // Save mail configuration
    const updateSmtpConfig = useCallback(async (data: MailFormInitialValues) => {
        try {
            setIsLoader(true);

            // if (userData?.permissions?.UPDATE_APP_CONF_MAIL !== "Y") return;

            if (JSON.stringify(editSMTPData) === JSON.stringify(updateFormData)) {
                return SweetAlerts("Error !", "Nothing has changed, so you don’t need to update the details.", 'error');
            }

            const payload = {
                mailType: 'SMTP',
                tranCode: editSMTPData.tranCode,
                host: data.smtpHost,
                description: data.description,
                port: parseInt(data.port),
                encryption: data.encryption,
                userName: data.username,
                tls: data.smtpTls || false,
                pass: data.password,
                fromId: data.fromEmail,
                fromName: data.fromName,
                status: data.Status || true
            };
            const result = await apiRequest("PUT", urls.updateSmtpConfig, payload);
            if (result.success && result.status === "200") {
                // SweetAlerts("Success!", result.Message, 'success');
                getSmtpConfigList();
                handleClose()
            } else {
                SweetAlerts("Error!", result.message, 'error');
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, [editSMTPData, updateFormData]);


    const initialValues = {
        smtpHost: editSMTPData?.host || '',
        description: editSMTPData?.description || '',
        port: editSMTPData?.port?.toString() || '',
        encryption: editSMTPData?.encryption || '',
        encryptionLabel: editSMTPData?.encryptionLabel || '',
        username: editSMTPData?.userName || '',
        password: editSMTPData?.pass || '',
        fromEmail: editSMTPData?.fromId || '',
        fromName: editSMTPData?.fromName || '',
        Status: editSMTPData?.status || true,
        smtpTls: editSMTPData?.tls || false,
        smtpType: editSMTPData?.smtpType || 'I',
    };


    // Validation Schema
    const smtpValidationSchema = Yup.object({
        description: Yup.string().required('SMTP Config name is required'),
        smtpHost: Yup.string().required('SMTP Host is required'),
        port: Yup.string().required('Port is required'),
        password: Yup.string().required('Password is required'),
        fromEmail: Yup.string().required('From Email is required'),
        fromName: Yup.string().required('From Name is required'),
    });

    // Tab Index auto manage
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    return (
        <Modal show={isOpen} onHide={handleClose} backdrop="static" keyboard={false} size='xl' >
            <Modal.Header closeButton className="border-0">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                        <MessageCircle size={24} />
                    </div>
                    <div>
                        <h6 className="mb-0">{editSMTPData ? 'Edit SMTP Configurations' : 'Add SMTP Configurations'}</h6>
                        <span className="text-md fw-muted">{editSMTPData ? 'Modify SMTP Configurations' : 'create a SMTP configurations under bank'}</span>
                    </div>
                </div>
            </Modal.Header>
            <Formik
                initialValues={initialValues}
                validationSchema={smtpValidationSchema}
                onSubmit={(values: MailFormInitialValues) => {
                    if (editSMTPData) {
                        updateSmtpConfig(values)
                    } else {
                        AddSmtpConfig(values)
                    }
                }}
                enableReinitialize
            >
                {({ values, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Modal.Body>
                            <div>
                                <Row>
                                    <Col md={8}>
                                        <Row className="g-3">

                                            <Col md={3} style={{ marginTop: 25 }}>
                                                <Checkbox
                                                    label="Status"
                                                    name='Status'
                                                    tabIndex={1}
                                                    checked={values.Status === true}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        setFieldValue("Status", e?.target.checked);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, Status: e.target.checked }));
                                                    }}
                                                />
                                            </Col>

                                            <Col md={3} style={{ marginTop: 25 }}>
                                                <Checkbox
                                                    label="Active TLS"
                                                    name='smtpTls'
                                                    disabled={values.Status !== true}
                                                    tabIndex={2}
                                                    checked={values.smtpTls === true}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        setFieldValue("smtpTls", e?.target.checked);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, Tls: e.target.checked }));
                                                    }}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <label className='text-sm text-muted'>SMTP Type</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Internal'
                                                        tabIndex={getNextTabIndex()}
                                                        id='Internal'
                                                        name='smtpType'
                                                        value='I'
                                                        checked={values.smtpType === 'I'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='External'
                                                        tabIndex={getNextTabIndex()}
                                                        id='External'
                                                        name='smtpType'
                                                        value='E'
                                                        checked={values.smtpType === 'E'}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="SMTP Config Name"
                                                    placeholder="Enter SMTP Config Name"
                                                    name="description"
                                                    type="text"
                                                    disabled={values.Status !== true}
                                                    required
                                                    tabIndex={3}
                                                    maxLength={40}
                                                    value={values.description}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, Description: e.target.value }));
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="description" className="ErrorMessage" component="div" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="SMTP Host"
                                                    placeholder="Enter SMTP Host (e.g., smtp.gmail.com)"
                                                    name="smtpHost"
                                                    type="text"
                                                    disabled={values.Status !== true}
                                                    required
                                                    tabIndex={4}
                                                    maxLength={100}
                                                    value={values.smtpHost}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, Host: e.target.value }));
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="smtpHost" className="ErrorMessage" component="div" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="Port"
                                                    placeholder="Enter Port (e.g., 587)"
                                                    name="port"
                                                    type="text"
                                                    required
                                                    disabled={values.Status !== true}
                                                    tabIndex={5}
                                                    maxLength={6}
                                                    value={values.port}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const { value } = e.target;
                                                        const regex = /^[0-9]*$/;
                                                        if (regex.test(value)) {
                                                            setFieldValue('port', value);
                                                            setUpdatedFormData((pre: any) => ({ ...pre, Port: value }));
                                                        }
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="port" className="ErrorMessage" component="div" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="From Name"
                                                    placeholder="Enter From Name"
                                                    name="fromName"
                                                    type="text"
                                                    disabled={values.Status !== true}
                                                    required
                                                    tabIndex={5}
                                                    maxLength={100}
                                                    value={values.fromName}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, FromName: e.target.value }));
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="fromName" className="ErrorMessage" component="div" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="Password"
                                                    placeholder="Enter Email Password"
                                                    name="password"
                                                    type="password"
                                                    disabled={values.Status !== true}
                                                    required
                                                    tabIndex={6}
                                                    maxLength={50}
                                                    value={values.password}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, Pass: e.target.value }));
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="password" className="ErrorMessage" component="div" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="From Email"
                                                    placeholder="Enter Sender Email"
                                                    name="fromEmail"
                                                    type="email"
                                                    required
                                                    disabled={values.Status !== true}
                                                    tabIndex={7}
                                                    maxLength={100}
                                                    value={values.fromEmail}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setUpdatedFormData((pre: any) => ({ ...pre, FromId: e.target.value }));
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="fromEmail" className="ErrorMessage" component="div" />
                                            </Col>




                                        </Row>
                                    </Col>

                                    <Col md={4} className='mt-3'>
                                        <div className='p-3 border rounded'>
                                            <div><span className='text-primary text-lg ps-1'>Notes</span></div>
                                            {Instruction.map((instruction, index) => (
                                                <div key={index} className='mt-2 bg-light rounded d-flex gap-2 px-3 pt-3 pb-2'>
                                                    <InfoIcon className='mt-1 text-primary flex-shrink-0' size={18} />
                                                    <p className='text-sm text-muted mb-0'>{instruction.apiNm}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="light"
                                disabled={isLoader}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            {/* {(userData?.permissions?.SAVE_APP_CONF_MAIL === "Y" || userData?.permissions?.UPDATE_APP_CONF_MAIL === "Y") && */}
                            {/* {(userData?.permissions?.SAVE_MAIL_CONFIG === "Y" || userData?.permissions?.UPDATE_MAIL_CONFIG === "Y") && */}
                            <Button
                                type="submit"
                                variant='primary'
                                className="d-flex align-items-center gap-2"
                                disabled={isLoader}
                                tabIndex={9}
                            >
                                {isLoader ? (<> <LoaderCircle size={18} className='spinner-animation' /> Saving... </>) : (<> <Mail size={18} /> Save Configuration </>)}
                            </Button>
                            {/* } */}
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default SMTPConfigFrm;
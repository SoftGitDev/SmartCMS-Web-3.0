// Purpose: SMTP Config
// Created by: Harish
// Created Date: 22-05-2026

// Change History:



import { useCallback, useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { InfoIcon, LoaderCircle, Mail, Send } from 'lucide-react';
import { apiRequest } from '../../../../utils/apiRequest';
import { SweetAlerts } from '../../../../utils/sweetAlert';
import * as urls from '../../../../utils/url';
import TestMailSmsMdl from '../../../../content/modal/administrator/MailSmsTestFrm';
import SelectField from '../../../../components/ui/SelectBox/SelectField';

export interface MailFormInitialValues {
    mailAPI: string;
    mailAPILabel?: string;
}

interface MailAPIConfigProps {
    apiTypeData: any[];
    mailConfigData: any;
    refreshMailConfig: () => void;
    userData: any
}

// Validation Schema
const smtpValidationSchema = Yup.object({
    mailAPI: Yup.string().required('Mail API is required'),
});



const MailAPIConfig = ({ apiTypeData, mailConfigData, refreshMailConfig, userData }: MailAPIConfigProps) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isTestMdl, setTestMdl] = useState<boolean>(false);
    const [testType, setTestType] = useState<'MAIL' | 'SMS'>('MAIL');


    // Save mail configuration
    const editMailConfig = useCallback(async (data: MailFormInitialValues) => {
        try {
            setIsLoader(true);
            const payload = {
                mailType: "API",
                smtpApiConfigCd: data.mailAPI
            };
            const result = await apiRequest("POST", urls.editMailConfig, payload);
            if (result.status === "200" && result.success) {
                refreshMailConfig();
            } else {
                SweetAlerts("Error!", result.Message, 'error');
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, [refreshMailConfig]);



    return (
        <div className='overflow-auto' style={{ height: "50vh" }}>
            <Formik
                initialValues={{
                    mailAPI: mailConfigData?.smtpApiConfigCd || 0,
                    mailAPILabel: apiTypeData.find(api => api.value === mailConfigData?.smtpApiConfigCd)?.label || "Select Mail API"
                }}
                validationSchema={smtpValidationSchema}
                onSubmit={(values) => { editMailConfig(values) }}
                enableReinitialize
            >
                {({ values, setFieldValue, isSubmitting, setFieldTouched }) => (
                    <Form>
                        <div className='mt-3'>
                            <Card
                                className="h-100 border-0 p-4  shadow-sm overflow-hidden position-relative"
                                style={{ borderRadius: '18px', transition: 'all 0.3s ease' }}
                            >
                                <Card.Body className="p-0">
                                    <div className="d-flex gap-3 justify-content-between mb-2">
                                        <div className='d-flex gap-3'>
                                            <div className="icon-wrapper" style={{ background: 'linear-gradient(135deg, #6dea66ff 0%, #64a24bff 100%)' }}>
                                                <Mail className="text-white" />
                                            </div>
                                            <div>
                                                <h6 className="m-0 mt-1 fw-semibold">Mail API Configuration</h6>
                                                <p className="text-md fw-normal text-muted">Select and configure mail API from API Configurations</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Row>
                                        <Col md={12}>
                                            <Row className="g-3">

                                                {/* Internal */}
                                                <Col md={4}>
                                                    <SelectField
                                                        label='Internal Mail API'
                                                        placeholder='Select Internal Mail API'
                                                        required
                                                        tabIndex={1}
                                                        // isDisabled={userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y"}
                                                        options={apiTypeData}
                                                        name='mailAPI'
                                                        value={values.mailAPI !== "0" ? {
                                                            value: values.mailAPI,
                                                            label: values.mailAPILabel
                                                        } : null}
                                                        onChange={(e: any) => {
                                                            setFieldValue("mailAPI", e?.value || '');
                                                            setFieldValue("mailAPILabel", e?.label || '');
                                                        }}
                                                        onBlur={() => setFieldTouched("mailAPI", true)}
                                                    />
                                                    <ErrorMessage name="mailAPI" className="ErrorMessage text-danger small" component="div" />
                                                </Col>

                                                {/* External */}
                                                <Col md={4}>
                                                    <SelectField
                                                        label='External Mail API'
                                                        placeholder='Select External Mail API'
                                                        required
                                                        tabIndex={1}
                                                        // isDisabled={userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y"}
                                                        options={apiTypeData}
                                                        name='mailAPI'
                                                        value={values.mailAPI !== "0" ? {
                                                            value: values.mailAPI,
                                                            label: values.mailAPILabel
                                                        } : null}
                                                        onChange={(e: any) => {
                                                            setFieldValue("mailAPI", e?.value || '');
                                                            setFieldValue("mailAPILabel", e?.label || '');
                                                        }}
                                                        onBlur={() => setFieldTouched("mailAPI", true)}
                                                    />
                                                    <ErrorMessage name="mailAPI" className="ErrorMessage text-danger small" component="div" />
                                                </Col>
                                            </Row>

                                            <div className="alert my-4 border-primary border-0 d-flex align-items-center shadow-sm" style={{ backgroundColor: 'var(--primaryColor25)', borderRadius: '10px', color: 'var(--primaryColor)' }}>
                                                <div className="icon-wrapper me-3">
                                                    <InfoIcon className="text-primary" />
                                                </div>
                                                <div>
                                                    <strong className="mb-0">API Details</strong>
                                                    <p className="mb-0 text-sm">These details were captured during the initial bank registration process. You can update them here as needed. Any changes will be logged with timestamp and user information for audit purposes.</p>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>

                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button
                                            variant="light"
                                            className="d-flex align-items-center gap-2"
                                            onClick={() => { setTestType('MAIL'); setTestMdl(true); }}
                                            disabled={isLoader}
                                            type="button">
                                            <Send size={16} /> Test Connection
                                        </Button>
                                        {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                        <Button
                                            type="submit"
                                            variant='primary'
                                            className="d-flex align-items-center gap-2"
                                            disabled={isSubmitting || isLoader}
                                            tabIndex={2}
                                        >
                                            {isLoader ? (<> <LoaderCircle size={20} className='spinner-animation' /> Saving... </>) : (<> <Mail size={18} /> Save Configuration </>)}
                                        </Button>
                                        {/* } */}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Form>
                )}
            </Formik>

            <TestMailSmsMdl
                isOpen={isTestMdl}
                toggle={() => setTestMdl(false)}
                testType={testType}
            />
        </div>
    );
};

export default MailAPIConfig;
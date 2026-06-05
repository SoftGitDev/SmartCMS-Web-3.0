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



interface intialValProps {
    mailAPI: string,
    mailAPILabel: string,
}

// Validation Schema
const smtpValidationSchema = Yup.object({
    mailAPI: Yup.string().required('Mail API is required'),
});

const MailAPIConfig: React.FC<{ userData: any, mailConfigData: any, apiTypeData: any[] }> = ({ userData, mailConfigData, apiTypeData }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isTestMdl, setTestMdl] = useState<boolean>(false);
    const [testType, setTestType] = useState<'MAIL' | 'SMS'>('MAIL');

    // Save mail configuration
    const editMailConfig = useCallback(async (data: intialValProps) => {
        try {
            setIsLoader(true);
            const payload = {
                mailType: "SMTP",
                smtpApiConfigCd: data.mailAPI
            };
            const result = await apiRequest("POST", urls.editMailConfig, payload);
            if (result.status === "200" && result.success) {
                // Ignore Case
            } else {
                SweetAlerts("Error!", result.message, 'error');
            }
        } catch (error) {
            console.error('Error saving mail config:', error);
        } finally {
            setIsLoader(false);
        }
    }, []);


    return (
        <div className='overflow-auto my-0' style={{ height: "50vh" }}>
            <Formik
                initialValues={{
                    mailAPI: mailConfigData?.smtpApiConfigCd || 0,
                    mailAPILabel: apiTypeData.find(api => api.value === mailConfigData?.smtpApiConfigCd)?.label || "Select SMTP Config"
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
                                            <div className="icon-wrapper">
                                                <Mail className="text-primary" />
                                            </div>
                                            <div>
                                                <h6 className="m-0 mt-1 fw-semibold">SMTP Configuration</h6>
                                                <p className="text-md fw-normal text-muted">Select and configure mail Configurations</p>
                                            </div>
                                        </div>
                                    </div>


                                    <Row>
                                        <Col md={12}>
                                            <Row className="g-3">

                                                {/* Intenal */}
                                                <Col md={4}>
                                                    <SelectField
                                                        label='Internal  SMTP Configuration'
                                                        placeholder='Select Internal  SMTP Configuration'
                                                        required
                                                        tabIndex={3}
                                                        // isDisabled={userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y"}
                                                        options={apiTypeData}
                                                        name='internalmailAPI'
                                                        value={values.mailAPI !== 0 ? {
                                                            value: values.mailAPI,
                                                            label: values.mailAPILabel
                                                        } : null}
                                                        onChange={(e: { value: string, label: string }) => {
                                                            setFieldValue("mailAPI", e?.value || '');
                                                            setFieldValue("mailAPILabel", e?.label || '');
                                                        }}
                                                        onBlur={() => setFieldTouched("mailAPI", true)}
                                                    />
                                                    <ErrorMessage name="mailAPI" className="ErrorMessage text-danger small" component="div" />
                                                </Col>

                                                {/* External  */}
                                                <Col md={4}>
                                                    <SelectField
                                                        label='External  SMTP Configuration'
                                                        placeholder='Select External  SMTP Configuration'
                                                        required
                                                        tabIndex={3}
                                                        // isDisabled={userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y"}
                                                        options={apiTypeData}
                                                        name='externalmailAPI'
                                                        value={values.mailAPI !== 0 ? {
                                                            value: values.mailAPI,
                                                            label: values.mailAPILabel
                                                        } : null}
                                                        onChange={(e: { value: string, label: string }) => {
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
                                                    <strong className="mb-0">Configuration Details</strong>
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
                                            disabled={isSubmitting || isLoader}>
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
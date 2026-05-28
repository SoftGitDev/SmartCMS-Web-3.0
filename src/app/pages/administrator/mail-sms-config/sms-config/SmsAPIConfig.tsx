// Purpose: SMTP Config
// Created by: Harish 
// Created Date: 23-05-2026



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

// Validation Schema
const smtpValidationSchema = Yup.object({
    mailAPI: Yup.string().required('SMTP Host is required'),
});



const SmsAPIConfig: React.FC<{ userData: any }> = ({ userData }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [apiTypeData, setApiTypeData] = useState<any[]>([]);
    const [selectedDataSMS, setSelectedDataSMS] = useState<any>(null);
    const [isTestMdl, setTestMdl] = useState(false);

    const getAPITypeCombo = useCallback(async () => {
        try {
            const payload = {
                serviceType: "SMS_API",
            };
            const config = {};
            await apiRequest("POST", urls.getAPIConfigCombo, payload, config).then((result) => {
                if (result.status === "200" && result.success) {
                    setApiTypeData(result.response.map((item: any) => ({
                        value: item.serviceCd,
                        label: item.serviceName || ''
                    })))
                } else {
                    setApiTypeData([]);
                }
            })
        } catch (error: any) {
            // Ignore Case
        }
    }, [])

    const getSMSConfig = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = { type: 'SMS' };
            const result = await apiRequest("POST", urls.getMailSmsConfig, payload);
            if (result.status === "200" && result.success) {
                setSelectedDataSMS(result.response.smsApiConfigCd);
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, [apiTypeData]);


    // useEffect(() => {
    //     getAPITypeCombo();
    //     getSMSConfig();
    // }, []);


    // Save mail configuration
    const editMailConfig = useCallback(async (data: MailFormInitialValues) => {
        try {
            setIsLoader(true);
            const payload = { smsApiConfigCd: data.mailAPI };
            const result = await apiRequest("POST", urls.editSmsConfig, payload);
            if (result.status === "200" && result.success) {
                // Ignore Case
            } else {
                SweetAlerts("Error!", result.message, 'error');
            }
        } catch (error) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, []);



    return (
        <>
            <Formik
                initialValues={{
                    mailAPI: selectedDataSMS || 0,
                    mailAPILabel: apiTypeData.find(api => api.value === selectedDataSMS)?.label || ""
                }}
                validationSchema={smtpValidationSchema}
                onSubmit={(values) => {
                    editMailConfig(values);
                }}
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
                                                <h6 className="m-0 mt-1 fw-semibold">SMS API Configuration</h6>
                                                <p className="text-md fw-normal text-muted">Select and configure SMS API from API Configurations</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Row>
                                        <Col md={12}>
                                            <Row className="g-3">
                                                <Col md={4}>
                                                    <SelectField
                                                        label='Select SMS API'
                                                        placeholder='Select SMS API'
                                                        required
                                                        // isDisabled={userData?.permissions?.UPDATE_SMS_CONFIG !== "Y"}
                                                        tabIndex={3}
                                                        options={apiTypeData}
                                                        name='mailAPI'
                                                        value={values.mailAPI !== "" ? {
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

                                            <div className="alert my-4 border-primary border-0 d-flex align-items-center shadow-sm" style={{ backgroundColor: '#dfe5ffff', borderRadius: '10px', color: '#4b5976ff' }}>
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
                                            size='sm'
                                            className="d-flex align-items-center gap-2"
                                            onClick={() => { setTestMdl(true); }}
                                            disabled={isLoader}
                                            type="button">
                                            <Send size={16} /> Test Connection
                                        </Button>
                                        {/* {userData?.permissions?.UPDATE_SMS_CONFIG === "Y" && */}
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

            {
                isTestMdl &&
                <TestMailSmsMdl
                    isOpen={isTestMdl}
                    toggle={() => setTestMdl(false)}
                    testType={"SMS"}
                />
            }
        </>
    );
};

export default SmsAPIConfig;
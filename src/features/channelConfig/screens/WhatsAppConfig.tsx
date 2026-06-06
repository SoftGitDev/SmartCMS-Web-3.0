
// Purpose: SMTP Config
// Created by: Harish 
// Created Date: 23-05-2026



import { useCallback, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { CheckCircle2, InfoIcon, LoaderCircle, MessageSquare, Send } from 'lucide-react';
import * as urls from '../../../services/axios/url';
import { apiRequest } from '../../../services/api/apiRequest';
import { SweetAlerts } from '../../../services/notification/sweetAlert';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';

export interface MailFormInitialValues {
    whatsAppAPI: string;
    whatsAppAPILabel?: string;
}

// Validation Schema
const smtpValidationSchema = Yup.object({
    whatsAppAPI: Yup.string().required('SMTP Host is required'),
});



const WhatsAppConfig: React.FC<{ userData: any }> = ({ userData }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [apiTypeData, setApiTypeData] = useState<any[]>([]);
    const [selectedDataWP, setSelectedDataWP] = useState<any>(null);
    const [isTestMdl, setTestMdl] = useState<boolean>(false);

    const getAPITypeCombo = useCallback(async () => {
        try {
            const payload = {
                serviceType: "SMS_API",
            };
            const config = {};
            const result = await apiRequest("POST", urls.getAPIConfigCombo, payload, config)
            if (result.status === "200" && result.success) {
                setApiTypeData(result.response.map((item: any) => ({
                    value: item.serviceCd,
                    label: item.serviceName || ''
                })))
            } else {
                setApiTypeData([]);
            }
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
                setSelectedDataWP(result.response.WhatsAppConfigCd);
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
            const payload = { WhatsAppConfigCd: data.whatsAppAPI };
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
                    whatsAppAPI: selectedDataWP || 0,
                    whatsAppILabel: apiTypeData.find(api => api.value === selectedDataWP)?.label || ""
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
                                className="h-100 border-0 p-4 shadow-sm overflow-hidden position-relative"
                                style={{ borderRadius: '16px', transition: 'all 0.3s ease', backgroundColor: '#ffffff' }}
                            >
                                <Card.Body className="p-0">

                                    {/* ── Header Section ── */}
                                    <div className="d-flex gap-3 justify-content-between mb-4">
                                        <div className='d-flex gap-3 align-items-center'>
                                            <div
                                                className="icon-wrapper d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                                                style={{
                                                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                                    width: '42px',
                                                    height: '42px'
                                                }}
                                            >
                                                <MessageSquare className="text-white" size={20} />
                                            </div>
                                            <div>
                                                <h6 className="m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>
                                                    WhatsApp Gateway Integration
                                                </h6>
                                                <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>
                                                    Select and provision your active WhatsApp Business Service Provider (BSP) client instance.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Dropdown Selection Field ── */}
                                    <Row className="g-3">
                                        <Col md={6} lg={4}>
                                            <SelectField
                                                label='WhatsApp  API'
                                                placeholder='Choose a WhatsApp API client profile...'
                                                required
                                                tabIndex={3}
                                                options={apiTypeData}
                                                name='whatsAppAPI'
                                                value={values.whatsAppAPI !== "" ? {
                                                    value: values.whatsAppAPI,
                                                    label: values.whatsAppILabel
                                                } : null}
                                                onChange={(e: any) => {
                                                    setFieldValue("whatsAppAPI", e?.value || '');
                                                    setFieldValue("whatsAppILabel", e?.label || '');
                                                }}
                                                onBlur={() => setFieldTouched("whatsAppAPI", true)}
                                            />
                                            <ErrorMessage name="whatsAppAPI" className="text-danger small mt-1 d-block" component="div" />
                                        </Col>
                                    </Row>

                                    {/* ── Informative Audit Context Note ── */}
                                    <div
                                        className="alert my-4 border-0 d-flex align-items-start gap-3 p-3 shadow-sm"
                                        style={{ backgroundColor: '#f0f9ff', borderRadius: '12px' }}
                                    >
                                        <InfoIcon className="text-primary flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <strong className="text-primary-emphasis d-block mb-1" style={{ fontSize: '13px' }}>
                                                Gateway Routing Operational Notice
                                            </strong>
                                            <p className="mb-0 text-muted" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                                                These endpoints map system notification triggers to your verified communication templates. Replacing or updating the primary API provider updates message routing rules globally instantly. Changes are logged securely with an active user trail for environment audit validation.
                                            </p>
                                        </div>
                                    </div>

                                    {/* ── Action Control Group ── */}
                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button
                                            variant="light"
                                            size='sm'
                                            className="d-flex align-items-center gap-2 border fw-medium px-3 py-2 text-secondary"
                                            style={{ borderRadius: '8px' }}
                                            onClick={() => { setTestMdl(true); }}
                                            disabled={isLoader}
                                            type="button"
                                        >
                                            <Send size={14} /> Test Core Connection
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant='primary'
                                            className="d-flex align-items-center gap-2 fw-semibold px-3 py-2"
                                            style={{ borderRadius: '8px' }}
                                            disabled={isSubmitting || isLoader}
                                        >
                                            {isLoader ? (
                                                <>
                                                    <LoaderCircle size={16} className='spinner-animation' />
                                                    Updating Router...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 size={16} />
                                                    Apply Configuration
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default WhatsAppConfig;
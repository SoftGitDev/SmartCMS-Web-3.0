// Purpose: Mail & SMS Config 
// Created by: Harish 
// Created Date: 22-05-2026

// Change History:




import { lazy, Suspense, useCallback, useState } from 'react'
import { CheckCheck, FileText, Settings2 } from 'lucide-react';
import { Card, Col, Row } from 'react-bootstrap';
import * as urls from '../../../services/axios/url';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import { apiRequest } from '../../../services/api/apiRequest';


const SMTPConfiguration = lazy(() => import("../components/SMTPConfiguration").then(({ default: SMTPConfiguration }) => ({ default: SMTPConfiguration })));
const MailAPIConfig = lazy(() => import("../components/MailAPIConfig").then(({ default: MailAPIConfig }) => ({ default: MailAPIConfig })));


const MailConfig: React.FC<{ userData: any }> = ({ userData }) => {
    const [activeTab, setActiveTab] = useState<string>("");
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [apiTypeData, setApiTypeData] = useState<any[]>([]);
    const [mailConfigData, setMailConfigData] = useState<any>(null);
    const [smtpComboData, setSmtpComboData] = useState<any[]>([]);


    // Get EMAIL API Combo
    const getAPITypeCombo = useCallback(async () => {
        try {
            const payload = {
                serviceType: "EMAIL_API",
            };
            const result = await apiRequest("POST", urls.getAPIConfigCombo, payload);
            if (result.status === "200" && result.success) {
                setApiTypeData(result.response.map((item: any) => ({
                    value: item.serviceCd,
                    label: item.serviceName || ''
                })));
            } else {
                setApiTypeData([]);
            }
        } catch (error: any) {
            // Ignore Case
        }
    }, []);

    // Get EMAIL API Combo
    const getSmtpCombo = useCallback(async () => {
        try {
            const payload = {};
            const config = {};
            const result = await apiRequest("POST", urls.getSmtpCombo, payload, config);
            if (result.status === "200" && result.success) {
                setSmtpComboData(result.response.map((item: any) => ({
                    value: item.tranCode,
                    label: item.description || ''
                })));
            } else {
                setApiTypeData([]);
            }
        } catch (error: any) {
            //   ignore Case
        }
    }, []);


    // Get Mail Config to determine active tab
    const getMailConfig = useCallback(async () => {
        try {
            setIsLoader(true);
            const payload = { type: 'MAIL' };
            const result = await apiRequest("POST", urls.getMailSmsConfig, payload);

            if (result.status === "200" && result.success) {
                const config = result.response;
                setMailConfigData(config);

                if (config.smtpType === 'SMTP') {
                    setActiveTab("overview");
                } else {
                    setActiveTab("details");
                }
            }
        } catch (error) {
            setActiveTab("overview");
        } finally {
            setIsLoader(false);
        }
    }, []);

    // Load data on component mount
    // useEffect(() => {
    //     getAPITypeCombo();
    //     getSmtpCombo();
    //     getMailConfig();
    // }, []);


    // Refresh mail config data
    const refreshMailConfig = useCallback(() => {
        getMailConfig();
    }, [getMailConfig]);


    return (
        <div>
            <Card className="h-100 border-0 rounded-3 p-3 m-3 mx-0 shadow-sm overflow-hidden position-relative">
                <Card.Body className="p-0">
                    <Row>
                        <Col sm={4} className='mt-sm-0 mt-3' onClick={() => { userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y" && setActiveTab("overview"); }} >
                            <div className={`twoFauthOption  w-100 pe-4 ${activeTab === "overview" ? "actice" : ""}`}>
                                <div className='icon-wrapper ms-2'>
                                    <Settings2 size={25} className='text-primary' />
                                </div>
                                <div>SMTP Configuration</div>
                                {activeTab === "overview" &&
                                    <CheckCheck size={25} className='ms-auto text-primary' style={{ fontSize: 30 }} />
                                }
                            </div>
                        </Col>

                        <Col sm={4} onClick={() => { userData?.permissions?.UPDATE_MAIL_CONFIG !== "Y" && setActiveTab("details") }}>
                            <div className={`twoFauthOption w-100 pe-4 ${activeTab === "details" ? "actice" : ""}`}>
                                <div className='icon-wrapper ms-2'>
                                    <FileText size={25} className='text-primary' />
                                </div>
                                <div>Mail API Configuration</div>
                                {activeTab === "details" &&
                                    <CheckCheck className='ms-auto text-primary' style={{ fontSize: 30 }} />
                                }
                            </div>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>

            {/* Content Panel */}
            {isLoader ? (
                <LoaderUI />
            ) : (
                <>
                    {activeTab === "overview" &&
                        <Suspense>
                            <SMTPConfiguration
                                userData={userData}
                                apiTypeData={smtpComboData}
                                mailConfigData={mailConfigData}
                            />
                        </Suspense>
                    }
                    {activeTab === "details" &&
                        <Suspense>
                            <MailAPIConfig
                                apiTypeData={apiTypeData}
                                mailConfigData={mailConfigData}
                                refreshMailConfig={refreshMailConfig}
                                userData={userData}
                            />
                        </Suspense>
                    }
                </>
            )}
        </div >
    )
}

export default MailConfig
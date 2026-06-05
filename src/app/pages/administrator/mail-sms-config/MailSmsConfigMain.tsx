// Purpose: Mail & SMS Config 
// Created by: Harish 
// Created Date: 07-01-2026

// Change History:
// 02-02-2026 | Pratik | Create a branch table compoenent and implement APIs
// 03-02-2026 | Yogesh | review code and made changes.
// --------------------------------------------------------------

import React, { lazy, Suspense } from 'react'
import { Layers, Mail, MessageSquare, Sliders, Sparkles } from 'lucide-react'
import { Tab, Tabs } from 'react-bootstrap'
import { getUserData } from '../../../utils/common';
import LoaderUI from '../../../components/loader/Loader';
import PageHeaeder from '../../../components/common/PageHeaeder';
import WhatsAppConfig from './wpConfig/WhatsAppConfig';

const SMTPConfig = lazy(() => import("./smtp-config/SMTPConfig").then(({ default: SMTPConfig }) => ({ default: SMTPConfig })));
const MailSMSTemplate = lazy(() => import("./templates/MailSMSTemplate").then(({ default: MailSMSTemplate }) => ({ default: MailSMSTemplate })));
const SmsAPIConfig = lazy(() => import("./sms-config/SmsAPIConfig").then(({ default: SmsAPIConfig }) => ({ default: SmsAPIConfig })));
const MailConfig = lazy(() => import("./mail-config/MailConfig").then(({ default: MailConfig }) => ({ default: MailConfig })));
const TemplateMapping = lazy(() => import("./mailSMSTemplateMapping/MailSMSTemplateMapping").then(({ default: TemplateMapping }) => ({ default: TemplateMapping })));


const MailSmsConfigMain = () => {

    const userData = getUserData();
    const [activeTab, setActiveTab] = React.useState("smtpconfig");

    const handleCheckPermission = (flag: string) => {
        if (flag === "VIEW_MAIL_CONFIG" && userData?.permissions?.[flag] === "N") {
            setActiveTab("smtpconfig");
        } else if (flag === "VIEW_SMS_CONFIG" && userData?.permissions?.[flag] === "N") {
            setActiveTab("smsconfig");
        } else if (flag === "VIEW_MAIL_SMS_TEMPLATE" && userData?.permissions?.[flag] === "N") {
            setActiveTab("templates");
        }

        return userData?.permissions?.[flag] === "Y"
    }


    return (
        <div>
            <Suspense>
                <PageHeaeder
                    Icon={Sliders}
                    title="Channel Configurations"
                    description="Configure and manage real-time communication channels, webhook integrations, SMS gateways, and automated email SMTP templates."
                />
            </Suspense>

            <Tabs defaultActiveKey="smtpconfig" onSelect={(tab: any) => { setActiveTab(tab) }} id="custom-tabs" className="custom-tab-bar bg-white">

                {/* {handleCheckPermission("VIEW_MAIL_CONFIG") && */}
                <Tab eventKey="smtpconfig" title={<><Mail size={16} className='me-1' /> SMTP Configurations</>} className='h-75'>
                    {activeTab === "smtpconfig" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <SMTPConfig />
                            </div>
                        </Suspense>
                    }
                </Tab>
                {/* } */}

                {/* {handleCheckPermission("VIEW_MAIL_CONFIG") && */}
                <Tab eventKey="mailconfig" title={<><Mail size={16} className='me-1' /> Mail Configurations</>} onSelect={() => setActiveTab("mailconfig")} className='h-75'>
                    {activeTab === "mailconfig" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <MailConfig userData={userData} />
                            </div>

                        </Suspense>
                    }
                </Tab>
                {/* } */}

                {/* {handleCheckPermission("VIEW_SMS_CONFIG") && */}
                <Tab eventKey="smsconfig" title={<><MessageSquare size={16} className='me-1' /> SMS Configurations</>} onSelect={() => setActiveTab("smsconfig")} className='h-75'>
                    {activeTab === "smsconfig" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <SmsAPIConfig userData={userData} />
                            </div>

                        </Suspense>
                    }
                </Tab>
                {/* } */}

                <Tab eventKey="wpConfig" title={<><MessageSquare size={16} className='me-1' /> WhatsApp Configurations</>} onSelect={() => setActiveTab("wpConfig")} className='h-75'>
                    {activeTab === "wpConfig" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <WhatsAppConfig userData={userData} />
                            </div>

                        </Suspense>
                    }
                </Tab>

                {/* {handleCheckPermission("VIEW_MAIL_SMS_TEMPLATE") && */}
                <Tab eventKey="templates" title={<><Sparkles size={16} className='me-1' /> Templates</>} onSelect={() => setActiveTab("templates")}>
                    {activeTab === "templates" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <MailSMSTemplate />
                            </div>

                        </Suspense>
                    }
                </Tab>
                {/* } */}

                <Tab eventKey="templatesMapping" title={<><Layers size={16} className='me-1' /> Templates Mapping</>} onSelect={() => setActiveTab("templatesMapping")}>
                    {activeTab === "templatesMapping" &&
                        <Suspense fallback={<LoaderUI />}>
                            <div className='p-3 pt-0'>
                                <TemplateMapping />
                            </div>

                        </Suspense>
                    }
                </Tab>
            </Tabs>
        </div >
    )
}

export default MailSmsConfigMain

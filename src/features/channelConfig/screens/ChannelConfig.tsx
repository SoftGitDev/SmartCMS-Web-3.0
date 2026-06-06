// Purpose: Channel configuration management screen.
// Created By: Harish
// Created Date: 05-06-2026


import React, { lazy, Suspense } from 'react'
import { Layers, Mail, MessageSquare, Sliders, Sparkles } from 'lucide-react'
import { Tab, Tabs } from 'react-bootstrap'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import { getUserData } from '../../../services/storage/common';
import PageHeaeder from '../../../common/components/common/PageHeaeder';


const SMTPConfig = lazy(() => import("./SMTPConfig").then(({ default: SMTPConfig }) => ({ default: SMTPConfig })));
const MailSMSTempMapp = lazy(() => import("./MailSMSTempMapp").then(({ default: MailSMSTempMapp }) => ({ default: MailSMSTempMapp })));
const WhatsAppConfig = lazy(() => import("./WhatsAppConfig").then(({ default: WhatsAppConfig }) => ({ default: WhatsAppConfig })));
const MailSMSTemplate = lazy(() => import("./MailSMSTemplate").then(({ default: MailSMSTemplate }) => ({ default: MailSMSTemplate })));
const SmsAPIConfig = lazy(() => import("./SmsAPIConfig").then(({ default: SmsAPIConfig }) => ({ default: SmsAPIConfig })));
const MailConfig = lazy(() => import("./MailConfig").then(({ default: MailConfig }) => ({ default: MailConfig })));


const ChannelConfig = () => {

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
                                <MailSMSTempMapp />
                            </div>

                        </Suspense>
                    }
                </Tab>
            </Tabs>
        </div >
    )
}

export default ChannelConfig

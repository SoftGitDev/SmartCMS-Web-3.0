import React, { Suspense, useState } from 'react';
import '../../../assets/styles/Email.css';
import { Button, Card, CardBody, Col, Nav, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import EmailTbl from '../components/EmailTbl';
import { Archive, Edit, Inbox, LucideMail, LucideTags, Mail, Send, Star, Trash2, Users } from 'lucide-react';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import EmailDtl from '../components/EmailDtl';
import EmailAdd from '../components/EmailAdd';
import PageHeaeder from '../../../common/components/common/PageHeaeder';

const EmailDashboard: React.FC = () => {
    const [key, setKey] = useState('primary');
    const [activeFolder, setActiveFolder] = useState('inbox');
    const [isEmailDtl, setIsEmailDtl] = useState<boolean>(false)
    const [isEmailAdd, setIsEmailAdd] = useState<boolean>(false)

    // Hnadle email Details screen
    const handleEmailDtl = () => {
        setIsEmailDtl(!isEmailDtl)
    }

    // Hnadle email Details screen
    const handleEmailAdd = () => {
        setIsEmailAdd(!isEmailAdd)
    }

    const folders = [
        { key: 'inbox', label: 'Inbox', icon: <Inbox size={16} />, count: 3 },
        { key: 'starred', label: 'Starred', icon: <Star size={16} />, count: 4 },
        { key: 'sent', label: 'Sent', icon: <Send size={16} />, count: 0 },
        { key: 'drafts', label: 'Drafts', icon: <Edit size={16} />, count: 2 },
        { key: 'archive', label: 'Archive', icon: <Archive size={16} />, count: 0 },
        { key: 'trash', label: 'Trash', icon: <Trash2 size={16} />, count: 0 },
    ];

    const receivedMails = [
        { id: 1, name: "Sarah Jenkins", email: "sarah.j@company.com" },
        { id: 2, name: "Alex Rivera", email: "arivera@designstudio.io" },
        { id: 3, name: "Tech Support", email: "support@cloud-infrastructure.net" },
        { id: 4, name: "Emma Watson", email: "emma.watson@enterprise.org" }
    ];

    return (
        <>
            <Suspense>
                <PageHeaeder
                    Icon={LucideMail}
                    title="Email Management"
                    description="Manage email configurations, monitor email activities, view message details, and handle email communications efficiently."
                />
            </Suspense>
            {/* Main Screen */}
            <div className="container-fluid p-3">
                <Row className="g-3">
                    {/* ================= LEFT SIDEBAR ================= */}
                    <Col md={2}>
                        <Card className="h-100">
                            <CardBody className="p-0">
                                {/* Compose Button */}
                                <div className="p-3">
                                    <Button className='w-100' onClick={handleEmailAdd}>
                                        <Edit size={16} /> Compose
                                    </Button>
                                </div>

                                {/* Folders */}
                                <div className="px-2 pb-2">
                                    <p className="text-uppercase fw-medium text-xs px-2 mb-1">
                                        Folders
                                    </p>
                                    <Nav
                                        variant="pills"
                                        activeKey={activeFolder}
                                        onSelect={(k) => setActiveFolder(k || 'inbox')}
                                        className="flex-column gap-1 custome-nav"
                                    >
                                        {folders.map(folder => (
                                            <Nav.Item key={folder.key}>
                                                <Nav.Link
                                                    eventKey={folder.key}
                                                    className="d-flex align-items-center gap-2 text-muted text-sm px-3 py-2 rounded-2"
                                                >
                                                    <span style={{ opacity: 0.75 }}>{folder.icon}</span>
                                                    <span style={{ flex: 1 }}>{folder.label}</span>
                                                    {folder.count > 0 && (
                                                        <span className="badge rounded-pill bg-primary">
                                                            {folder.count}
                                                        </span>
                                                    )}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </div>

                                {/* Divider */}
                                <hr style={{ margin: '8px 16px', borderColor: '#e5e7eb' }} />

                                {/* received Mail */}
                                <div className="px-2 pb-3">
                                    {/* Section Title */}
                                    <p className="text-uppercase px-2 mb-2 fw-semibold text-muted tracking-wider" style={{ fontSize: '11px' }}>
                                        All received Mail ID
                                    </p>

                                    {/* Mail List Container */}
                                    <div className="d-flex flex-column gap-1">
                                        {receivedMails.map((mail) => (
                                            <div id='' className='list-item-hover p-2 '>
                                                <div className="d-flex align-items-center gap-2 ">
                                                    <div className='blank-logo-email text-lg'>
                                                        {mail.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className='text-sm'>{mail.name}</div>
                                                        {/* <div className='text-xs text-muted'><span><Mail size={10} className='text-primary' /></span> {mail.email}</div> */}
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip id={`tooltip-email-${mail.id}`}>
                                                                    {mail.email}
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <div className="text-xs text-muted d-flex align-items-center gap-1 text-truncate" style={{ maxWidth: '120px', cursor: 'pointer' }}>
                                                                <span className="d-inline-flex align-items-center">
                                                                    <Mail size={10} className="text-primary" />
                                                                </span>
                                                                <span className="text-truncate">
                                                                    {mail.email}
                                                                </span>
                                                            </div>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* ================= MAIL CONTENT ================= */}
                    <Col md={!isEmailDtl ? '10' : '6'}>
                        <Card>
                            <CardBody className="p-0">
                                {isEmailAdd ?
                                    <EmailAdd
                                        show={isEmailAdd}
                                        handleClose={handleEmailAdd}
                                    />
                                    :
                                    <Tabs
                                        defaultActiveKey="primary"
                                        onSelect={(k) => setKey(k || 'primary')}
                                        id="primary-tabs"
                                        className="custom-tab-bar w-100 bg-white px-3 pt-2"
                                    >
                                        <Tab eventKey="primary" title={<><Mail size={16} className="me-2" />Primary</>}>
                                            <div className="p-3">
                                                <Suspense fallback={<LoaderUI />}>
                                                    <EmailTbl handleEmailDtl={handleEmailDtl} category="primary" />
                                                </Suspense>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="social" title={<><Users size={16} className="me-2" />Social</>}>
                                            <div className="p-3">
                                                <Suspense fallback={<LoaderUI />}>
                                                    <EmailTbl handleEmailDtl={handleEmailDtl} category="social" />
                                                </Suspense>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="promotions" title={<><LucideTags size={16} className="me-2" />Promotions</>}>
                                            <div className="p-3">
                                                <Suspense fallback={<LoaderUI />}>
                                                    <EmailTbl handleEmailDtl={handleEmailDtl} category="promotions" />
                                                </Suspense>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                }
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        {/* Email Dtl Screen */}
                        <EmailDtl
                            show={isEmailDtl}
                            handleClose={handleEmailDtl}
                        />
                    </Col>
                </Row>
            </div >
        </>

    );
};

export default EmailDashboard;
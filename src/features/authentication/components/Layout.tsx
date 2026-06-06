// Purpose: Layout Components
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Create a Layout component
// 21-05-2026 | Harish | Updated UI to match SecureBank portal design
// --------------------------------------------------------------

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import packageJson from '../../../../package.json';
import { FileCheck, GitMerge, Layers, Shield, ShieldCheck } from 'lucide-react';
import productLogo from '../../../assets/images/commone/logo.png'
// import layoutLeftImg from '../../../assets/images/commone/layoutLeftImg.jpg'
import layoutLeftImg from '../../../assets/images/commone/layoutLeftImg.jpg'
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    Note?: string;
    Headertitle?: string
}


const cmsFeatures = [
    {
        Icon: FileCheck,
        title: 'Automated Ticket Lifecycle',
        desc: 'Streamline operational flows with dynamic status tracking, automated agent routing, and SLA breach mitigation alerts.'
    },
    {
        Icon: GitMerge,
        title: 'Cross-Department Collaboration',
        desc: 'Unify communications with real-time audit logs, internal task cascading, and threaded version history controls.'
    },
    {
        Icon: Layers,
        title: 'Centralized Knowledge Base',
        desc: 'Optimize resolutions using index-optimized storage schemas, global metadata indexing, and deep full-text semantic search.'
    },
    {
        Icon: Shield,
        title: 'Enterprise Risk & Compliance',
        desc: 'Enforce zero-trust data access via cryptographically audited storage logs, AES-256 data isolation, and RBAC policies.'
    },
];

const Layout: React.FC<LayoutProps> = ({ children, title = "", Note = "", Headertitle = "" }) => {
    const version = packageJson.version;

    return (
        <div className="min-vh-100 d-flex position-relative w-100 overflow-hidden">
            {/* Placed between the logo and the Note, above children */}

            <Row className="flex-grow-1 w-100 m-0">
                {/* Left Side Content */}

                <Col
                    lg={8}
                    className="auth-panel-left d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden"
                    style={{
                        // backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://www.mastercontrol.com/images/default-source/gxp-lifeline/20222/august/2022-bl-data-integrity-standards_900x400.png?Status=Temp&sfvrsn=adfe7dcc_2')",
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${layoutLeftImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '100vh',
                    }}
                >
                    {/* Logo */}
                    <div
                        className="d-flex align-items-center gap-3 position-relative"
                        style={{ zIndex: 2 }}
                    >
                        <div
                            className="auth-brand-icon d-flex align-items-center justify-content-center rounded-3"
                            style={{
                                width: 48,
                                height: 48,
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            <ShieldCheck size={24} className="text-white" />
                        </div>

                        <div>
                            <h5 className="mb-0 fw-bold text-white">Smart CMS</h5>

                            <p
                                className="mb-0 text-white-50 text-uppercase fw-medium"
                                style={{
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                Soft-tech Solutions
                            </p>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div
                        className="position-relative"
                        style={{ zIndex: 2, maxWidth: '1000px' }}
                    >
                        <h1 className="fw-bold mb-4 text-white"
                            style={{
                                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.04em',
                            }}
                        >
                            Complaint Management{' '}
                            <span className="text-primary" >
                                System
                            </span>
                        </h1>
                        <p className="fs-6 text-white mb-5 lh-base" style={{ maxWidth: '90%' }}>
                            Streamline ticket tracking with our intelligent accordion views.
                            Expand complex complaint details instantly while maintaining a clean,
                            clutter-free dashboard workspace.
                        </p>


                        {/* Feature Grid */}
                        <Row className="g-4">
                            {cmsFeatures.map(({ Icon, title: ftitle, desc }) => (
                                <Col xs={6} key={ftitle}>
                                    <div className="auth-feature-card rounded-4 p-4 h-100" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', }}>
                                        <div className="mb-3 d-inline-block p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.12)', }} >
                                            <Icon size={20} />
                                        </div>
                                        <h6 className="mb-2 fw-bold text-white">
                                            {ftitle}
                                        </h6>
                                        <p className="mb-0 text-white-50 small lh-sm">
                                            {desc}
                                        </p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Footer */}
                    <div className="d-flex align-items-center justify-content-between text-white-50 position-relative" style={{ zIndex: 2, fontSize: '0.7rem', }} >
                    </div>
                </Col>
                {/* Right Side Vault Panel */}
                <Col className="d-flex flex-column bg-white position-relative" style={{ minHeight: '100vh' }}>
                    <div className="m-4 m-md-5 z-index-2">
                    </div>
                    <div className="flex-grow-1 d-flex flex-column justify-content-center w-100 mx-auto px-4" style={{ maxWidth: '520px' }}>
                        <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
                            <img
                                src={productLogo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: 120, width: 150 }}
                            />

                            {Headertitle && (
                                <>
                                    <span className="fs-4 text-muted">|</span>
                                    <h5 className="mb-0">{Headertitle}</h5>
                                </>
                            )}
                        </div>
                        {title && (
                            <div className="mb-0">
                                {title}
                            </div>
                        )}
                        {Note && (
                            <div className="mb-4 mt-1">
                                <p className="text-muted text-sm mb-0" style={{ lineHeight: 1.6, }}>
                                    {Note}
                                </p>
                            </div>
                        )}
                        {children}
                        <div className="mt-3 pt-3 border-top border-light">
                            <div className="text-center">

                                {/* <div className="text-muted opacity-75" style={{ fontSize: "9px", lineHeight: '1.6' }}>
                                    Designed & Developed By <span className="fw-semibold text-dark">SOFT-TECH SOLUTIONS</span><br />
                                    Copyright © 2014 - {new Date().getFullYear()}
                                </div> */}
                                <div className="text-muted opacity-75 -2" style={{ fontSize: "10px", lineHeight: '1.6' }}>
                                    Developed By <Link to={'https://suretytelco.com/'} target='_blank' className="fw-semibold text-primary"> SURETY-TELCO </Link> | Sales by  <Link to={'https://soft-techsolutions.com/'} target='_Blank' className="fw-semibold text-success">SOFT-TECH SOLUTIONS</Link> <br />
                                </div>
                                <div className="text-muted opacity-75 mt-1" style={{ fontSize: "10px", lineHeight: '1.6' }}>
                                    Copyright © 2014 - {new Date().getFullYear()} | All Right Reserved
                                </div>
                                <div className="text-muted mb-1 mt-2" style={{ fontSize: "11px", letterSpacing: '0.5px' }}>
                                    VERSION <span className="text-primary fw-bold">{version}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-auto m-3 m-md-3 pt-2 border-top d-flex align-items-center gap-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: '#dcfce7', width: '30px', height: '30px' }} >
                            <ShieldCheck size={15} className="text-success" />
                        </div>
                        <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }} >
                            Protected and Secured by Soft-Tech Solutions Private Limited
                        </span>
                    </div> */}

                </Col>
            </Row>
        </div >
    );
};

export default Layout;
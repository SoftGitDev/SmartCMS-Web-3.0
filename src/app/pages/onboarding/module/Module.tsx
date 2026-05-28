// Purpose: OnBoarding Step Third - Module Setup Component
// Created by: Harish
// Created Date: 21-05-2026

// Change History:
// 21-05-2026 | Harish | Created Module Setup Component
// --------------------------------------------------------------

import React from 'react';
import { Row, Col, Card, } from 'react-bootstrap';
import { Ticket, Shield, Users, Workflow, Briefcase, Mail, MessageCircle, Smartphone, PhoneCall, CheckCircle2, } from 'lucide-react';
import { motion } from 'framer-motion';

// Props Interface

interface ModuleProps {
    values: any;
    setFieldValue: (field: string, value: any) => void;
}


// Component
const Module: React.FC<ModuleProps> = ({ values, setFieldValue, }) => {
    // Module List
    const moduleList = [
        // {
        //     key: 'ticketAdminPanel',
        //     title: 'Admin Panel',
        //     subtitle: 'Internal Use Only',
        //     icon: Shield,
        // },

        {
            key: 'ticketClientPanel',
            title: 'Client Panel',
            subtitle: 'External Use Only',
            icon: Users,
        },

        {
            key: 'ticketIntegService',
            title: 'Ticket Integration Service',
            subtitle: 'Connect external ticket systems',
            icon: Workflow,
        },

        {
            key: 'serviceModule',
            title: 'Service Module',
            subtitle: 'Manage organization services',
            icon: Briefcase,
        },

        {
            key: 'mailModule',
            title: 'Mail Module',
            subtitle: 'Email communication service',
            icon: Mail,
        },

        {
            key: 'whatsappInteg',
            title: 'Whatsapp Integration',
            subtitle: 'Whatsapp communication support',
            icon: MessageCircle,
        },

        {
            key: 'smsInteg',
            title: 'SMS Integration',
            subtitle: 'SMS notification service',
            icon: Smartphone,
        },

        {
            key: 'ivrInteg',
            title: 'IVR Integration',
            subtitle: 'Call and IVR management',
            icon: PhoneCall,
        },
    ];

    // Handle Toggle
    const handleToggle = (field: string) => {
        setFieldValue(field, !values[field]);
    };

    return (
        <div className="p-4 pt-0">
            {/* Ticketing Module */}
            <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <Ticket size={18} className='text-primary' />
                    <h6 className="fw-semibold mb-0">
                        Ticketing Module
                    </h6>
                </div>

                <Row className="g-4">
                    {moduleList.map((item, index) => {
                        const Icon = item.icon;
                        const isSelected = values[item.key];
                        return (
                            <Col lg={4} md={6} key={index}>
                                <motion.div
                                    whileHover={{ y: -5, }}
                                    whileTap={{ scale: 0.98, }}
                                    transition={{ duration: 0.2, }}
                                >
                                    <Card onClick={() => handleToggle(item.key)} className={`module-card border-0 rounded-4 h-100 ${isSelected ? 'module-card-active' : ''}`}>
                                        <Card.Body>
                                            {/* Top */}
                                            <div className="d-flex align-items-start justify-content-between mb-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 50, height: 50, background: isSelected ? 'var(--primaryColor25)' : '#f8f9fa', }}>
                                                    <Icon size={22} className={isSelected ? 'text-primary' : 'text-muted'} />
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className='text-primary' size={20} />
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div>
                                                <h6 className="fw-semibold mb-1" >
                                                    {item.title}
                                                </h6>
                                                <p className="text-muted text-sm mb-0" >
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default Module;
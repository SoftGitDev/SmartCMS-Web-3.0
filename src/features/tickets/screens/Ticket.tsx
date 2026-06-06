// Purpose: Ticket Management - Manage tickets, ticket records, status tracking, assignments, and support operations
// Created by: Harish
// Created Date: 02-06-2026

import React, { Suspense, useState } from 'react';
import { LucideAlertTriangle, LucideCircleCheckBig, LucideClipboardList, LucideClock3, LucideLoaderCircle, LucideTicket, PlusCircle } from 'lucide-react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import '../../../assets/styles/Ticket.css'
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import TicketTbl from '../components/TicketTbl';
import CreateTicket from '../components/CreateTicket';

const ticketStats = [
    {
        title: "Total Tickets",
        value: 89,
        percentage: "All Time",
        icon: LucideClipboardList,
        color: "#2563eb",
        bg: "#eff6ff"
    },
    {
        title: "Open",
        value: 58,
        percentage: "65.2%",
        icon: LucideTicket,
        color: "#2563eb",
        bg: "#eff6ff"
    },
    {
        title: "Pending",
        value: 12,
        percentage: "13.5%",
        icon: LucideClock3,
        color: "#d97706",
        bg: "#fff7ed"
    },
    {
        title: "In Progress",
        value: 7,
        percentage: "7.9%",
        icon: LucideLoaderCircle,
        color: "#9333ea",
        bg: "#faf5ff"
    },
    {
        title: "Resolved",
        value: 35,
        percentage: "39.3%",
        icon: LucideCircleCheckBig,
        color: "#16a34a",
        bg: "#f0fdf4"
    },
    {
        title: "Overdue",
        value: 3,
        percentage: "3.4%",
        icon: LucideAlertTriangle,
        color: "#dc2626",
        bg: "#fef2f2"
    }
];

const Ticket = () => {
    const [isCreateTicket, setIsCreateTicket] = useState<boolean>(false)

    // Handle Create Ticket mange show and hide
    const handleCreateTicket = () => {
        setIsCreateTicket(!isCreateTicket)
    }

    return (
        <>
            {/* Header */}
            <Suspense>
                <PageHeaeder
                    Icon={LucideTicket}
                    title="Ticket Management"
                    description="Manage ticket records, assignments, priorities, statuses, and support operations"
                    button={<div className='ms-auto'>
                        <Button size='sm' onClick={handleCreateTicket}>
                            <PlusCircle size={15} /> Add New Ticket
                        </Button>
                    </div>}
                />
            </Suspense>

            <div className='p-3'>

                {/* Header Card UI */}
                <Row className="g-3">
                    {ticketStats.map((item, index) => {
                        // FIX: Destructure properties from item so they can be accessed below
                        const { title, value, percentage, icon: Icon, color, bg } = item;
                        return (
                            <Col key={index} xl={2} lg={4} md={6} sm={6}>
                                <Card className="border-0 shadow-sm h-100 ticket-stat-card">
                                    <Card.Body className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 52, height: 52, backgroundColor: bg }} >
                                            <Icon size={24} color={color} />
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-1">{title}</h6>
                                            <h3 className="fw-bold mb-1">{value}</h3>
                                            <span style={{ color: title === "Overdue" ? "#dc2626" : color }}>
                                                {percentage}
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Table UI */}
                <div className='mt-3'>
                    <TicketTbl />
                </div>

                {isCreateTicket &&
                    <CreateTicket
                        show={isCreateTicket}
                        handleClose={handleCreateTicket}
                    />
                }
            </div>
        </>
    );
};

export default Ticket;
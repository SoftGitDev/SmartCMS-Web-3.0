import React from 'react';
import { Col, Row, Card, Nav, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
    LucideTicket, LucideCalendar, LucideLayers, LucideGitBranch,
    LucideSettings, LucideTag, LucideShieldAlert, LucideEye,
    LucideUser, LucideFileText, LucideNetwork, LucidePhone, LucidePencil,
    Info
} from 'lucide-react';

// Reusing the dataset from the previous step to populate the detail views
const ticketData = [
    {
        id: 4,
        avatarInitials: "VI",
        ticketId: "#SOFT2605T0005",
        subject: "VAPT AUTHORIZED TEST - VAPT_XSS_20260509_1778310663",
        branch: "IT_Department",
        ticketType: "Service",
        category: "WhatsApp Business API",
        priority: "High",
        status: "Assigned",
        internalVisibility: "Internal",
        requestedBy: "External",
        classification: "Production",
        createdBy: "Dhruv",
        ipAddress: "101.53.213.134",
        mobileNo: "9999999998",
        createdDate: "09-05-2026 12:41 PM"
    },
    // ... other records
];

const Ticketdtl = () => {
    const { ticketId } = useParams();

    // Find the specific ticket or fallback to record #4 matching your screenshot
    const ticket = ticketData.find(t => t.ticketId === ticketId) || ticketData[0];

    return (
        <div className="p-3 bg-light ">
            <Row className="g-4">
                {/* Left side space placeholder ("main screen") */}
                <Col lg={8} md={6} xs={12}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="text-muted">Main Content Area</h5>
                            <p className="text-secondary small">Ticket active description, threads, or chat systems go here.</p>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right side Details Screen Card */}
                <Col lg={4} md={6} xs={12}>
                    <Card className="border-0 shadow-sm h-100 overflow-hidden">

                        {/* Tab Headers */}
                        <Card.Header className="bg-white border-0 p-0">
                            <Nav variant="tabs" defaultActiveKey="details" className="border-bottom px-3">
                                <Nav.Item>
                                    <Nav.Link eventKey="details" className="fw-bold px-4 py-3 text-primary border-0 border-bottom border-primary border-3">
                                        Ticket Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="assign" className="text-muted fw-semibold px-4 py-3 border-0">
                                        Assign List
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>

                        <Card.Body className="p-4">
                            <h5 className="mb-4 text-lg fw-bold text-dark d-flex align-items-center gap-2">
                                Ticket Information
                                <Info size={17} />
                            </h5>

                            {/* Top Block: Summary Cards */}
                            <Row className="g-3 mb-4">
                                <Col xs={6}>
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: '#f1f5f9' }}>
                                        <div className="p-2 bg-white rounded-3 shadow-sm text-primary d-flex align-items-center">
                                            <LucideTicket size={20} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block mb-1">Ticket ID</small>
                                            <span className="fw-bold text-dark text-sm fs-6">{ticket.ticketId}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: '#f1f5f9' }}>
                                        <div className="p-2 bg-white rounded-3 shadow-sm text-primary d-flex align-items-center">
                                            <LucideCalendar size={20} />
                                        </div>
                                        <div>
                                            <small className="text-muted d-block mb-1">Created Date</small>
                                            <span className="fw-bold text-sm text-dark fs-6" style={{ fontSize: '0.85rem' }}>{ticket.createdDate}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Detailed Rows List Layout */}
                            <div className="d-flex flex-column gap-2">

                                {/* Status */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideLayers size={16} /> Status</span>
                                    <Badge bg="info" className="bg-opacity-10 text-info px-3 py-2 rounded-pill fw-semibold">{ticket.status}</Badge>
                                </div>

                                {/* Branch */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideGitBranch size={16} /> Branch</span>
                                    <span className="fw-semibold text-dark">{ticket.branch}</span>
                                </div>

                                {/* Ticket Type */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideSettings size={16} /> Ticket Type</span>
                                    <span className="fw-semibold text-dark">{ticket.ticketType}</span>
                                </div>

                                {/* Category */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideTag size={16} /> Category</span>
                                    <span className="fw-semibold text-dark">{ticket.category}</span>
                                </div>

                                {/* Priority */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideShieldAlert size={16} /> Priority</span>
                                    <Badge bg="danger" className="bg-opacity-10 text-danger px-3 py-2 rounded-pill fw-semibold">{ticket.priority}</Badge>
                                </div>

                                {/* Internal Visibility */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideEye size={16} /> Internal Visibility</span>
                                    <span className="fw-semibold text-dark d-flex align-items-center gap-2">
                                        <LucideEye size={16} className="text-secondary" /> {ticket.internalVisibility}
                                        <LucidePencil size={14} className="text-primary cursor-pointer ms-1" />
                                    </span>
                                </div>

                                {/* Requested By */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideUser size={16} /> Requested By</span>
                                    <span className="fw-semibold text-dark">{ticket.requestedBy}</span>
                                </div>

                                {/* Classification */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideFileText size={16} /> Classification</span>
                                    <span className="fw-semibold text-dark">{ticket.classification}</span>
                                </div>

                                {/* Created By */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideUser size={16} /> Created By</span>
                                    <span className="fw-semibold text-dark">{ticket.createdBy}</span>
                                </div>

                                {/* IP Address */}
                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom border-light">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucideNetwork size={16} /> IP Address</span>
                                    <span className="fw-semibold text-dark">{ticket.ipAddress}</span>
                                </div>

                                {/* Mobile No. */}
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span className="text-muted d-flex align-items-center gap-2"><LucidePhone size={16} /> Mobile No.</span>
                                    <span className="fw-semibold text-dark">{ticket.mobileNo}</span>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Ticketdtl;
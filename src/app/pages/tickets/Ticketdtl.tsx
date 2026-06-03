import React, { useRef, useState } from 'react';
import { Col, Row, Card, Nav, Badge, CardHeader, Button, Dropdown, FormCheck } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
    LucideTicket, LucideCalendar, LucideLayers, LucideGitBranch,
    LucideSettings, LucideTag, LucideShieldAlert, LucideEye,
    LucideUser, LucideFileText, LucideNetwork, LucidePhone, LucidePencil,
    Info,
    TicketSlashIcon,
    CheckCircle,
    ChevronDown,
    Calendar,
    Phone,
    Network,
    User,
    FileText,
    Pencil,
    Eye,
    ShieldAlert,
    Tag,
    Settings,
    GitBranch,
    Layers,
    Users,
    MessageCircleDashedIcon,
    MoreVertical,
    MessageSquare,
    Send,
    Paperclip,
    X,
    CornerUpLeft,
    XCircle
} from 'lucide-react';
import StatusBadge from '../../components/ui/customBadge/StatusBadge';
import Editor from '../../components/ui/editor/Editor';
import Input from 'react-select/dist/declarations/src/components/Input';

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

// 2. Dummy Data replicating CMS ATM service issue workflow (7-8 Records)
const internalNotesData: any[] = [
    {
        id: 1,
        senderName: "Tilak Sharma (Field Executive)",
        avatarLetter: "T",
        timestamp: "02:15 PM",
        message: "ATM ID: CMS-MUM-0422 experiencing cash dispenser jam. Cassette 2 is throwing a physical hardware timeout error code: E042. Needs immediate component lookup.",
        isInternalNote: false,
        avatarBgColor: "#ffeecb", // Soft amber for field alerts
        cardBgColor: "#ffffff"    // Incoming message (White)
    },
    {
        id: 2,
        senderName: "Vasai Vikas Sahakari Bank Ltd (Admin)",
        avatarLetter: "V",
        timestamp: "02:22 PM",
        message: "Logged ATM Downtime in Central CMS console. Route optimization team has been alerted. Prateek, could you verify if the middleware switch is receiving ping packets from this terminal?",
        isInternalNote: true,
        avatarBgColor: "#0d6efd", // Admin Blue
        cardBgColor: "#d9fdd3"    // WhatsApp Sent Note (Light Green)
    },
    {
        id: 3,
        senderName: "Prateek Suthar (Technical Support)",
        avatarLetter: "P",
        timestamp: "02:30 PM",
        message: "Checked middleware logs. Switch connectivity is stable, so the fault is purely mechanical at the kiosk end. Dispatched replacement dispenser gears with the local vendor.",
        isInternalNote: true,
        avatarBgColor: "#6f42c1", // Tech Support Purple
        cardBgColor: "#d9fdd3"    // WhatsApp Sent Note (Light Green)
    },
    {
        id: 4,
        senderName: "Tilak Sharma (Field Executive)",
        avatarLetter: "T",
        timestamp: "03:05 PM",
        message: "Vendor has arrived on-site with the replacement parts. Beginning physical extraction of Cassette 2 now. Kiosk switch set to Maintenance Mode.",
        isInternalNote: false,
        avatarBgColor: "#ffeecb",
        cardBgColor: "#ffffff"    // Incoming message (White)
    },
    {
        id: 5,
        senderName: "Prateek Suthar (Technical Support)",
        avatarLetter: "P",
        timestamp: "03:12 PM",
        message: "Note for the team: If Tilak requests a remote cash-count initialization cycle, please approve immediately via the CMS switchboard panel. Do not wait for manual dual-auth.",
        isInternalNote: true,
        avatarBgColor: "#6f42c1",
        cardBgColor: "#d9fdd3"    // WhatsApp Sent Note (Light Green)
    },
    {
        id: 6,
        senderName: "Vasai Vikas Sahakari Bank Ltd (Admin)",
        avatarLetter: "V",
        timestamp: "03:35 PM",
        message: "Received remote testing request from Kiosk terminal. Initiating diagnostic test cycle for Cassette 1 and Cassette 2 now. Monitoring physical load limits.",
        isInternalNote: true,
        avatarBgColor: "#0d6efd",
        cardBgColor: "#d9fdd3"    // WhatsApp Sent Note (Light Green)
    },
    {
        id: 7,
        senderName: "Tilak Sharma (Field Executive)",
        avatarLetter: "T",
        timestamp: "03:48 PM",
        message: "Replacement successful. Test cycle passed with 0 errors. Dispenser gears calibrated, physical jam cleared, and cash counts match ledger. Bringing terminal back online.",
        isInternalNote: false,
        avatarBgColor: "#ffeecb",
        cardBgColor: "#ffffff"    // Incoming message (White)
    },
    {
        id: 8,
        senderName: "Vasai Vikas Sahakari Bank Ltd (Admin)",
        avatarLetter: "V",
        timestamp: "03:55 PM",
        message: "Confirmed. CMS Central dashboard shows ATM ID: CMS-MUM-0422 status as ACTIVE. Downtime ticker stopped. Closing this ticket thread.",
        isInternalNote: true,
        avatarBgColor: "#0d6efd",
        cardBgColor: "#d9fdd3"    // WhatsApp Sent Note (Light Green)
    }
];


const Ticketdtl = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [activeTab, setActiveTab] = useState<string>('internal');
    // Find the specific ticket or fallback to record #4 matching your screenshot
    const ticket = ticketData.find(t => t.ticketId === ticketId) || ticketData[0];

    const [isReply, setIsReply] = useState<boolean>(false);
    const [editorData, setEditorData] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
    };


    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSendReply = () => {
        // Process form actions cleanly
        console.log({ message: editorData, isPrivate, file: attachedFile });
        // Reset layout fields
        setIsReply(false);
        setEditorData('');
        setAttachedFile(null);
    };


    // 1. Initialize state array instead of single variable target
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

    // 2. Append newly uploaded array elements safely
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const chosenFiles = Array.from(e.target.files);
            setAttachedFiles((prevFiles) => [...prevFiles, ...chosenFiles]);
        }
    };

    // 3. Remove targeted file index block
    const removeAttachedFile = (indexToRemove: number) => {
        setAttachedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== indexToRemove));
    };
    return (
        <>
            <div className="p-3 bg-light" >
                {/* Back Button  */}
                <div className='d-flex justify-content-between mb-2 align-items-center gap-3'>
                    <div>
                        <h6 className='text-primary mb-0'>
                            Ticket Details
                        </h6>
                    </div>
                    <div>
                        <Button size='sm' onClick={() => navigate('/tickets')}>
                            Back
                        </Button>
                    </div>
                </div>

                <Row className="" >
                    {/* Left side space placeholder ("main screen") */}
                    <Col lg={8} md={6} xs={12}>
                        <Card className="border-0  " >
                            <Card.Body className="p-2 pb-0"> {/* Padding adjustments for pristine alignment */}
                                {/* Top Section: Icon, Content, and Status Dropdown Pill */}
                                <CardHeader className='bg-white'>
                                    <div className="d-flex align-items-start  justify-content-between flex-wrap gap-3 mb-2">

                                        {/* Left Side Grouping: Icon + Texts */}
                                        <div className="d-flex align-items-center gap-3">
                                            {/* Circular Icon Container */}
                                            <div className="bg-primary-50 d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '54px', height: '54px' }}>
                                                <TicketSlashIcon className='text-primary' />
                                            </div>

                                            {/* Title & Metadata Badges */}
                                            <div>
                                                <h6 className="fw-semibold text-dark mb-2 text-break" > VAPT AUTHORIZED TEST - VAPT_XSS_20260509_1778310663</h6>
                                                {/* Meta Badges Layout */}
                                                <div className="d-flex align-items-center flex-wrap gap-2 text-secondary text-xs font-sm">
                                                    <StatusBadge label='#SOFT2605T0005' />
                                                    {/* Priority Badge */}
                                                    <StatusBadge variant='danger' label='High' />
                                                    {/* Date Stamp */}
                                                    <div className="d-flex align-items-center gap-1 text-sm text-muted ms-1">
                                                        <Calendar size={14} className="opacity-75" />
                                                        <span>09 May 2026 12:42:10 PM</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Right Side: Assigned Status Dropdown Action */}
                                        {/* <Button variant='light'>
                                            Reply
                                        </Button> */}
                                    </div>
                                </CardHeader>
                                <hr className='mt-0' />


                                {/* Bottom Section: Underlined Tabs Navigation */}
                                <Nav
                                    variant="tabs"
                                    activeKey={activeTab}
                                    onSelect={(k) => setActiveTab(k || 'internal')}
                                    className="custom-tab-bar w-100  bg-white"
                                >
                                    <Nav.Item className="me-2">
                                        <Nav.Link eventKey="internal" className={`px-3 pb-2 pt-0 border-0 rounded-0 bg-transparent `}>
                                            <Users size={18} className='me-1' />  Internal Team
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="external" className={`px-3 pb-2 pt-0 border-0 rounded-0 bg-transparent `}>
                                            <MessageCircleDashedIcon size={18} className='me-1' /> External
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                {/* Internal */}
                                {activeTab === 'internal' && (
                                    <>
                                        <div style={{ backgroundColor: '#efeae2', padding: '20px rounded' }} className='p-2'>
                                            {/* Timeline Tree Wrapper */}
                                            <div className="position-relative " style={{ maxHeight: '440px', overflow: 'auto' }}>
                                                <div className="d-flex mt-4 justify-content-center mb-4">
                                                    <span className="badge bg-light text-secondary border rounded-pill px-3 py-1.5 text-xs fw-medium ">
                                                        Feb 25, 2026
                                                    </span>
                                                </div>
                                                {/* Loop through timeline activities */}
                                                <div className="d-flex flex-column gap-3 my-3 px-2" > {/* WhatsApp chat background color */}
                                                    {internalNotesData.map((item) => {
                                                        const isReplyFromStaff = item.isInternalNote;

                                                        return (
                                                            <div key={item.id} className={`position-relative d-flex w-100 gap-2 align-items-end ${isReplyFromStaff ? 'flex-row-reverse' : ''}`} style={{ zIndex: 2 }} >

                                                                {/* Left/Right Avatar Structure */}
                                                                <div className="position-relative flex-shrink-0 mb-1">
                                                                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-semibold " style={{ width: '36px', height: '36px', backgroundColor: item.avatarBgColor, color: isReplyFromStaff ? '#ffffff' : '#0f5132', fontSize: '14px' }}>
                                                                        {item.avatarLetter}
                                                                    </div>
                                                                </div>

                                                                {/* WhatsApp Chat Bubble Card Block */}
                                                                <div className="position-relative p-2 px-3 " style={{ backgroundColor: isReplyFromStaff ? '#d9fdd3' : '#ffffff', color: '#111b21', maxWidth: '70%', borderRadius: isReplyFromStaff ? '12px 12px 0px 12px' : '12px 12px 12px 0px', border: 'none' }}>
                                                                    {/* Custom CSS Speech Bubble Triangle Tail */}
                                                                    <div
                                                                        className="position-absolute"
                                                                        style={{
                                                                            bottom: '0',
                                                                            [isReplyFromStaff ? 'right' : 'left']: '-6px',
                                                                            width: '0',
                                                                            height: '0',
                                                                            borderStyle: 'solid',
                                                                            borderWidth: isReplyFromStaff ? '8px 0 0 8px' : '8px 8px 0 0',
                                                                            borderColor: isReplyFromStaff
                                                                                ? 'transparent transparent transparent #d9fdd3'
                                                                                : 'transparent #ffffff transparent transparent',
                                                                        }}
                                                                    />

                                                                    {/* Sender Name Display */}
                                                                    <div className="fw-bold text-xs mb-1" style={{ color: isReplyFromStaff ? '#00a884' : '#53bdeb' }}>
                                                                        {item.senderName}
                                                                    </div>

                                                                    {/* Message Body Content Layout */}
                                                                    <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 text-sm">
                                                                        <div className="text-start pb-1" style={{ wordBreak: 'break-word', flex: '1 1 auto' }}>
                                                                            {item.message}
                                                                        </div>

                                                                        {/* WhatsApp Style Bottom-Right Inline Timestamp */}
                                                                        <div
                                                                            className="text-end text-muted text-xs ms-auto flex-shrink-0"
                                                                            style={{ fontSize: '10px', minWidth: '50px', marginBottom: '-2px' }}
                                                                        >
                                                                            {item.timestamp}
                                                                            {isReplyFromStaff && (
                                                                                <span className="ms-1 text-primary" style={{ fontSize: '12px' }}>✓✓</span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                            </div>


                                        </div>

                                        {/* Reply UI */}
                                        <div className="w-100 ">
                                            {/* State A: Action trigger button hidden when writing */}
                                            <div className="d-flex justify-content-end w-100 my-3">
                                                {!isReply && (
                                                    <Button
                                                        onClick={() => setIsReply(true)}
                                                        className="d-flex align-items-center gap-2 px-4 py-2 border-0 fw-semibold text-sm shadow-sm"
                                                        style={{
                                                            backgroundColor: '#00667e', // Teal color accent matching your interface theme
                                                            borderRadius: '6px'
                                                        }}
                                                    >
                                                        <CornerUpLeft size={16} />
                                                        <span>Reply to Ticket</span>
                                                    </Button>
                                                )}
                                            </div>

                                            {/* State B: Active Styled Reply Rich Text Component Card Layout */}
                                            {isReply && (
                                                <div className="card w-100 border border-light-subtle rounded-3  bg-white overflow-hidden animate-fade-in">
                                                    {/* Card Context Title Input Area */}
                                                    <div className="card-header bg-white border-bottom-0 pt-3 px-3 pb-1 d-flex justify-content-between align-items-center">
                                                        <span className="text-secondary fw-medium" style={{ fontSize: '13px' }}>
                                                            Write a reply...
                                                        </span>
                                                        <Button
                                                            variant="link"
                                                            className="text-muted p-0 text-decoration-none hover-text-dark"
                                                            onClick={() => setIsReply(false)}
                                                        >
                                                            <X size={16} />
                                                        </Button>
                                                    </div>

                                                    {/* Integrated Rich Text Block Core */}
                                                    <div className="px-3 pb-2 custom-ckeditor-wrapper">
                                                        <Editor
                                                            value={editorData}
                                                            onChange={handleEditorChange}
                                                            placeholder="Type your system message or resolution logs here..."
                                                        />
                                                    </div>

                                                    {/* Card Actions Footer Ribbon Base layout */}
                                                    <div className="card-footer bg-white border-top border-light-subtle ">
                                                        {/* Top Row: Attachment Trigger & Submission Controls */}
                                                        <div className="d-flex align-items-center justify-content-between">

                                                            {/* Left: Hidden File Node triggered via Custom Area */}
                                                            <div>
                                                                <input
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    onChange={handleFileChange}
                                                                    className="d-none"
                                                                    id="ticket-file-attachment"
                                                                    multiple // Enable native selection for multiple records concurrently
                                                                />
                                                                <div
                                                                    onClick={triggerFileInput}
                                                                    className="d-flex align-items-center gap-2 text-secondary hover-opacity"
                                                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                                                >
                                                                    <div className="p-2 bg-light rounded-circle border d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                                                                        <Paperclip size={16} className={attachedFiles.length > 0 ? "text-success" : "text-secondary"} />
                                                                    </div>
                                                                    <div className="d-flex flex-column text-start">
                                                                        <span className="fw-semibold text-dark text-sm m-0" style={{ fontSize: '13px', lineHeight: '1.2' }}>
                                                                            Attach files
                                                                        </span>
                                                                        <span className="text-muted text-xs" style={{ fontSize: '11px' }}>
                                                                            Up to 5 MB per file
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Right: Validation Conditions & Form Operations Submission */}
                                                            <div className="d-flex align-items-center gap-3">
                                                                {/* Private Checkbox Note Trigger */}
                                                                <div className="d-flex align-items-center gap-1">
                                                                    <FormCheck
                                                                        type="checkbox"
                                                                        id="internal-private-toggle"
                                                                        label={
                                                                            <span className="text-secondary text-sm fw-medium ms-1" style={{ fontSize: '13.5px', userSelect: 'none' }}>
                                                                                Private note
                                                                            </span>
                                                                        }
                                                                        checked={isPrivate}
                                                                        onChange={(e: any) => setIsPrivate(e.target.checked)}
                                                                        className="d-flex align-items-center cursor-pointer"
                                                                    />
                                                                    <Info size={14} className="text-muted ms-1 cursor-help" />
                                                                </div>

                                                                {/* Confirm Send Submission Operation */}
                                                                <Button onClick={handleSendReply} className="d-inline-flex  align-items-center gap-2 px-4 py-2 border-0 fw-semibold text-sm ">
                                                                    <Send size={14} />
                                                                    <span>Send Reply</span>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {/* Bottom Row: Dynamic Multi-File Attachment Badge Area */}
                                                        {attachedFiles.length > 0 && (
                                                            <div className="d-flex flex-wrap gap-2 mt-3  pt-2 border-top  animate-fade-in">
                                                                {attachedFiles.map((file, index) => (
                                                                    <div
                                                                        key={`${file.name}-${index}`}
                                                                        className="d-inline-flex align-items-center text-sm gap-2 p-2 bg-primary-50 text-primary rounded px-2.5 py-1.5 "
                                                                        style={{ maxWidth: '240px' }}
                                                                    >
                                                                        <Paperclip size={12} className="text-success flex-shrink-0" />

                                                                        {/* Truncated File Name Label display */}
                                                                        <span className="text-truncate fw-medium" title={file.name}>
                                                                            {file.name}
                                                                        </span>

                                                                        <span className="text-primary text-xs flex-shrink-0">
                                                                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                                                        </span>

                                                                        {/* Individual deletion close button layout */}
                                                                        <Button
                                                                            type="button"
                                                                            size='sm'
                                                                            variant=''
                                                                            className='border-0'
                                                                            onClick={() => removeAttachedFile(index)}
                                                                            aria-label="Remove file"
                                                                        >
                                                                            <XCircle size={15} className='text-danger' />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* External */}
                                {activeTab === 'external' && (
                                    <div style={{ backgroundColor: '#efeae2', padding: '20px rounded' }} className='p-2'>
                                        {/* Timeline Tree Wrapper */}
                                        <div className="position-relative " style={{ maxHeight: '540px', overflow: 'auto' }}>
                                            <div className="d-flex mt-4 justify-content-center mb-4">
                                                <span className="badge bg-light text-secondary border rounded-pill px-3 py-1.5 text-xs fw-medium ">
                                                    Feb 25, 2026
                                                </span>
                                            </div>
                                            {/* Loop through timeline activities */}
                                            <div className="d-flex flex-column gap-3 my-3 px-2" > {/* WhatsApp chat background color */}
                                                {internalNotesData.map((item) => {
                                                    const isReplyFromStaff = item.isInternalNote;

                                                    return (
                                                        <div key={item.id} className={`position-relative d-flex w-100 gap-2 align-items-end ${isReplyFromStaff ? 'flex-row-reverse' : ''}`} style={{ zIndex: 2 }} >

                                                            {/* Left/Right Avatar Structure */}
                                                            <div className="position-relative flex-shrink-0 mb-1">
                                                                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-semibold " style={{ width: '36px', height: '36px', backgroundColor: item.avatarBgColor, color: isReplyFromStaff ? '#ffffff' : '#0f5132', fontSize: '14px' }}>
                                                                    {item.avatarLetter}
                                                                </div>
                                                            </div>

                                                            {/* WhatsApp Chat Bubble Card Block */}
                                                            <div className="position-relative p-2 px-3 " style={{ backgroundColor: isReplyFromStaff ? '#d9fdd3' : '#ffffff', color: '#111b21', maxWidth: '70%', borderRadius: isReplyFromStaff ? '12px 12px 0px 12px' : '12px 12px 12px 0px', border: 'none' }}>
                                                                {/* Custom CSS Speech Bubble Triangle Tail */}
                                                                <div
                                                                    className="position-absolute"
                                                                    style={{
                                                                        bottom: '0',
                                                                        [isReplyFromStaff ? 'right' : 'left']: '-6px',
                                                                        width: '0',
                                                                        height: '0',
                                                                        borderStyle: 'solid',
                                                                        borderWidth: isReplyFromStaff ? '8px 0 0 8px' : '8px 8px 0 0',
                                                                        borderColor: isReplyFromStaff
                                                                            ? 'transparent transparent transparent #d9fdd3'
                                                                            : 'transparent #ffffff transparent transparent',
                                                                    }}
                                                                />

                                                                {/* Sender Name Display */}
                                                                <div className="fw-bold text-xs mb-1" style={{ color: isReplyFromStaff ? '#00a884' : '#53bdeb' }}>
                                                                    {item.senderName}
                                                                </div>

                                                                {/* Message Body Content Layout */}
                                                                <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 text-sm">
                                                                    <div className="text-start pb-1" style={{ wordBreak: 'break-word', flex: '1 1 auto' }}>
                                                                        {item.message}
                                                                    </div>

                                                                    {/* WhatsApp Style Bottom-Right Inline Timestamp */}
                                                                    <div
                                                                        className="text-end text-muted text-xs ms-auto flex-shrink-0"
                                                                        style={{ fontSize: '10px', minWidth: '50px', marginBottom: '-2px' }}
                                                                    >
                                                                        {item.timestamp}
                                                                        {isReplyFromStaff && (
                                                                            <span className="ms-1 text-primary" style={{ fontSize: '12px' }}>✓✓</span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                )}



                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right side Details Screen Card */}
                    <Col lg={4} md={6} xs={12}>
                        <Card className="border-0   overflow-hidden">
                            {/* Tab Headers */}
                            {/* <Card.Header className="bg-white border-0 p-0">
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
                            </Card.Header> */}

                            <Card.Body className="p-3">
                                <h6 className="mb-4 text-lg fw-bold text-muted d-flex align-items-center gap-2">
                                    <Info size={17} />
                                    Ticket <span className='text-primary'>Information</span>
                                </h6>

                                {/* Top Block: Summary Cards */}
                                <Row className="g-3 mb-4">
                                    <Col xs={6}>
                                        <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: '#f1f5f9' }}>
                                            <div className="p-2 bg-white rounded-3  text-primary d-flex align-items-center">
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
                                            <div className="p-2 bg-white rounded-3  text-primary d-flex align-items-center">
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
                                <Row className="g-2">
                                    {/* Status */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Layers size={14} className="text-secondary text-xs" /> Status
                                        </div>
                                        <div className='ps-3'>
                                            <Badge bg="info" className="bg-opacity-10 text-info px-3 py-2 rounded-pill fw-semibold ">
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                    </Col>

                                    {/* Branch */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <GitBranch size={14} className="text-secondary text-xs" /> Branch
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.branch}
                                        </div>
                                    </Col>

                                    {/* Ticket Type */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Settings size={14} className="text-secondary text-xs" /> Ticket Type
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.ticketType}
                                        </div>
                                    </Col>

                                    {/* Category */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Tag size={14} className="text-secondary text-xs" /> Category
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.category}
                                        </div>
                                    </Col>

                                    {/* Priority */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <ShieldAlert size={14} className="text-secondary text-xs" /> Priority
                                        </div>
                                        <div className='ps-4'>
                                            <Badge bg="danger" className="bg-opacity-10 text-danger px-3  py-2 rounded-pill fw-semibold ">
                                                {ticket.priority}
                                            </Badge>
                                        </div>
                                    </Col>

                                    {/* Internal Visibility */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Eye size={14} className="text-secondary text-xs" /> Internal Visibility
                                        </div>
                                        <div className="d-inline-flex align-items-center gap-2 fw-semibold text-dark ps-4  ">
                                            <Eye size={18} className="text-muted" />
                                            <span>{ticket.internalVisibility}</span>
                                            <Pencil
                                                size={14}
                                                className="text-primary cursor-pointer ms-2 hover-opacity"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </Col>

                                    {/* Requested By */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <User size={14} className="text-secondary text-xs" /> Requested By
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.requestedBy}
                                        </div>
                                    </Col>

                                    {/* Classification */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <FileText size={14} className="text-secondary text-xs" /> Classification
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.classification}
                                        </div>
                                    </Col>

                                    {/* Created By */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <User size={14} className="text-secondary text-xs" /> Created By
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.createdBy}
                                        </div>
                                    </Col>

                                    {/* IP Address */}
                                    <Col xs={12} md={6} className="pb-3 border-bottom border-light">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-mediumtext-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Network size={14} className="text-secondary text-xs" /> IP Address
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.ipAddress}
                                        </div>
                                    </Col>

                                    {/* Mobile No. */}
                                    <Col xs={12} md={6} className="pb-3">
                                        <div className="text-muted d-flex align-items-center ttext-sm gap-2 mb-1 small text-uppercase tracking-wider fw-medium">
                                            <Phone size={13} className="text-secondary " /> Mobile No.
                                        </div>
                                        <div className="fw-semibold text-dark ps-4  ">
                                            {ticket.mobileNo}
                                        </div>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Ticketdtl;
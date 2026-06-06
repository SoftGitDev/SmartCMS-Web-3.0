import React from 'react';
import { Accordion, Button, Card, CardBody, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { X, Printer, Trash2, MoreVertical, Send, Minus } from 'lucide-react';
import Editor from '../../../common/components/ui/editor/Editor';

interface EmailDtlProps {
    show?: boolean;
    handleClose?: () => void;
}

const threads = [
    {
        id: 1,
        sender: 'Revibe',
        avatarLetter: 'R',
        avatarBg: '#E6F1FB',
        avatarColor: '#0C447C',
        avatarImg: null,
        to: 'me',
        date: '09 Jan 2022, 11:12 AM',
        body: null,
        expanded: false,
    },
    {
        id: 2,
        sender: 'Anna Adame',
        avatarLetter: 'A',
        avatarBg: '#EEEDFE',
        avatarColor: '#3C3489',
        avatarImg: 'https://i.pravatar.cc/36?img=47',
        to: 'jackdavis@email.com',
        date: '09 Jan 2022, 02:15 PM',
        body: null,
        expanded: false,
    },
    {
        id: 3,
        sender: 'Revibe',
        avatarLetter: 'R',
        avatarBg: '#E6F1FB',
        avatarColor: '#0C447C',
        avatarImg: null,
        to: 'me',
        date: '10 Jan 2022, 10:08 AM',
        body: `Hi,\n\nEveryone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar pronunciation.\n\nThank you`,
        expanded: true,
    },
];

const EmailDtl: React.FC<EmailDtlProps> = ({ show = true, handleClose }) => {
    if (!show) return null;

    // We pass the last thread's ID as the default active key so the latest email is open by default
    const latestThreadId = threads.length > 0 ? String(threads[threads.length - 1].id) : "0";


    return (
        <Card>
            <CardBody className='p-0'>
                {/* ── Top Action Bar ── */}
                <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
                    {/* Close */}
                    <OverlayTrigger placement="top" overlay={<Tooltip>Close</Tooltip>}>
                        <Button size='sm' variant='' onClick={handleClose} className=" border-0 rounded-pill" >
                            <X size={20} className='text-danger' />
                        </Button>
                    </OverlayTrigger>

                    {/* Right actions */}
                    <div className="d-flex align-items-center gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Minimize</Tooltip>}>
                            <button
                                onClick={handleClose}
                                className="d-flex align-items-center justify-content-center border-0"
                                style={{ width: 28, height: 28, borderRadius: '8px', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer' }}
                            >
                                <Minus size={14} />
                            </button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={<Tooltip>Print</Tooltip>}>
                            <button
                                onClick={() => window.print()}
                                className="d-flex align-items-center justify-content-center border-0"
                                style={{ width: 28, height: 28, borderRadius: '8px', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer' }}
                            >
                                <Printer size={14} />
                            </button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                            <button
                                className="d-flex align-items-center justify-content-center border-0"
                                style={{ width: 28, height: 28, borderRadius: '8px', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </OverlayTrigger>

                        <Dropdown align="end">
                            <Dropdown.Toggle
                                as="button"
                                className=" border-0 text-muted shadow-none no-caret custom-action-btn"
                                style={{ width: 28, height: 28, borderRadius: '8px', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer' }}
                            >
                                <MoreVertical size={16} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>
                                <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3">
                                    Mark as unread
                                </Dropdown.Item>
                                <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3">
                                    Add label
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* ── Subject ── */}
                <div className="px-3 pt-2 pb-2">
                    <h6 className="fw-bold mb-0 text-sm" >
                        Friends - Weekend on Revibe
                    </h6>
                </div>

                {/* ── Thread List ── */}
                <div className="px-3" style={{ flex: 1, overflowY: 'auto' }}>
                    <Accordion defaultActiveKey={[latestThreadId]} alwaysOpen flush className="email-thread-accordion">
                        {threads.map((thread, idx) => {
                            const threadIdStr = String(thread.id);

                            return (
                                <Accordion.Item eventKey={threadIdStr} key={thread.id}>
                                    {/* Accordion Header */}
                                    <Accordion.Header className="p-0 custom-thread-header">
                                        <div className="d-flex align-items-start gap-2 w-100 pe-3 text-start">
                                            {/* Avatar */}
                                            {thread.avatarImg ? (
                                                <img
                                                    src={thread.avatarImg}
                                                    alt={thread.sender}
                                                    className='rounded-5'
                                                />
                                            ) : (
                                                <div className="email-icon-person text-primary" style={{ background: 'var(--primaryColor25)' }} >
                                                    {thread.avatarLetter}
                                                </div>
                                            )}

                                            {/* Meta Info */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="fw-semibold text-sm" >
                                                        {thread.sender}
                                                    </span>
                                                    <span className="me-2">
                                                        {thread.date}
                                                    </span>
                                                </div>
                                                <div className='text-xs'>
                                                    to: {thread.to}
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Header>

                                    {/* Accordion Body */}
                                    <Accordion.Body className='text-sm p-4'
                                        style={{
                                            lineHeight: 1.75,
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        {thread.body}
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </div>

                {/* ── Reply Box ── */}
                {/* Textarea */}
                <div className='p-3'>
                    <Editor
                        label='Reply :'
                        onChange={undefined}
                        placeholder='Enter Message'
                    />
                    <div className='d-flex justify-content-end align-content-center mt-2'>
                        <Button size='sm' variant='success' className='px-3'>
                            <Send className='me-1' size={15} /> Send
                        </Button>
                    </div>
                </div>
            </CardBody>

        </Card>
    );
};

export default EmailDtl;
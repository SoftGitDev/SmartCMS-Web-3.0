import { Check, Copy, Database, FileJson, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'

interface AuditlogDtlViewProps {
    show: boolean
    handleClose: () => void
    auditlogDtl: any
}

const AuditlogDtlView: React.FC<AuditlogDtlViewProps> = ({ show, handleClose, auditlogDtl }) => {


    const formatJson = (jsonStr: string) => {
        try {
            if (!jsonStr) return null;
            const parsed = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return jsonStr || 'No Data';
        }
    };


    const hasOldData = !!auditlogDtl?.OldData;
    const hasNewData = !!auditlogDtl?.NewData;
    const isUpdate = hasOldData && hasNewData;

    console.log('auditlogDtl', auditlogDtl);


    return (
        <div>
            <Modal show={show} placement='end' onHide={handleClose} backdrop='static' keyboard size='xl'>
                <Modal.Header closeButton>
                    <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                            <FileText size={24} />
                        </div>
                        <div>
                            <h6 className="mb-0">{auditlogDtl.user || "Aadhaar Seeding Log"}</h6>
                            <span className="text-md fw-muted">Details of the following log</span>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {/* ── Info Section ── */}
                    <div>
                        <Row className="g-4">
                            {/* PREVIOUS STATE - Using text-primary for Blue theme */}
                            {hasOldData && (
                                <Col md={isUpdate ? 6 : 12}>
                                    <Card className="border-0 rounded-4 h-100 p-3" style={{ backgroundColor: !isUpdate ? 'hsl(0, 60%, 97%)' : 'hsl(210 60% 97%)' }}>
                                        <Card.Body>
                                            <div className={`d-flex align-items-center gap-2 mb-3 fw-bold ${isUpdate ? 'text-primary' : 'text-danger'}`}>
                                                <Database size={18} />
                                                <span>{isUpdate ? "Previous Information" : "Deleted Log Information"}</span>
                                            </div>
                                            <div className="bg-white rounded-3 border shadow-sm p-3">
                                                <pre className="mb-0 overflow-auto text-secondary" style={{ maxHeight: '400px', fontSize: '13px' }}>
                                                    {formatJson(auditlogDtl.OldData)}
                                                </pre>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}

                            {/* NEW STATE - Using text-success for Green theme */}
                            {hasNewData && (
                                <Col md={isUpdate ? 6 : 12}>
                                    <Card className="border-0 rounded-4 h-100 p-3" style={{ backgroundColor: 'hsl(145 50% 96%)' }}>
                                        <Card.Body>
                                            <div className="d-flex align-items-center gap-2 mb-3 text-success fw-bold">
                                                <FileJson size={18} />
                                                <span>{isUpdate ? "Updated Information" : "Inserted Log Information"}</span>
                                            </div>
                                            <div className="bg-white rounded-3 border shadow-sm p-3">
                                                <pre className="mb-0 overflow-auto text-secondary" style={{ maxHeight: '400px', fontSize: '13px' }}>
                                                    {formatJson(auditlogDtl.NewData)}
                                                </pre>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>

                        {/* Footer Info */}
                        <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center px-2">
                            <Button
                                type="button"
                                variant="light"
                                className='ms-auto'
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AuditlogDtlView

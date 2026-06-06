
import { Rocket, Play, Copy, Check, CheckCircle, XCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import * as urls from "../../../services/axios/url";
import { Button, Modal, Row, Col, Badge, Accordion } from 'react-bootstrap';
import StatusBadge from '../../../common/components/ui/customBadge/StatusBadge';
import TextArea from '../../../common/components/ui/textArea/TextArea';
import { apiRequest } from '../../../services/api/apiRequest';
import toastNotify from '../../../services/notification/tostNotify';


interface APIConfigFrmProps {
    show: boolean;
    handleClose: (data?: any) => void;
    servicesDtlData: any;
}

const APIConfigTest: React.FC<APIConfigFrmProps> = ({ show, handleClose, servicesDtlData }) => {
    const [payloads, setPayloads] = useState<Record<number, string>>({});
    const [responses, setResponses] = useState<Record<number, { data: string; status: number; success: boolean } | null>>({});
    const [globalLoading, setGlobalLoading] = useState(false);
    const [copied, setCopied] = useState<Record<number, boolean>>({});
    const [activeKey, setActiveKey] = useState<string>('0');

    const service = servicesDtlData;

    useEffect(() => {
        if (service?.stepDtl) {
            const initial: Record<number, string> = {};
            service.stepDtl.forEach((step: any, idx: number) => {
                initial[idx] = step.requestPayload || '';
            });
            setPayloads(initial);
            setResponses({});
            setActiveKey('0');
        }
    }, [show]);

    const deepParseResponse = (data: string): string => {
        const recursiveParse = (value: any): any => {
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    if (typeof parsed === 'object' && parsed !== null) {
                        return recursiveParse(parsed);
                    }
                    return parsed;
                } catch {
                    return value;
                }
            }
            if (Array.isArray(value)) {
                return value.map(recursiveParse);
            }
            if (typeof value === 'object' && value !== null) {
                const result: Record<string, any> = {};
                for (const key of Object.keys(value)) {
                    result[key] = recursiveParse(value[key]);
                }
                return result;
            }
            return value;
        };

        try {
            if (!data || data.trim() === '') return '(empty response)';

            const parsed = JSON.parse(data);

            if (Array.isArray(parsed)) {
                if (parsed.length === 0) return 'Response: [] (empty — no data returned)';
                return JSON.stringify(parsed.map(recursiveParse), null, 2);
            }

            return JSON.stringify(recursiveParse(parsed), null, 2);
        } catch {
            return data || '(empty response)';
        }
    };

    const handlePayloadChange = (idx: number, val: string) => {
        setPayloads(prev => ({ ...prev, [idx]: val }));
    };

    const handleCopy = (idx: number, text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(prev => ({ ...prev, [idx]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [idx]: false })), 1500);
    };

    // Save mail configuration
    const handleTestAll = async () => {
        setGlobalLoading(true);
        setResponses({});
        try {
            const stepsDtl = service.stepDtl.map((step: any, idx: number) => ({
                stepCd: step.stepCd,
                reqPayload: payloads[idx] || '',
            }));

            const payload = {
                serviceCode: service?.tranCode || 0,
                stepsDtl,
            };

            const result = await apiRequest("POST", urls.testApiService, payload)
            if (result.Success) {
                const newResponses: Record<number, any> = {};
                if (Array.isArray(result.Response)) {
                    result.Response.forEach((res: any, idx: number) => {
                        newResponses[idx] = {
                            data: typeof res === 'string' ? res : JSON.stringify(res, null, 2),
                            status: res?.statusCode || 200,
                            success: res?.success !== false,
                        };
                    });
                } else {
                    service.stepDtl.forEach((_: any, idx: number) => {
                        newResponses[idx] = {
                            data: typeof result.Response === 'string'
                                ? result.Response
                                : JSON.stringify(result.Response, null, 2),
                            status: result.StatusCode || 200,
                            success: true,
                        };
                    });
                }

                // If Response is empty array or no per-step data came back,
                // still show the full result for each step
                if (Object.keys(newResponses).length === 0) {
                    service.stepDtl.forEach((_: any, idx: number) => {
                        newResponses[idx] = {
                            data: JSON.stringify(result, null, 2),
                            status: result.StatusCode || 200,
                            success: true,
                        };
                    });
                }

                setResponses(newResponses);
            } else {
                toastNotify(result.Message, 'error');
                const errorResponses: Record<number, any> = {};
                service.stepDtl.forEach((_: any, idx: number) => {
                    errorResponses[idx] = {
                        data: result.Message || 'Request failed',
                        status: result.StatusCode || 400,
                        success: false,
                    };
                });
                setResponses(errorResponses);
            }
        } catch (error) {
            const errorResponses: Record<number, any> = {};
            service.stepDtl?.forEach((_: any, idx: number) => {
                errorResponses[idx] = { data: 'Unexpected error occurred.', status: 500, success: false };
            });
            setResponses(errorResponses);
        } finally {
            setGlobalLoading(false);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton className="border-0 pb-0">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                        <Rocket size={24} />
                    </div>
                    <div>
                        <h6 className="mb-0">Service Test</h6>
                        <span className="text-md fw-light">Configure and test all steps together</span>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body className="pt-2">
                {/* Service Info Banner */}
                <div className="rounded-3 p-2 px-3 my-3 bg-light">
                    <Row className="align-items-center g-2">
                        <Col xs="auto">
                            <span className="text-xs text-muted fw-semibold text-uppercase">Service</span>
                            <div className="fw-semibold text-sm">{service.serviceNm}</div>
                        </Col>
                        <Col xs="auto" className="ms-auto me-3">
                            <span className="text-xs text-muted fw-semibold text-uppercase">Type</span>
                            <div className="fw-semibold text-sm">{service.serviceType}</div>
                        </Col>
                        <Col xs="auto">
                            <span className="text-xs text-muted fw-semibold text-uppercase">Steps</span>
                            <div className="fw-semibold text-sm text-center">{service.stepCnt || 0}</div>
                        </Col>
                    </Row>
                </div>

                {/* Accordion Steps */}
                <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k as string)}>
                    {service.stepDtl?.map((step: any, idx: number) => {
                        const response = responses[idx];

                        return (
                            <Accordion.Item
                                eventKey={String(idx)}
                                key={idx}
                                className="mb-2 rounded-3 overflow-hidden"
                            >
                                <Accordion.Header>
                                    <div className="d-flex align-items-center gap-2 w-100 me-2">
                                        <div className="d-flex align-items-center text-sm icon-wrapper justify-content-center rounded-2 text-white" style={{ width: 22, height: 22 }}>
                                            {idx + 1}
                                        </div>
                                        <span className="fw-semibold text-sm flex-grow-1">
                                            {step.stepName || `Step ${idx + 1}`}
                                        </span>
                                        <StatusBadge variant="success" label={step.requestType} className="text-xs me-2" />
                                        {response && (
                                            <Badge
                                                bg={response.success ? 'success' : 'danger'}
                                                className="text-xs me-2 d-flex align-items-center gap-1"
                                            >
                                                {response.success ? <><CheckCircle size={10} /> {response.status} OK</> : <><XCircle size={10} /> {response.status} Error</>}
                                            </Badge>
                                        )}
                                    </div>
                                </Accordion.Header>

                                <Accordion.Body className="p-3">
                                    {step.apiUrl && (
                                        <div className="mb-3">
                                            <label className="text-xs fw-semibold text-muted text-uppercase mb-1">Endpoint URL</label>
                                            <div
                                                className="px-3 py-2 rounded-2 text-xs font-monospace"
                                                style={{ background: '#f1f3f5', border: '1px solid #dee2e6', wordBreak: 'break-all' }}
                                            >
                                                {step.apiUrl}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <label className="text-xs fw-semibold text-muted text-uppercase mb-0">
                                                Request Payload
                                            </label>
                                            <button
                                                className="btn btn-link text-decoration-none btn-sm p-0 text-xs d-flex align-items-center gap-1"
                                                onClick={() => handleCopy(idx, payloads[idx] || '')}>
                                                {copied[idx] ? <div className='text-success'><Check size={12} /> Copied</div> : <><Copy size={12} /> Copy</>}
                                            </button>
                                        </div>
                                        <TextArea
                                            className="form-control font-monospace text-xs"
                                            rows={10}
                                            value={payloads[idx] || ''}
                                            onChange={e => handlePayloadChange(idx, e.target.value)}
                                            placeholder={`Enter JSON payload for Step ${idx + 1}`}
                                            style={{ resize: 'vertical', fontSize: '12px' }}
                                            disabled={globalLoading}
                                        />
                                    </div>

                                    {response && (
                                        <div>
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <label className="text-xs fw-semibold text-muted text-uppercase mb-0">Response</label>
                                                <Badge bg={response.success ? 'success' : 'danger'} className="text-xs">
                                                    {response.status} {response.success ? 'OK' : 'Error'}
                                                </Badge>
                                            </div>
                                            <TextArea
                                                readOnly
                                                rows={10}
                                                disabled
                                                className="border-success font-monospace text-xs"
                                                value={deepParseResponse(response.data)
                                                }
                                            />
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between align-items-center">
                <div className="text-xs text-muted">
                    {service.stepDtl?.length || 0} step will be tested together
                </div>
                <div className="d-flex gap-2">
                    <Button type="button" variant="light" onClick={() => handleClose()} size="sm">
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={handleTestAll}
                        disabled={globalLoading}
                        className="d-flex align-items-center gap-2">
                        {globalLoading ? <><span className="spinner-border spinner-border-sm" /> Testing All Steps...</> : <><Play size={13} /> Test All Steps</>}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default APIConfigTest;
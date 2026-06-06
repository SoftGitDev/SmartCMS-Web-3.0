// Purpose: Server Config Components
// Created by: Harish
// Created Date: 01-06-2026
// Change History: Improved UI/UX design, fixed typos, and updated informative note.
// ---------------------------------------------------------------------------------

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { KeySquare, Lock, Activity, ShieldCheck } from 'lucide-react'
import { ErrorMessage } from 'formik'
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import Textfield from '../../../common/components/ui/TextField/TextInput';

// Props Interface
interface ServerHealthConfigProps {
    values: {
        isServerConfig: boolean;
        productKey: string;
        secretKey: string;
    };
    setFieldValue: (field: string, value: any) => void;
    handleBlur: React.FocusEventHandler<HTMLInputElement>;
    getNextTabIndex: () => number;
}

const ServerHealthConfig: React.FC<ServerHealthConfigProps> = ({
    values,
    setFieldValue,
    handleBlur,
    getNextTabIndex
}) => {
    return (
        <div className="p-3">

            {/* ── Server Health Monitoring Toggle Card ── */}
            <Col xs={12}>
                <div
                    className="rounded-3 px-4 py-3 d-flex align-items-center justify-content-between h-100 shadow-sm"
                    style={{
                        border: `1.5px solid ${values.isServerConfig ? 'var(--primaryColor)' : '#e2e8f0'}`,
                        backgroundColor: values.isServerConfig ? 'var(--primaryColor25)' : '#ffffff',
                        transition: 'all 0.25s ease-in-out',
                    }}
                >
                    <div className="d-flex align-items-center gap-3">
                        {/* Icon Container */}
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                            style={{
                                width: '42px',
                                height: '42px',
                                backgroundColor: values.isServerConfig ? 'var(--primaryColor)' : '#f1f5f9',
                                transition: 'background-color 0.25s ease',
                            }}
                        >
                            <Activity size={20} strokeWidth={2} color={values.isServerConfig ? '#ffffff' : '#64748b'} />
                        </div>

                        {/* Text Content */}
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '14px', letterSpacing: '0.3px' }}>
                                    Real-Time Server Health Monitor
                                </h6>
                                <span
                                    className="px-2 py-0.5 rounded-pill fw-semibold"
                                    style={{
                                        fontSize: '10px',
                                        backgroundColor: values.isServerConfig ? '#dcfce7' : '#f1f5f9',
                                        color: values.isServerConfig ? '#15803d' : '#64748b',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {values.isServerConfig ? 'Active' : 'Disabled'}
                                </span>
                            </div>
                            <p className="mb-0 fw-medium" style={{ fontSize: '12px', color: '#64748b' }}>
                                {values.isServerConfig
                                    ? 'Actively monitoring your server instances, uptime percentages, and database diagnostics.'
                                    : 'Enable real-time server metrics tracking and cryptographic verification.'
                                }
                            </p>
                        </div>
                    </div>

                    <ToggleSwitch
                        id="isServerConfig"
                        name="isServerConfig"
                        className="fs-4 form-check-navy ms-3"
                        checked={values.isServerConfig}
                        onChange={(e) => setFieldValue('isServerConfig', e.target.checked)}
                    />
                </div>
            </Col>

            {/* ── Configuration Fields ── */}
            {values.isServerConfig && (
                <Row className="mt-4 g-3">
                    <Col md={6}>
                        <Textfield
                            label="Product Verification Key"
                            name="productKey"
                            required
                            placeholder="Enter service product validation key"
                            value={values.productKey}
                            tabIndex={getNextTabIndex()}
                            onBlur={handleBlur}
                            type="text"
                            IconProp={KeySquare}
                            onChange={(e: any) => setFieldValue('productKey', e.target.value)}
                        />
                        <ErrorMessage name="productKey" component="div" className="ErrorMessage" />
                    </Col>

                    <Col md={6}>
                        <Textfield  
                            label="Secret Key"
                            name="secretKey"
                            type="password"
                            required
                            placeholder="••••••••••••"
                            value={values.secretKey}
                            tabIndex={getNextTabIndex()}
                            onBlur={handleBlur}
                            IconProp={Lock}
                            onChange={(e: any) => setFieldValue('secretKey', e.target.value)}
                        />
                        <ErrorMessage name="secretKey" component="div" className="ErrorMessage" />
                    </Col>
                </Row>
            )}

            {/* ── Informative Context Note ── */}
            <div className="alert alert-info border-0 shadow-sm d-flex align-items-start gap-3 mt-4" role="alert" style={{ backgroundColor: '#f0fdf4', borderLeft: '4px solid #16a34a !important' }}>
                <ShieldCheck className="text-success flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h5 className="alert-heading fw-bold text-success-emphasis mb-1" style={{ fontSize: '14px' }}>
                        Why configure Server Health Monitoring?
                    </h5>
                    <p className="text-muted mb-0" style={{ fontSize: '12.5px', lineHeight: '1.5' }}>
                        Enabling this secure telemetry layer grants access to key execution logs, continuous uptime diagnostics, and system health status. Rest assured, your provided Product Key and Secret Key are encrypted end-to-end to maintain complete system isolation and safety.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ServerHealthConfig;
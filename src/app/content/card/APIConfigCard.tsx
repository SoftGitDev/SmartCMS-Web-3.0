import React from 'react';
import { Card, Button, Col, Row, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Globe, Edit, Calendar, Trash2, ExternalLink, Zap, Layers, LoaderCircle, Trash, SquareArrowOutUpRight, Rocket, FileSymlink } from 'lucide-react';
import ToggleSwitch from '../../components/ui/toggleSwitch/ToggleSwitch';
interface APIConfig {
    tranCd?: number;
    serviceNm: string;
    serviceType?: string;
    stepCount?: number | string;
    tranDate?: string;
    serviceDesc?: string;
    serviceStatus?: boolean;
}
interface APIConfigCardProps {
    apiConfigs: APIConfig[];
    onView?: (config: APIConfig) => void;
    onEdit?: (tranCode: number, index: number) => void;
    onExport?: (tranCode: number, index: number) => void;
    onDelete?: (trancd: string) => void;
    onUpdateStatus?: (tranCode: number, newStatus: boolean) => void;
    isLoader?: boolean;
    isDtlLoader?: Record<number, boolean>;
    isExportLoader?: Record<number, boolean>;
    isTestLoader?: Record<number, boolean>;
    isDeleteLoader?: Record<number, boolean>;
    setIsEdit?: (flag: boolean) => void;
    userData: any
    // handleTestDetails?: (tranCode: number, index: number) => void;
    handleTestDetails?: any

}

const APIConfigCard: React.FC<APIConfigCardProps> = ({
    apiConfigs = [],
    onEdit,
    onDelete,
    onUpdateStatus,
    isDtlLoader = {},
    isLoader = false,
    isTestLoader = {},
    onExport,
    isExportLoader = {},
    isDeleteLoader = {},
    setIsEdit,
    userData,
    handleTestDetails
}) => {

    // Skeleton and Empty states remain similar but styled with the new theme...

    return (
        <Row className='g-4  mt-1 mb-3 pb-3'>
            {apiConfigs.map((api, index) => {
                const isActive = api.serviceStatus === true;

                return (
                    <Col key={api.tranCd || index} md={6} xl={4}>
                        <Card
                            className={`border-0 shadow-sm rounded-4 h-100 transition-all card-hover ${!isActive ? 'opacity-75' : ''}`}
                            style={{ background: '#fff', transition: 'all 0.3s ease' }}
                        >
                            <Card.Body className="p-4">
                                {/* Header: Icon and Toggle */}
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="d-flex align-items-center justify-content-center rounded-4"
                                        style={{ width: '48px', height: '48px', backgroundColor: isActive ? 'var(--primaryColor25)' : '#f8f9fa', color: isActive ? 'var(--primaryColor)' : '#6c757d' }} >
                                        <Globe size={24} />
                                    </div>
                                    <div className="d-flex align-items-center gap-2 px-2 py-1 bg-light rounded-pill border">
                                        <span className={`text-uppercase fw-bold`} style={{ fontSize: '10px', color: isActive ? '#2ecc71' : '#95a5a6' }}>
                                            {isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                        <span className='mt-1'>
                                            <ToggleSwitch
                                                id={`status-${api.tranCd}`}
                                                checked={isActive}
                                                onChange={() => api.tranCd && onUpdateStatus?.(api.tranCd, !isActive)}
                                            />
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <h5 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                                        {api.serviceNm}
                                        {Number(api.stepCount) > 5 && <Zap size={14} className="text-warning" fill="currentColor" />}
                                    </h5>
                                    <p className="text-muted small mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.5', minHeight: '40px' }}>
                                        {api.serviceDesc || "Standard service configuration for automated data processing."}
                                    </p>

                                    <div className="d-flex gap-2">
                                        <Badge bg="light" className="text-primary border px-2 py-2 fw-normal rounded-3">
                                            <Layers size={12} className="me-1" /> {api.serviceType || 'General'}
                                        </Badge>
                                        <Badge bg="light" className="text-success border px-2 py-2 fw-normal rounded-3">
                                            {api.stepCount} Steps
                                        </Badge>
                                    </div>
                                </div>

                                <hr className="my-3 opacity-5" />

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                                        <Calendar size={12} /> {api.tranDate?.split(' ')[0] || 'Recent'}
                                    </div>

                                    <div className="d-flex gap-2">

                                        {/* {userData?.Permissions?.SAVE_ADM_API_CONF === "Y" && */}
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id={`export-tp-${index}`} className="custom-tooltip">Test Service</Tooltip>}
                                        >
                                            <Button variant="" size="sm" className='icon-wrapper-primary' disabled={isTestLoader[index]} onClick={() => { handleTestDetails?.(api.tranCd!, index); setIsEdit?.(true); }}>
                                                {isTestLoader[index] ? <LoaderCircle size={15} className="animate-spin" /> : <Rocket size={15} />}
                                            </Button>
                                        </OverlayTrigger>
                                        {/* } */}

                                        {/* {userData?.Permissions?.SAVE_ADM_API_CONF === "Y" && */}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id={`export-tp-${index}`} className="custom-tooltip">Export Configuration</Tooltip>}
                                        >
                                            <Button variant="" size="sm" className='icon-wrapper-info' disabled={isExportLoader[index]} onClick={() => onExport?.(api.tranCd!, index)} >
                                                {isExportLoader[index] ? <LoaderCircle size={15} className="animate-spin" /> : <FileSymlink size={15} />}
                                            </Button>
                                        </OverlayTrigger>
                                        {/* } */}

                                        {/* {userData?.Permissions?.UPDATE_ADM_API_CONF === "Y" && */}
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id={`edit-tp-${index}`} className="custom-tooltip">Edit API Details</Tooltip>}
                                        >
                                            <Button variant="" size="sm" className='icon-wrapper-edit' disabled={isDtlLoader[index]} onClick={() => { onEdit?.(api.tranCd!, index); setIsEdit?.(true); }}>
                                                {isDtlLoader[index] ? <LoaderCircle size={15} className="animate-spin" /> : <Edit size={15} />}
                                            </Button>
                                        </OverlayTrigger>
                                        {/* } */}

                                        {/* {userData?.Permissions?.DELETE_ADM_API_CONF === "Y" && */}
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={<Tooltip id={`delete-tp-${index}`} className="custom-tooltip">Delete API</Tooltip>}
                                        >
                                            <Button variant="" size="sm" className='icon-wrapper-delete' disabled={isDeleteLoader[index] || !api.tranCd} onClick={() => api.tranCd && onDelete?.(String(api.tranCd))} >
                                                {isDeleteLoader[index] ? <LoaderCircle size={15} className="animate-spin" /> : <Trash size={15} />}
                                            </Button>
                                        </OverlayTrigger>
                                        {/* } */}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default APIConfigCard;
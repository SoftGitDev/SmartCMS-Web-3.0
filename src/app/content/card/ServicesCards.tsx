import React from "react";
import { Button, Card } from "react-bootstrap";
import ToggleSwitch from "../../components/ui/toggleSwitch/ToggleSwitch";
import { Calendar, Cog, Edit, Loader2, MoveRight, Trash } from "lucide-react";

type ServicesCardsProps = {
    serviceData: { TranCode: string; ServiceName: string; Description: string; Status: string; Base64: string; base64: string; EntryDate?: string; CategoryCd: string; SubCategoryCd: string; };
    getServiceDtls: () => void;
    handleServiceTestMdl?: () => void;
    updateServiceStatus?: (status: string, tranCd: string) => void;
    handleDeleteConfirmationMdl?: (deleteItems: string) => void;
    isEditLoader: any;
    isServiceDtlLoader?: any;
    idx: number;
    flag?: string;
    categoryFlag?: string; // for handeling category and subcategory for integ service

};

const ServicesCards: React.FC<ServicesCardsProps> = ({ serviceData, getServiceDtls, updateServiceStatus, handleDeleteConfirmationMdl, isEditLoader, isServiceDtlLoader, idx, flag, categoryFlag }) => {
    const { Description, Status, ServiceName, TranCode, Base64, base64, EntryDate, CategoryCd, SubCategoryCd } = serviceData;

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card className="premium-card h-100 position-relative">
            {flag !== "C" && (
                <div className="position-absolute top-0 end-0 p-3 z-index-1">
                    <div className="d-flex align-items-center bg-white rounded-pill px-2 py-1 shadow-sm border">
                        <small className={`me-2 ps-2 fw-bold ${Status === "Y" ? "text-success" : "text-slate-500"}`} style={{ fontSize: '0.7rem' }}>
                            {Status === "Y" ? "Active" : "Inactive"}
                        </small>
                        <ToggleSwitch
                            name="ActiveStatus"
                            checked={Status === "Y"}
                            title="Status"
                            onChange={(e: any) => {
                                const newStatus = e.target.checked ? "Y" : "N";
                                updateServiceStatus?.(newStatus, String(TranCode));
                            }}
                        />
                    </div>
                </div>
            )}

            <Card.Body className="d-flex flex-column pt-5 pb-4 px-4">

                {/* --- Icon Section --- */}
                <div className="mb-4 text-center">
                    <div className="icon-box">
                        {Base64 ? (
                            <img
                                src={Base64}
                                alt={ServiceName}
                                className="img-fluid"
                                style={{ maxHeight: "40px", maxWidth: "40px" }}
                            />
                        ) : (
                            <Cog size={35} className="text-secondary opacity-75" />
                        )}
                    </div>
                </div>

                {/* --- Content Section --- */}
                <div className="text-center flex-grow-1">
                    <h5 className="fw-bold text-slate-700 mb-2 text-truncate" title={ServiceName}>
                        {ServiceName}
                    </h5>

                    {/* Created Date with Icon */}
                    {categoryFlag === "Y" &&
                        <>
                            <div className="d-flex justify-content-center align-items-center text-muted mb-2">
                                {/* <BiLayout size={14} className="me-1" /> */}
                                <small style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                                    Category : {CategoryCd}  {SubCategoryCd !== "NONE" && <> || Sub-Category : {SubCategoryCd}</>}
                                </small>

                            </div>
                            {/* {SubCategoryCd !== "NONE" &&
                                <div className="d-flex justify-content-center align-items-center text-muted mb-3">
                                    <BiLayout size={14} className="me-1" />
                                    <small style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                                        SubCategory  : {SubCategoryCd}
                                    </small>
                                </div>
                            } */}
                        </>
                    }

                    {flag === "SERVICE" && <div className="d-flex justify-content-center align-items-center text-slate-500 mb-2">
                        <Calendar size={14} className="me-1" />
                        <small style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                            {formatDate(EntryDate)}
                        </small>
                    </div>}

                    <p className="text-slate-500 small mb-0 line-clamp-2" title={Description} style={{ lineHeight: '1.6' }}>
                        {Description || "No description available for this service."}
                    </p>
                </div>

                {/* --- Footer / Actions Section --- */}
                <div className="mt-3 pt-3 border-top border-light">
                    {flag === "C" ? (
                        <div className="d-grid">
                            <Button variant="primary" className="btn-action shadow-sm py-2" onClick={getServiceDtls} >
                                {isServiceDtlLoader && isServiceDtlLoader[idx] ? (
                                    <Loader2 className="icon-loader animate-spin" />
                                ) : (
                                    <>Use Service <MoveRight className="ms-1" /></>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="light" className="btn-action text-secondary border-0 bg-theme" title="Edit Service" disabled={isEditLoader[idx]} onClick={getServiceDtls} style={{ width: '45%' }} >
                                {isEditLoader[idx] ? (<Loader2 className="icon-loader" />) : (<><Edit className="me-1" /> Edit</>)}
                            </Button>

                            <Button variant="light" className="btn-action text-danger border-0 bg-danger-subtle" title="Delete Service" onClick={() => handleDeleteConfirmationMdl?.(TranCode)} style={{ width: '45%' }}>
                                <Trash className="me-1" /> Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ServicesCards;
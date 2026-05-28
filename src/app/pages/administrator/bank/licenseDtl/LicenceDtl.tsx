import { CheckCircle2, SquarePen } from 'lucide-react';
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import StatusBadge from '../../../../components/ui/customBadge/StatusBadge';
import LicenceMdl from './LicenceMdl';
import ModifyLicenseMdl from './ModifyLicenseMdl';

const LicenceDtl = () => {

    // Dummy License Data
    const licenceDtl: any = {
        createDate: '11-May-2026',
        expireDate: '31-Dec-2026',
        productCode: 'CMS-ENT-001',
        productName: 'Smart CMS ',
        licenseVersion: 'v3.5.2',
        hardwareId: 'HW-98XJ-77KL-AB12',
        verifyResponse: 0,
        activeStatus: true,
        expireStatus: false,
    };


    // Modal open/close state
    const [isLicenceUpdateMdl, setIsLicenceUpdateMdl] = useState<boolean>(false);
    const [isLicenceRenewMdl, setIsisLicenceRenewMdl] = useState<boolean>(false);

    // Toggle modal
    const toggleLicenceVerifyMdl = () => {
        setIsLicenceUpdateMdl(!isLicenceUpdateMdl);
    };

    // handle Licence renew Modal
    const handleRenewLiceMdl = () => {
        setIsisLicenceRenewMdl(!isLicenceRenewMdl)
    }

    return (
        <>
            <div className="ms-auto d-flex justify-content-end">
                <Button
                    type="button"
                    variant="success"
                    onClick={toggleLicenceVerifyMdl}
                    className="me-3"
                    size='sm'>
                    <CheckCircle2 size={15} className="me-2" />
                    Re-New License
                </Button>

                <Button
                    type="button"
                    variant="primary"
                    onClick={handleRenewLiceMdl}
                    size='sm'>
                    <SquarePen size={15} className="me-2" />
                    Modify License
                </Button>
            </div>
            {/* licence Details */}
            <fieldset className="border rounded-2 mt-2 p-3 bg-white shadow-sm">
                <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                    License Info
                </legend>
                <Row>
                    {licenceDtl?.createDate && (
                        <Col md="4" className="mt-3">

                            <div className="text-slate-500 text-sm">
                                License Date
                            </div>

                            <div className="text-sm fw-700">
                                {licenceDtl.createDate}
                            </div>

                        </Col>
                    )}

                    {licenceDtl?.expireDate && (
                        <Col md="4" className="mt-3">

                            <div className="text-slate-500 text-sm">
                                Valid Up To
                            </div>

                            <div className="text-sm fw-700">
                                {licenceDtl.expireDate}
                            </div>

                        </Col>
                    )}

                    {licenceDtl?.productCode && (
                        <Col md="4" className="mt-3">

                            <div className="text-slate-500 text-sm">
                                Product Code
                            </div>

                            <div className="text-sm fw-700">
                                {licenceDtl.productCode}
                            </div>

                        </Col>
                    )}

                    {licenceDtl?.productName && (
                        <Col md="4" className="mt-3">

                            <div className="text-slate-500 text-sm">
                                Product Name
                            </div>

                            <div className="text-sm fw-700">
                                {licenceDtl.productName}
                            </div>

                        </Col>
                    )}

                    {licenceDtl?.licenseVersion && (
                        <Col md="4" className="mt-3">

                            <div className="text-slate-500 text-sm">
                                License Version
                            </div>

                            <div className="text-sm fw-700">
                                {licenceDtl.licenseVersion}
                            </div>

                        </Col>
                    )}


                    {licenceDtl?.activeStatus !== undefined && (
                        <Col md="4" className="mt-3">
                            <div className="text-slate-500 text-sm">
                                Active Status
                            </div>
                            <div className="text-sm fw-700">
                                <StatusBadge
                                    label={licenceDtl.activeStatus ? 'Yes' : 'No'}
                                    variant={licenceDtl.activeStatus ? 'success' : 'danger'}
                                />
                            </div>
                        </Col>
                    )}


                </Row>
            </fieldset>

            {/* Modal Update */}
            {isLicenceUpdateMdl && (
                <LicenceMdl
                    show={isLicenceUpdateMdl}
                    onHide={toggleLicenceVerifyMdl}
                    licenceDtl={licenceDtl}
                />
            )}

            {/* re new modal */}
            {isLicenceRenewMdl && (
                <ModifyLicenseMdl
                    isOpen={isLicenceRenewMdl}
                    handleClose={handleRenewLiceMdl}
                />
            )}
        </>
    )
}

export default LicenceDtl

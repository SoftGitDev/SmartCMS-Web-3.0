// Purpose: License Service Conponent
// Created by: Yogesh | Prateek 
// Created Date: 09-02-2026

// Change History:
// 09-02-2026 | prateek | Create a common compoenent for page header and implement APIs
// 27-04-2026 | Yogesh | Review code and do testing | Review Done 👍👍
// --------------------------------------------------------------

import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { CheckCircle2, Settings, SquarePen } from "lucide-react";
import { Datatable } from "../../../common/components/ui/DataTable/Datatable";
import StatusBadge from "../../../common/components/ui/customBadge/StatusBadge";
import Checkbox from "../../../common/components/ui/checkBox/Checkbox";

// Types for Services
export interface ServiceModule {
    ModuleCode: string;
    ModuleName: string;
    ModuleDesc: string;
    ExpiryDate?: string;
    Status: string;
}

export interface ServiceData {
    serviceCode: string;
    serviceName: string;
    serviceDesc: string;
    ExpiryDate?: string | null;
    Status: string;
    ModuleDetails: ServiceModule[];
}

interface ServiceValues {
    services: ServiceData[];
}

const columns = [
    { field: 'serviceName', header: 'Service Name', width: '300px' },
    { field: 'ExpiryDate', header: 'Expiry Date', width: '300px' },
    { field: 'Status', header: 'Status', align: 'center', width: '150px' },
];

type LicenseServicesTblProps = {
    heading: string;
    data: ServiceData[];
    flag?: string;
    setFieldValue: any;
    values: any | ServiceValues;
    handleClose?: () => void;
    handleUpdateLicense?: (data?: any) => void;
    handleLicenseMdl?: () => void;
};


const LicenseServicesTbl: React.FC<LicenseServicesTblProps> = ({ heading, data, setFieldValue, values, handleLicenseMdl, flag, handleUpdateLicense, }) => {
    const serviceValues = values as ServiceValues;

    
    // Deep copy for services
    const deepCopyServices = (array: ServiceData[]) => {
        return array.map((item: ServiceData) => ({
            ...item, // This spreads all fields including ExpiryDate
            ModuleDetails: item?.ModuleDetails
                ? item.ModuleDetails.map((module: ServiceModule) => ({ ...module }))
                : []
        }));
    };


    // Only set initial values if services are empty
    useEffect(() => {
        if (!serviceValues.services || serviceValues.services.length === 0) {
            setFieldValue('services', deepCopyServices(data as ServiceData[]));
        }
    }, [data]);


    const handleServiceCheckboxChange = (rowIndex: number, checked: boolean, flag: "P" | "M", moduleIndex?: number) => {
        const services = serviceValues.services.map((service, sIdx) => {
            if (sIdx !== rowIndex) return service;

            if (flag === "P") {
                return {
                    ...service,
                    Status: checked ? 'Y' : 'N',
                    ModuleDetails: service.ModuleDetails.map(module => ({ ...module, Status: checked ? 'Y' : 'N' }))
                };
            }

            if (flag === "M" && moduleIndex !== undefined) {
                const updatedModules = service.ModuleDetails.map((module, mIdx) =>
                    mIdx === moduleIndex ? { ...module, Status: checked ? 'Y' : 'N' } : module
                );

                const anyEnabled = updatedModules.some(m => m.Status === 'Y');

                return {
                    ...service,
                    Status: anyEnabled ? 'Y' : 'N',
                    ModuleDetails: updatedModules
                };
            }

            return service;
        });

        setFieldValue('services', services);
    };

        return (
        <div className={`${flag === "List" ? "card" : ""}`}>
            <Card.Body className={`${flag === "List" ? "p-3" : "p-0"}`}>

                {flag === "List" &&
                    <div className="d-flex">
                        <div className="d-flex text-base mb-0 fw-semibold gap-2">
                            <span className="icon-wrapper-sm">
                                <Settings size={16} />
                            </span>
                            {heading}
                        </div>

                        <div className="ms-auto">
                            <Button
                                type="button"
                                variant="success-gradient"
                                onClick={handleUpdateLicense}
                                className="me-3"
                                size='sm'>
                                <CheckCircle2 size={15} className="me-2" />
                                Re-New License
                            </Button>

                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleLicenseMdl}
                                size='sm'>
                                <SquarePen size={15} className="me-2" />
                                Modify License
                            </Button>
                        </div>
                    </div>
                }


                <Datatable
                    data={serviceValues?.services}
                    columns={columns}
                    style={{ height: "calc(-440px + 100vh)", overflow: "auto", }}
                    tableNm="services"
                    // rowStyle="bg-light"
                    isNotCardRequired
                // subDtlRow={(child) => {
                //     return (
                //         <>
                //             {child.row?.ModuleDetails?.length > 0 && child.row?.ModuleDetails?.map((module: ServiceModule, moduleIndex: number) => (
                //                 <tr key={`${child.rowIndex}-${moduleIndex}`}>
                //                     {child.columns?.map((column: any, colIndex: number) => {
                //                         return (
                //                             <td key={colIndex} className={`p-2 text-sm`}>
                //                                 {column.field === "serviceName" && (
                //                                     <div className="ps-5">
                //                                         {module.ModuleName}
                //                                         <span className="text-muted ms-2">({module.ModuleCode})</span>
                //                                     </div>
                //                                 )}

                //                                 {column.field === "Status" && (
                //                                     <div className="text-center">
                //                                         {flag === "List" ? (
                //                                             <StatusBadge label="Active" variant="success" />
                //                                         ) : (
                //                                             <Checkbox
                //                                                 checked={module.Status === 'Y'}
                //                                                 className="justify-content-center"
                //                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //                                                     handleServiceCheckboxChange(child.rowIndex, e.target.checked, "M", moduleIndex)
                //                                                 }
                //                                             />
                //                                         )}
                //                                     </div>
                //                                 )}

                //                                 {
                //                                     column.field !== "serviceName" &&
                //                                     column.field !== "Status" &&
                //                                     module[column.field as keyof ServiceModule]}
                //                             </td>
                //                         );
                //                     })}
                //                 </tr>
                //             ))
                //             }
                //         </>
                //     )
                // }}
                >
                    {(child) => (
                        <>
                            {child.column.field === "serviceName" && (
                                <>
                                    <Settings size={15} className="me-2" />
                                    {child.row.serviceName}
                                    <span className="text-muted ms-2 text-xs">({child.row.serviceCode})</span>
                                </>
                            )}

                            {child.column.field === "Status" && (
                                <>
                                    {flag === "List" ? (
                                        <StatusBadge label="Active" variant="success" className="" />
                                    ) : (
                                        <Checkbox
                                            checked={child.row.Status === 'Y'}
                                            className="justify-content-center"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                handleServiceCheckboxChange(child.rowIndex, e.target.checked, "P")
                                            }
                                        />
                                    )}
                                </>
                            )}

                            {
                                child.column.field !== "serviceName" &&
                                child.column.field !== "Status" &&
                                child.row[child.column.field]}
                        </>
                    )}
                </Datatable>

            </Card.Body>
        </div>
    );
};

export default LicenseServicesTbl;
import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';

interface TicketTemplateTblProps {
    handleCloseTicketTempMdl: any
}

const columns: tableColumnProps[] = [
    {
        field: 'templateNm',
        header: 'Template Name',
        sorting: true,
    },
    {
        field: 'ticketype',
        header: 'Ticket Type',
        sorting: true,
    },
    {
        field: 'createdBy',
        header: 'Created By',
        sorting: true,
    },
    {
        field: 'createdDate',
        header: 'Created Date',
        sorting: true,
    },
    {
        field: 'status',
        header: 'Status',
        sorting: false,
    },
    {
        field: '',
        header: 'Actions',
        align: "center",
        sorting: false,
    }
];

const dummyData = [
    {
        templateNm: "Hardware Issue Template",
        ticketype: "Incident",
        createdBy: "John Doe",
        createdDate: "15-01-2026",
        status: true,
    },
    {
        templateNm: "Software Access Request",
        ticketype: "Service Request",
        createdBy: "Jane Smith",
        createdDate: "10-02-2026",
        status: true,
    },
    {
        templateNm: "Server Outage Alert",
        ticketype: "Problem",
        createdBy: "Alex Jones",
        createdDate: "22-03-2026",
        status: false,
    },
    {
        templateNm: "Network Upgrade Draft",
        ticketype: "Change Request",
        createdBy: "Sarah Lee",
        createdDate: "05-04-2026",
        status: false,
    },
    {
        templateNm: "New Asset Onboarding",
        ticketype: "Service Request",
        createdBy: "Jane Smith",
        createdDate: "12-04-2026",
        status: true,
    },
    {
        templateNm: "Database Backup Failure",
        ticketype: "Incident",
        createdBy: "John Doe",
        createdDate: "01-05-2026",
        status: true,
    },
    {
        templateNm: "Security Patch Deployment",
        ticketype: "Change Request",
        createdBy: "Alex Jones",
        createdDate: "18-05-2026",
        status: true,
    },
    {
        templateNm: "Email Sync Issue",
        ticketype: "Incident",
        createdBy: "Sarah Lee",
        createdDate: "28-05-2026",
        status: false,
    }
];


const TicketTemplateTbl: React.FC<TicketTemplateTblProps> = ({ handleCloseTicketTempMdl }) => {
    return (
        <>
            <Datatable
                data={dummyData}
                columns={columns}
                isSearchBar
                pagination
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'status' &&
                            <ToggleSwitch
                                checked={child.row.status}
                                onChange={() => console.log('')}
                            />
                        }

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseTicketTempMdl(child.row)} ><Pen size={16} /></Button>

                                {/* <Button variant="edit" title="Ticket auto assign" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseSubCategoryMdl(child.row)} ><GitFork size={16} /></Button> */}

                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle"><Trash size={16} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

                        {
                            child.column.field !== "modifyBy" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>

        </>
    )
}

export default TicketTemplateTbl
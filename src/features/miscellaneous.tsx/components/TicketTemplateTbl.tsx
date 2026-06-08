import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react';
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

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseTicketTempMdl(child.row)}>
                                        <Pen size={16} />
                                        <span className='text-sm'>Edit</span>
                                    </Dropdown.Item>

                                    {/* onClick={() => handleConfirmation()} */}
                                    {/* --- DESTRUCTIVE SECTION --- */}
                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3 text-danger delete-dropDown" >
                                        <Trash2 size={16} />
                                        <span className='text-sm '>Delete</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

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
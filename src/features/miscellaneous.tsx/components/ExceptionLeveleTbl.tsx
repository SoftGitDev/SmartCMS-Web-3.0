import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';

interface ExceptionLeveleTblProps {
    handleCloseExcepLevelMdl: (row: any) => void
}

const columns: tableColumnProps[] = [
    {
        field: 'levelNm',
        header: 'Level  Name',
        sorting: true,
    },

    {
        field: 'internalPerod',
        header: 'Internal Period',
        sorting: true,
    },

    {
        field: 'externalPerod',
        header: 'External Period',
        sorting: true,
    },

    {
        field: 'alertBy',
        header: 'Alert By',
        sorting: true,
    },

    {
        field: 'mailTemp',
        header: 'Mail Template',
        sorting: true,
    },

    {
        field: 'smsTemp',
        header: 'SMS Template',
        sorting: true,
    },

    {
        field: '',
        header: '',
        align: "center",
        sorting: false,
    }
];


// Define your data interface based on your column configuration
export interface EscalationRowData {
    levelNm: string;
    internalPerod: string;
    externalPerod: string;
    alertBy: 'Mail' | 'SMS' | 'Both';
    mailTemp: string;
    smsTemp: string;
}

// 2. Populate the dummy data
const datadummy: any[] = [
    {
        levelNm: 'Level 1 - General Inquiry',
        internalPerod: '4 Hours',
        externalPerod: '12 Hours',
        alertBy: 'Mail',
        mailTemp: 'Standard_Ack_Email',
        smsTemp: 'N/A'
    },
    {
        levelNm: 'Level 2 - Technical Support',
        internalPerod: '2 Hours',
        externalPerod: '4 Hours',
        alertBy: 'SMS',
        mailTemp: 'N/A',
        smsTemp: 'Tech_Assigned_Ping'
    },
    {
        levelNm: 'Level 3 - High Priority SLA',
        internalPerod: '1 Hour',
        externalPerod: '2 Hours',
        alertBy: 'Both',
        mailTemp: 'Urgent_SLA_Warning_Email',
        smsTemp: 'SLA_Breach_SMS'
    },
    {
        levelNm: 'Level 4 - Critical Escalation',
        internalPerod: '15 Minutes',
        externalPerod: '30 Minutes',
        alertBy: 'Both',
        mailTemp: 'System_Outage_Detailed_Alert',
        smsTemp: 'CRITICAL_P0_IMMEDIATE_ACTION'
    },
    {
        levelNm: 'Management Review',
        internalPerod: '24 Hours',
        externalPerod: '48 Hours',
        alertBy: 'Mail',
        mailTemp: 'Exec_Summary_Template',
        smsTemp: 'N/A'
    }
];

const ExceptionLeveleTbl: React.FC<ExceptionLeveleTblProps> = ({ handleCloseExcepLevelMdl }) => {
    return (
        <>
            <Datatable
                data={datadummy}
                columns={columns}
                isSearchBar
                pagination
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseExcepLevelMdl(child.row)}>
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

export default ExceptionLeveleTbl
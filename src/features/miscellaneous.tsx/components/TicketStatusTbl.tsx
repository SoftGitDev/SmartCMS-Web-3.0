// Purpose: Ticket Status Table screen 
// Created by: Harish
// Created Date: 02-06-2026


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import { tableColumnProps } from '../../../services/type';
import StatusBadge from '../../../common/components/ui/customBadge/StatusBadge';


const columns: tableColumnProps[] = [
    {
        field: 'statusNm',
        header: 'Status Name',
        sorting: true,
    },
    {
        field: 'statustype',
        header: 'Status Type',
        sorting: true,
    },
    {
        field: 'statusFor',
        header: 'Status For',
        sorting: true,
    },
    {
        field: '',
        header: 'Actions',
        align: "center",
        sorting: false,
    }
];

// 1. Define the data row interface
interface StatusDataRow {
    statusNm: string;
    statustype: string;
    statusFor: string;
}

// 2. Populate the dummy data
const dummyData: StatusDataRow[] = [
    {
        statusNm: 'New Ticket',
        statustype: 'Open',
        statusFor: 'Customer Support',
    },
    {
        statusNm: 'Resolved',
        statustype: 'warning',
        statusFor: 'Bug Tracking',
    },
    {
        statusNm: 'In Progress',
        statustype: 'Open',
        statusFor: 'Feature Requests',
    },
    {
        statusNm: 'Cancelled',
        statustype: 'Closed',
        statusFor: 'Order Processing',
    },
    {
        statusNm: 'Feedback Required',
        statustype: 'Pending',
        statusFor: 'Client Portal',
    }
];


interface TicketStatusTblProps {
    handleCloseTicketStatus: any
}
const TicketStatusTbl: React.FC<TicketStatusTblProps> = ({ handleCloseTicketStatus }) => {
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
                        {child.column.field === 'statustype' && (() => {
                            const statusValue = child.row.statustype;

                            // Maps your data strings directly to your StatusBadge variants
                            const statusToVariantMap: Record<string, string> = {
                                'Open': 'success',
                                'Closed': 'danger',
                                'Pending': 'warning',    // Maps "Pending" to your warning styles
                                'warning': 'warning',    // Handles cases where the database value is literally "warning"
                            };

                            // Find the mapped variant, default to 'primary' if not found
                            const computedVariant = statusToVariantMap[statusValue] || 'primary';

                            return (
                                <StatusBadge
                                    label={statusValue}
                                    variant={computedVariant}
                                />
                            );
                        })()}

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseTicketStatus(child.row)}>
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
                            child.column.field !== "statustype" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>

        </>
    )
}

export default TicketStatusTbl
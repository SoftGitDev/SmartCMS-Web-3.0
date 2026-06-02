// Purpose: Ticket Status Table screen 
// Created by: Harish
// Created Date: 02-06-2026


import React, { JSX } from 'react'
import { tableColumnProps } from '../../../types/typr';
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';
import { Datatable } from '../../../components/ui/DataTable/Datatable';
import StatusBadge from '../../../components/ui/customBadge/StatusBadge';

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

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseTicketStatus(child.row)} ><Pen size={16} /></Button>

                                {/* <Button variant="edit" title="Ticket auto assign" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseSubCategoryMdl(child.row)} ><GitFork size={16} /></Button> */}

                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle"><Trash size={16} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

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
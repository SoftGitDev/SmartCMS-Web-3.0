/************************************************************
// Component     :  Customers Table
// Purpose       : In this we  Customers Data in Table Viwe and action Approve an reject and edit .
// Created by    : Harish
// Created Date  : 09-06-2026

************************************************************/

import React, { JSX } from 'react'
import { Datatable } from '../../../common/components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../services/type';
import { Dropdown } from 'react-bootstrap';
import { CheckCheck, CheckCircle, EllipsisVertical, Pen, Trash2, XCircle } from 'lucide-react';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import StatusBadge from '../../../common/components/ui/customBadge/StatusBadge';


interface customerTblProps {
    data: any
    flag: string
    handleEditCustomerDtl?: (row: any) => void
}
const CustomerTbl: React.FC<customerTblProps> = ({ data, flag, handleEditCustomerDtl }) => {

    const columns: tableColumnProps[] = [
        {
            field: 'UserName',
            header: 'UserName',
            sorting: true,
        },
        {
            field: 'firstNm',
            header: 'Person Name',
            sorting: true,
        },
        {
            field: 'MobileNo',
            header: 'Mobile No.',
            sorting: true,
        },
        {
            field: 'EmailId',
            header: 'Email Id',
            sorting: true,
        },

        ...(flag !== 'R' ? [
            {
                field: 'LastActivityDate',
                header: 'Last Activity',
                sorting: true,
            },
        ] : []),


        ...(flag !== 'P' ? [
            {
                field: 'status',
                header: 'Status',
                align: "left",
                sorting: false,
            },
        ] : []),

        ...(flag === 'R' ? [
            {
                field: 'AuthRejectReason',
                header: 'Reason',
                align: "left",
                sorting: false,
            },
        ] : []),

        ...(flag === 'A' ? [
            {
                field: '',
                header: '',
                align: "right",
                sorting: false,
            },
        ] : []),

    ];

    return (
        <>
            <Datatable
                data={data}
                columns={columns}
                isSearchBar
                pagination
                isNotCardRequired
                isNotHoverable
                style={{ height: "calc(-385px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'UserName' &&
                            <>
                                <div className="d-flex align-items-center gap-2">
                                    <div className='blank-logo text-lg'>
                                        {child.row.UserName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div>{child.row.UserName}</div>
                                        {/* <div className='text-sm text-slate-500'> <span className='text-primary'>Role : </span>{child.row.roleNm}</div> */}
                                    </div>
                                </div>
                            </>
                        }

                        {child.column.field === 'firstNm' &&
                            <div className='d-flex gap-1'>
                                <div>{child.row.firstNm}</div>
                                {child.row.lastNm &&
                                    <div>{child.row.lastNm}</div>
                                }
                            </div>
                        }

                        {child.column.field === "AuthRejectReason" && (
                            <div>{child.row?.AuthRejectReason || "-"}</div>
                        )}

                        {child.column.field === 'status' && (
                            flag === 'A' ?
                                <ToggleSwitch
                                    value={child.row.status}
                                    checked={child.row.status}
                                    onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                        throw new Error('Function not implemented.');
                                    }} />
                                :
                                <>
                                    <StatusBadge label='Rejected' variant='danger' />
                                </>

                        )}

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>
                                    {/* onClick={() => handleUserMdl(child.row)} */}
                                    {flag === 'A' ?
                                        <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleEditCustomerDtl?.(child.row)}>
                                            <Pen size={16} />
                                            <span className='text-sm'>Edit</span>
                                        </Dropdown.Item>
                                        :
                                        <>
                                            <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3">
                                                <CheckCircle size={16} />
                                                <span className="text-sm">Approve Customer</span>
                                            </Dropdown.Item>

                                            {/* Rejection Action */}
                                            <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3 text-danger">
                                                <XCircle size={16} />
                                                <span className="text-sm">Reject Customer</span>
                                            </Dropdown.Item>
                                        </>
                                    }


                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                        {
                            child.column.field !== "status" &&
                            child.column.field !== "UserName" &&
                            child.column.field !== "firstNm" &&
                            child.column.field !== "AuthRejectReason" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default CustomerTbl
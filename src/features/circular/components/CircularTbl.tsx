// Purpose: Circular Table screen
// Created by: Harish 
// Created Date: 04-06-2026



import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import StatusBadge from '../../../common/components/ui/customBadge/StatusBadge';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';


const columns: tableColumnProps[] = [
    {
        field: 'Title',
        header: 'Title',
        sorting: true,
    },
    {
        field: 'AcFor',
        header: 'For User',
        sorting: true,
        align: "center"
    },
    {
        field: 'EmailAlert',
        header: 'Email Alert',
        sorting: true,
        align: "center"
    },
    {
        field: 'StartDate',
        header: 'Start Date',
        sorting: true,
    },
    {
        field: 'EndDate',
        header: 'End Date',
        sorting: true,
    },
    {
        field: 'PublishStatus',
        header: 'Publish',
        align: "center",
        sorting: false,
    },
    {
        field: 'Status',
        header: 'Status',
        align: "center",
        sorting: false,
    },
    {
        field: '',
        header: '',
        sorting: false,
        width: 100
    },
];

interface CircularTblProps {

}

const dummayData = [
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "100",
        "AcFor": "B",
        "Title": "Quarterly Interest Rate Update",
        "BankCode": "00001",
        "EndDate": "14-06-2026",
        "ActiveStatus": "Active",
        "StartDate": "12-06-2026",
        "EntryDate": "12-06-2026 10:00:00",
        "CircularName": "Retail Banking Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "101",
        "AcFor": "B",
        "Title": "Revised Fixed Deposit Guidelines",
        "BankCode": "00002",
        "EndDate": "15-06-2026",
        "ActiveStatus": "Closed",
        "StartDate": "13-06-2026",
        "EntryDate": "13-06-2026 10:00:00",
        "CircularName": "Compliance Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "102",
        "AcFor": "B",
        "Title": "New Cyber Security Protocol",
        "BankCode": "00003",
        "EndDate": "16-06-2026",
        "ActiveStatus": "Active",
        "StartDate": "14-06-2026",
        "EntryDate": "14-06-2026 10:00:00",
        "CircularName": "IT Security Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "103",
        "AcFor": "B",
        "Title": "Mobile Banking App Upgrade",
        "BankCode": "00004",
        "EndDate": "17-06-2026",
        "ActiveStatus": "Closed",
        "StartDate": "15-06-2026",
        "EntryDate": "15-06-2026 10:00:00",
        "CircularName": "Digital Banking Circular",
        "PublishStatus": false
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "104",
        "AcFor": "B",
        "Title": "Holiday Operations Schedule",
        "BankCode": "00005",
        "EndDate": "18-06-2026",
        "ActiveStatus": "Active",
        "StartDate": "16-06-2026",
        "EntryDate": "16-06-2026 10:00:00",
        "CircularName": "Operations Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "105",
        "AcFor": "B",
        "Title": "Anti-Money Laundering Policy",
        "BankCode": "00006",
        "EndDate": "19-06-2026",
        "ActiveStatus": "Closed",
        "StartDate": "17-06-2026",
        "EntryDate": "17-06-2026 10:00:00",
        "CircularName": "Risk Management Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "106",
        "AcFor": "B",
        "Title": "Credit Card Rewards Revision",
        "BankCode": "00007",
        "EndDate": "20-06-2026",
        "ActiveStatus": "Active",
        "StartDate": "18-06-2026",
        "EntryDate": "18-06-2026 10:00:00",
        "CircularName": "Cards & Payments Circular",
        "PublishStatus": false
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "107",
        "AcFor": "B",
        "Title": "SME Loan Scheme Launch",
        "BankCode": "00008",
        "EndDate": "21-06-2026",
        "ActiveStatus": "Closed",
        "StartDate": "19-06-2026",
        "EntryDate": "19-06-2026 10:00:00",
        "CircularName": "Lending Services Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "108",
        "AcFor": "B",
        "Title": "Corporate Governance Update",
        "BankCode": "00009",
        "EndDate": "22-06-2026",
        "ActiveStatus": "Active",
        "StartDate": "20-06-2026",
        "EntryDate": "20-06-2026 10:00:00",
        "CircularName": "Secretarial Circular",
        "PublishStatus": true
    },
    {
        "Status": true,
        "EmailAlert": true,
        "UserName": "admin",
        "TranCode": "109",
        "AcFor": "B",
        "Title": "Branch Merging Announcement",
        "BankCode": "00010",
        "EndDate": "23-06-2026",
        "ActiveStatus": "Upcomming",
        "StartDate": "21-06-2026",
        "EntryDate": "21-06-2026 10:00:00",
        "CircularName": "Network Operations Circular",
        "PublishStatus": false
    }
]

const CircularTbl: React.FC<CircularTblProps> = ({ }) => {
    return (
        <>
            <Datatable
                data={dummayData}
                columns={columns}
                isSearchBar
                isNotHoverable
                pagination
                isNotCardRequired
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}

            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === "Title" && (
                            <>
                                <div className="text-sm d-flex align-items-center text-capitalize">{child.row.Title}</div>
                                <div className="text-xs d-flex align-items-center text-slate-500">{child.row.CircularName} {child.row.UserName && ` | ${child.row.UserName}`} {child.row.EntryDate && ` | ${child.row.EntryDate}`}</div>
                            </>
                        )}
                        {child.column.field === "StartDate" && (
                            <div className="text-sm">{child.row.StartDate}</div>
                        )}
                        {child.column.field === "EndDate" && (
                            <div className="text-sm">{child.row.EndDate}</div>
                        )}
                        {child.column.field === "AcFor" && (
                            <>
                                {child.row.AcFor === "A" && "Internal"}
                                {child.row.AcFor === "C" && "External"}
                                {child.row.AcFor === "B" && "Both"}
                            </>
                        )}

                        {child.column.field === "Status" && (
                            <div className='d-flex justify-content-center'>
                                {child.row.ActiveStatus === "Active" && <StatusBadge variant='success' label={child.row.ActiveStatus} />}
                                {child.row.ActiveStatus === "Closed" && <StatusBadge variant="transparent" label={child.row.ActiveStatus} />}
                                {child.row.ActiveStatus === "Upcomming" && <StatusBadge variant="warning" label={child.row.ActiveStatus} />}
                            </div>
                        )}

                        {child.column.field === "EmailAlert" && (
                            <>
                                {child.row.EmailAlert === "Y" ? "Yes" : "No"}
                            </>
                        )}

                        {child.column.field === "PublishStatus" && (
                            <div className='d-flex justify-content-center'>
                                <ToggleSwitch
                                    checked={child.row.PublishStatus === "P"}
                                    onChange={(e: any) => {
                                        // const updateData = [...data];
                                        // const findIndex = updateData.findIndex((items: any) => items.TranCode === child.row.TranCode);
                                        // updateData[findIndex].PublishStatus = e.target.checked ? "P" : "D";
                                        // if (permission.Update === "Y" || row.ActiveStatus === "Closed") {
                                        // publishtoCircular(e.target.checked ? "P" : "D", child.row.TranCode)
                                        // }
                                        // setCircularData(updateData);
                                    }}
                                />
                            </div>
                        )}

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                {/* onClick={() => handleUserRoleMdl(child.row)} */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle"  ><Pen size={14} /></Button>
                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" ><Trash size={14} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

                        {/* DEFAULT FALLBACK */}
                        {
                            child.column.field !== "Title" &&
                            child.column.field !== "AcFor" &&
                            child.column.field !== "EmailAlert" &&
                            child.column.field !== "Status" &&
                            child.column.field !== "PublishStatus" &&
                            child.column.field !== "StartDate" &&
                            child.column.field !== "EndDate" &&
                            <span>{child.row[child.column.field as keyof any]}</span>
                        }
                    </>
                )}

            </Datatable>
        </>
    )
}

export default CircularTbl
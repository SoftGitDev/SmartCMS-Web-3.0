
// Purpose: Announcement Table screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { JSX } from 'react'
import { tableColumnProps } from '../../../types/typr';
import { Datatable } from '../../../components/ui/DataTable/Datatable';
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch';

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
        align: "left"
    },
    {
        field: 'PopupAlert',
        header: 'Popup Alert',
        sorting: true,
        align: "left"
    },
    {
        field: 'EmailAlert',
        header: 'Email Alert',
        sorting: true,
        align: "left"
    },
    {
        field: 'StartDate',
        header: 'Start Date',
        sorting: true,
        align: "left"

    },
    {
        field: 'EndDate',
        header: 'End Date',
        sorting: true,
        align: "left"

    },
    {
        field: 'PublishStatus',
        header: 'Publish',
        align: "left",
        sorting: false,
    },
    {
        field: 'Status',
        header: 'Status',
        align: "left",
        sorting: false,
    },
    {
        field: '',
        header: '',
        sorting: false,
        width: 100
    },
];

const announcementTableData = [
    {
        Title: "Scheduled Core Banking Switch Maintenance Window",
        AcFor: "All Users",
        PopupAlert: true,
        EmailAlert: true,
        StartDate: "2026-06-10",
        EndDate: "2026-06-11",
        PublishStatus: true,
        Status: true,
        id: "ANN-001",
        TranCode: "TC-ANN-101"
    },
    {
        Title: "New WhatsApp Business API Integration Suite Live",
        AcFor: "Developers",
        PopupAlert: false,
        EmailAlert: true,
        StartDate: "2026-06-05",
        EndDate: "2026-06-20",
        PublishStatus: true,
        Status: true,
        id: "ANN-002",
        TranCode: "TC-ANN-102"
    },
    {
        Title: "Corporate Mandate Portal Patch Release v2.4",
        AcFor: "Corporate Clients",
        PopupAlert: true,
        EmailAlert: false,
        StartDate: "2026-06-15",
        EndDate: "2026-06-18",
        PublishStatus: false, // Draft state
        Status: true,
        id: "ANN-003",
        TranCode: "TC-ANN-103"
    },
    {
        Title: "Urgent: Multi-Branch Cash Reserve Cap Adjustments",
        AcFor: "Internal Admins",
        PopupAlert: true,
        EmailAlert: true,
        StartDate: "2026-06-03",
        EndDate: "2026-06-04",
        PublishStatus: true,
        Status: true,
        id: "ANN-004",
        TranCode: "TC-ANN-104"
    },
    {
        Title: "SOP Update: ATM Cassette Physical Fault demuxing logs",
        AcFor: "Field Engineers",
        PopupAlert: false,
        EmailAlert: false,
        StartDate: "2026-05-20",
        EndDate: "2026-06-01",
        PublishStatus: true,
        Status: false, // Expired / Deactivated announcement
        id: "ANN-005",
        TranCode: "TC-ANN-105"
    }
];

const Announcementbl = () => {
    return (
        <>
            <Datatable
                data={announcementTableData}
                columns={columns}
                isNotHoverable
                isNotCardRequired
                isSearchBar
                pagination
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
            >

                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === 'PublishStatus' &&
                            <ToggleSwitch
                                checked={child.row.PublishStatus}
                                onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                    throw new Error('Function not implemented.');
                                }} />
                        }

                        {child.column.field === 'EmailAlert' &&
                            <ToggleSwitch
                                checked={child.row.EmailAlert}
                                onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                    throw new Error('Function not implemented.');
                                }} />
                        }

                        {child.column.field === 'PopupAlert' &&
                            <ToggleSwitch
                                checked={child.row.PopupAlert}
                                onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                    throw new Error('Function not implemented.');
                                }} />
                        }

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
                            child.column.field !== "PublishStatus" &&
                            child.column.field !== "EmailAlert" &&
                            child.column.field !== "PopupAlert" &&
                            <span>{child.row[child.column.field as keyof any]}</span>
                        }
                    </>
                )}

            </Datatable>
        </>
    )
}

export default Announcementbl
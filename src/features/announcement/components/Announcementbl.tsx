
// Purpose: Announcement Table screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react';
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
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

interface AnnouncementblProps {
    handleToggleAnnouncementMdl: (row: any) => void
}
const Announcementbl: React.FC<AnnouncementblProps> = ({ handleToggleAnnouncementMdl }) => {
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

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleToggleAnnouncementMdl(child.row)}>
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
// Purpose: Ticket Table - Manage tickets, ticket records, status tracking, assignments, and support operations
// Created by: Harish
// Created Date: 02-06-2026


import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../types/typr';
import StatusBadge from '../../../components/ui/customBadge/StatusBadge';
import { Dropdown } from 'react-bootstrap';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const columns: tableColumnProps[] = [
    {
        field: 'ticketIcon',
        header: '',
        sorting: false,
        align: 'center',
        width: '12px'
    },
    {
        field: 'ticketId',
        header: 'Ticket ID',
        sorting: true,
    },
    {
        field: 'subject',
        header: 'Subject',
        sorting: true,
    },
    {
        field: 'branch',
        header: 'Branch',
        sorting: true,
    },
    {
        field: 'category',
        header: 'Category',
        sorting: true,
    },
    {
        field: 'priority',
        header: 'Priority',
        sorting: true,
    },
    {
        field: 'status',
        header: 'Status',
        sorting: true,
        align: "center",
    },
    {
        field: 'lastActivity',
        header: 'Last Activity',
        sorting: true,
    },
    {
        field: 'replies',
        header: 'Replies',
        sorting: true,
        align: "center", // Centered as it contains numeric counts
    },
    {
        field: 'createdDate',
        header: 'Created Date',
        sorting: true,
    },
    {
        field: 'action',
        header: 'Action',
        sorting: false,
        align: "center", // Centered for the three-dot vertical menu icons
    }
];


const ticketData = [
    {
        id: 1,
        avatarInitials: "HI",
        ticketId: "#SOFT2606T0001",
        subject: "testing",
        branch: "IT Department",
        category: "WhatsApp Business API",
        department: "IT_Department",
        priority: "High",
        status: "Assigned",
        lastActivity: "01-06-2026 17:01:41",
        lastActivityUser: "John Doe",
        replies: 4,
        createdDate: "01-06-2026"
    },
    {
        id: 2,
        avatarInitials: "MS",
        ticketId: "#SOFT2605T0003",
        subject: "Test",
        branch: "Sales Team",
        category: "ATM",
        department: "transaction issue",
        priority: "Medium",
        status: "Assigned",
        lastActivity: "30-05-2026 12:01:19",
        lastActivityUser: "Jane Smith",
        replies: 1,
        createdDate: "08-05-2026"
    },
    {
        id: 3,
        avatarInitials: "AT",
        ticketId: "#SOFT2605T0006",
        subject: "ATM Regarding",
        branch: "Sales Team",
        category: "ATM",
        department: "transaction issue",
        priority: "High",
        status: "Pending",
        lastActivity: "20-05-2026 16:20:50",
        lastActivityUser: "Robert Brown",
        replies: 0,
        createdDate: "20-05-2026"
    },
    {
        id: 4,
        avatarInitials: "VI",
        ticketId: "#SOFT2605T0005",
        subject: "VAPT AUTHORIZED TEST - VAPT_XSS_20260509_1778310663",
        branch: "IT Department",
        category: "WhatsApp Business API",
        department: "IT_Department",
        priority: "High",
        status: "Assigned",
        lastActivity: "09-05-2026 12:42:10",
        lastActivityUser: "Alex Johnson",
        replies: 2,
        createdDate: "09-05-2026"
    },
    {
        id: 5,
        avatarInitials: "SM",
        ticketId: "#SOFT2605T0002",
        subject: "Test",
        branch: "Operations",
        category: "ATM",
        department: "transaction issue",
        priority: "Low",
        status: "Pending",
        lastActivity: "07-05-2026 12:32:40",
        lastActivityUser: "Emily Davis",
        replies: 0,
        createdDate: "07-05-2026"
    },
    {
        id: 6,
        avatarInitials: "HI",
        ticketId: "#SOFT2605T0001",
        subject: "Testing",
        branch: "Support Services",
        category: "WhatsApp Business API",
        department: "Service",
        priority: "Medium",
        status: "Assigned",
        lastActivity: "04-05-2026 16:20:10",
        lastActivityUser: "Michael Lee",
        replies: 1,
        createdDate: "04-05-2026"
    },
    {
        id: 7,
        avatarInitials: "HI",
        ticketId: "#SOFT2604T0004",
        subject: "test",
        branch: "IT Department",
        category: "SMS Service",
        department: "IT_Department",
        priority: "Low",
        status: "Assigned",
        lastActivity: "27-04-2026 12:02:10",
        lastActivityUser: "Sarah Wilson",
        replies: 1,
        createdDate: "27-04-2026"
    },
    {
        id: 8,
        avatarInitials: "HI",
        ticketId: "#SOFT2604T0003",
        subject: "test",
        branch: "IT Department",
        category: "WhatsApp Business API",
        department: "IT_Department",
        priority: "Low",
        status: "Assigned",
        lastActivity: "27-04-2026 12:00:50",
        lastActivityUser: "David Clark",
        replies: 1,
        createdDate: "27-04-2026"
    },
    {
        id: 9,
        avatarInitials: "HI",
        ticketId: "#SOFT2604T0002",
        subject: "SMS not receive",
        branch: "Support Services",
        category: "SMS Service",
        department: "Service",
        priority: "Medium",
        status: "Assigned",
        lastActivity: "16-04-2026 15:12:10",
        lastActivityUser: "Lisa White",
        replies: 1,
        createdDate: "16-04-2026"
    },
    {
        id: 10,
        avatarInitials: "HI",
        ticketId: "#SOFT2603T0004",
        subject: "Test",
        branch: "Operations",
        category: "ATM",
        department: "transaction issue",
        priority: "Low",
        status: "Pending",
        lastActivity: "24-03-2026 12:21:10",
        lastActivityUser: "Kevin Martin",
        replies: 0,
        createdDate: "24-03-2026"
    }
];

const priorityVariants: Record<string, string> = {
    "High": "danger",
    "Medium": "warning",
    "Low": "success"
};

const statusVariants: Record<string, string> = {
    "High": "danger",
    "Pending": "warning",
    "Assigned": "primary"
};

const TicketTbl = () => {
    // Inside your component:
    const navigate = useNavigate();
    return (
        <>
            <Datatable
                data={ticketData}
                columns={columns}
                isSearchBar
                pagination
                onDoubleClick={(row) => navigate(`/tickets/ticketdtl`, { state: { ticket: row } })}
                style={{ height: "calc(-465px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === 'ticketIcon' &&
                            <div className='blank-logo text-lg'>
                                {child.row.avatarInitials}
                            </div>
                        }

                        {child.column.field === 'category' &&
                            <div>
                                <div className="text-sm">{child.row.category}</div>
                                <div className='text-xs text-slate-500'>{child.row.department}</div>
                            </div>
                        }

                        {child.column.field === 'lastActivity' &&
                            <div>
                                <div className="text-sm">{child.row.lastActivity}</div>
                                <div className='text-xs text-slate-500'>By {child.row.lastActivityUser}</div>
                            </div>
                        }

                        {child.column.field === 'priority' && (
                            <StatusBadge
                                label={child.row.priority}
                                // Fallback to 'light' or 'dark' if the data string doesn't match perfectly
                                variant={priorityVariants[child.row.priority] || 'light'}
                            />
                        )}

                        {child.column.field === 'status' && (
                            <StatusBadge
                                label={child.row.status}
                                // Fallback to 'light' or 'dark' if the data string doesn't match perfectly
                                variant={statusVariants[child.row.status] || 'light'}
                            />
                        )}

                        {child.column.field === 'action' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>
                                {/* <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>
                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3">
                                    </Dropdown.Item>
                                </Dropdown.Menu> */}
                            </Dropdown>
                        )}

                        {
                            child.column.field !== "status" &&
                            child.column.field !== "priority" &&
                            child.column.field !== "ticketIcon" &&
                            child.column.field !== "category" &&
                            child.column.field !== "actions" &&
                            child.column.field !== "lastActivity" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default TicketTbl
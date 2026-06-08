// Purpose: Article Table screen
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
        field: 'Topic',
        header: 'Topic',
        sorting: true,
    },
    {
        field: 'ArticleType',
        header: 'Article Type',
        sorting: true,
        align: "left"
    },
    {
        field: 'ArticleFor',
        header: 'Article For',
        sorting: true,
        align: "left"
    },
    {
        field: 'PublishStatus',
        header: 'Publish',
        align: "left",
        sorting: true,
    },
    {
        field: 'EntryBy',
        header: 'Created By',
        sorting: true,
    },
    {
        field: 'EntryDt',
        header: 'Created Date',
        sorting: true,
    },
    {
        field: '',
        header: '',
        align: "center",
        width: 100,
        sorting: false,
    },
];

const articleTableData = [
    {
        Topic: "How to Configure WhatsApp Business API Webhooks",
        ArticleType: "Technical Guide",
        ArticleFor: "Developers",
        PublishStatus: true, // Replaces "Published"
        EntryBy: "Prateek Sharma",
        EntryDt: "2026-05-12",
        id: "ART-001",
        TranCode: "TC-ART-901"
    },
    {
        Topic: "Corporate Panel: Setting Up Recurring NACH Mandates",
        ArticleType: "User Manual",
        ArticleFor: "Corporate Clients",
        PublishStatus: true, // Replaces "Published"
        EntryBy: "Tilak Verma",
        EntryDt: "2026-05-28",
        id: "ART-002",
        TranCode: "TC-ART-902"
    },
    {
        Topic: "ATM Cassette Physical Jam Troubleshooting Steps",
        ArticleType: "Standard Operating Procedure",
        ArticleFor: "Field Engineers",
        PublishStatus: false, // Replaces "Draft"
        EntryBy: "Praveen Kumar",
        EntryDt: "2026-06-01",
        id: "ART-003",
        TranCode: "TC-ART-903"
    },
    {
        Topic: "Optimizing High-Throughput REST IMPS Fund Transfers",
        ArticleType: "API Reference",
        ArticleFor: "Integrators",
        PublishStatus: true, // Replaces "Published"
        EntryBy: "Prateek Sharma",
        EntryDt: "2026-04-15",
        id: "ART-004",
        TranCode: "TC-ART-904"
    },
    {
        Topic: "Security Best Practices for Multi-Branch Administration",
        ArticleType: "Compliance Note",
        ArticleFor: "Internal Admins",
        PublishStatus: false, // Replaces "Archived"
        EntryBy: "System Core",
        EntryDt: "2025-11-20",
        id: "ART-005",
        TranCode: "TC-ART-905"
    },
    {
        Topic: "Understanding Real-Time Core Ledger Settlement Window",
        ArticleType: "Whitepaper",
        ArticleFor: "Banking Partners",
        PublishStatus: true, // Replaces "Published"
        EntryBy: "Tilak Verma",
        EntryDt: "2026-02-14",
        id: "ART-006",
        TranCode: "TC-ART-906"
    },
    {
        Topic: "Configuring Dynamic Interactive Menus for WhatsApp Bots",
        ArticleType: "Technical Guide",
        ArticleFor: "Developers",
        PublishStatus: false, // Replaces "Under Review"
        EntryBy: "Praveen Kumar",
        EntryDt: "2026-06-03",
        id: "ART-007",
        TranCode: "TC-ART-907"
    }
];

interface ArticleTblProps {
    handleToggleArticleMdl: (row: any) => void
}
const ArticleTbl: React.FC<ArticleTblProps> = ({ handleToggleArticleMdl }) => {
    return (
        <>
            <Datatable
                data={articleTableData}
                columns={columns}
                isSearchBar
                pagination
                isNotCardRequired
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

                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleToggleArticleMdl(child.row)}>
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
                            <span>{child.row[child.column.field as keyof any]}</span>
                        }
                    </>
                )}

            </Datatable>
        </>
    )
}

export default ArticleTbl
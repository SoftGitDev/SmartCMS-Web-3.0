// Purpose: Article Table screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';
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

const ArticleTbl = () => {
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
                            <span>{child.row[child.column.field as keyof any]}</span>
                        }
                    </>
                )}

            </Datatable>
        </>
    )
}

export default ArticleTbl
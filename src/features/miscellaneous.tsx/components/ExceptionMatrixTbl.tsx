import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react';
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';


const columns: tableColumnProps[] = [
    {
        field: 'levelNm',
        header: 'Level  Name',
        sorting: true,
    },

    {
        field: 'mobile',
        header: 'Mobile',
        sorting: true,
    },

    {
        field: 'emailID',
        header: 'Email Id',
        sorting: true,
    },

    {
        field: '',
        header: '',
        align: "center",
        sorting: false,
    }
];


export interface LevelContactData {
    levelNm: string;
    mobile: string;
    emailID: string[];
}

const dummyLevelContacts: LevelContactData[] = [
    {
        levelNm: 'Level 1 - Helpdesk Support',
        mobile: '+91 98765 43210',
        emailID: ['support.l1@yourdomain.com', 'helpdesk@yourdomain.com']
    },
    {
        levelNm: 'Level 2 - Senior Engineers',
        mobile: '+91 81234 56789',
        emailID: ['tech.escalations@yourdomain.com']
    },
    {
        levelNm: 'Level 3 - DevOps & Incident Team',
        mobile: '+91 70123 45678',
        emailID: ['devops.alerts@yourdomain.com', 'noc@yourdomain.com', 'oncall@yourdomain.com']
    },
    {
        levelNm: 'Level 4 - Management & CTO Office',
        mobile: '+91 63012 34567',
        emailID: ['cto.critical@yourdomain.com', 'mgmt_alerts@yourdomain.com']
    }
];

interface ExceptionMatrixTblProps {
    handleCloseExcepMatrixMdl: any
}
const ExceptionMatrixTbl: React.FC<ExceptionMatrixTblProps> = ({ handleCloseExcepMatrixMdl }) => {
    return (
        <>
            <Datatable
                data={dummyLevelContacts}
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseExcepMatrixMdl(child.row)}>
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

export default ExceptionMatrixTbl
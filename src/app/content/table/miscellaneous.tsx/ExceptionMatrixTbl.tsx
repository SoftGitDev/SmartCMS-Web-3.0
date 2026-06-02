import React, { JSX } from 'react'
import { tableColumnProps } from '../../../types/typr';
import { Datatable } from '../../../components/ui/DataTable/Datatable';
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';


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

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseExcepMatrixMdl(child.row)} ><Pen size={16} /></Button>

                                {/* <Button variant="edit" title="Ticket auto assign" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseSubCategoryMdl(child.row)} ><GitFork size={16} /></Button> */}

                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle"><Trash size={16} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

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
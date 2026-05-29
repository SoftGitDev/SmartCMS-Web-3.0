
// Purpose: Department Misc table  
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../types/typr';
import { Button } from 'react-bootstrap';
import { Pen, Trash, UserRoundCog } from 'lucide-react';

const columns: tableColumnProps[] = [
    {
        field: 'department',
        header: 'Department',
        sorting: true,
    },

    {
        field: '',
        header: '',
        align: "center",
        sorting: false,
    }
];


interface DepartmentTblProps {
    handleCloseDepartmentMdl: (row: any) => void
}


const DepartmentTbl: React.FC<DepartmentTblProps> = ({ handleCloseDepartmentMdl }) => {
    return (
        <>
            <Datatable
                data={[]}
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
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseDepartmentMdl(child.row)} ><Pen size={16} /></Button>

                                <Button variant="edit" title="Department HOD" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseDepartmentMdl(child.row)} ><UserRoundCog size={16} /></Button>

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

export default DepartmentTbl

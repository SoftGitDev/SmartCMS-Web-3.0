// Purpose: Circular Type table Components
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { tableColumnProps } from '../../../types/typr'
import { Button } from 'react-bootstrap'
import { Trash } from 'lucide-react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'

const columns: tableColumnProps[] = [
    {
        field: 'circularType',
        header: 'Circular Type',
        sorting: true,
    },

    {
        field: '',
        header: '',
        align: "center",
        sorting: false,
    }
];

interface CategoryTypeTblProps {
    handleCloseCategoryTypeMdl: (row: any) => void
}

const CircularTypeTbl: React.FC<CategoryTypeTblProps> = ({ handleCloseCategoryTypeMdl }) => {
    return (
        <div>
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
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseCategoryTypeMdl(child.row)} ><Pen size={16} /></Button>

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
        </div>
    )
}

export default CircularTypeTbl

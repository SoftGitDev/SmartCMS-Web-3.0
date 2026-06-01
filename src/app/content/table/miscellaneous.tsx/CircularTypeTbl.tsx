// Purpose: Circular Type table Components
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { tableColumnProps } from '../../../types/typr'
import { Button } from 'react-bootstrap'
import { Pen, Trash } from 'lucide-react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'

const columns: tableColumnProps[] = [
    {
        field: 'circularType',
        header: 'Circular Type',
        sorting: true,
        width: '120vh'
    },

    {
        field: '',
        header: '',
        align: "center",
        sorting: false,
    }
];


const dummyData = [
    {
        id: 1,
        circularType: 'Internal Memo',

    },
    {
        id: 2,
        circularType: 'Public Notice',

    },
    {
        id: 3,
        circularType: 'Policy Update',

    },
    {
        id: 4,
        circularType: 'Event Invitation',

    },
    {
        id: 5,
        circularType: 'Internal Memo',

    },
    {
        id: 6,
        circularType: 'Compliance Directive',

    },
    {
        id: 7,
        circularType: 'Policy Update',

    },
    {
        id: 8,
        circularType: 'Technical Bulletin',

    },
    {
        id: 9,
        circularType: 'Safety Advisory',

    },
    {
        id: 10,
        circularType: 'Public Notice',

    },
    {
        id: 11,
        circularType: 'Internal Memo',
    },
    {
        id: 12,
        circularType: 'Training Announcement',
    }
];


interface CategoryTypeTblProps {
    handleCloseCategoryTypeMdl: (row: any) => void
}

const CircularTypeTbl: React.FC<CategoryTypeTblProps> = ({ handleCloseCategoryTypeMdl }) => {
    return (
        <div>
            <Datatable
                data={dummyData}
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

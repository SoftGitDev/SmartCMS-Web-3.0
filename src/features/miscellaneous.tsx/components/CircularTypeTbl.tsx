// Purpose: Circular Type table Components
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';

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


                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseCategoryTypeMdl(child.row)}>
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
        </div>
    )
}

export default CircularTypeTbl

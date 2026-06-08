
// Purpose: Department Misc table  
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2, UserRoundCog } from 'lucide-react';
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';

const columns: tableColumnProps[] = [
    {
        field: 'department',
        header: 'Department',
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

// 1. Define the interface
interface DepartmentDataRow {
    department: string;
}

// 2. Populate 12 realistic corporate records
const departmentData: DepartmentDataRow[] = [
    { department: 'Human Resources' },
    { department: 'Information Technology' },
    { department: 'Finance & Accounting' },
    { department: 'Marketing & Communications' },
    { department: 'Sales & Business Development' },
    { department: 'Customer Success' },
    { department: 'Legal & Compliance' },
    { department: 'Product Management' },
    { department: 'Engineering' },
    { department: 'Operations & Logistics' },
    { department: 'Quality Assurance' },
    { department: 'Research & Development' }
];


interface DepartmentTblProps {
    handleCloseDepartmentMdl: (row: any) => void
    handleDepartmentHODMdl: (row: any) => void
}


const DepartmentTbl: React.FC<DepartmentTblProps> = ({ handleCloseDepartmentMdl, handleDepartmentHODMdl }) => {
    return (
        <>
            <Datatable
                data={departmentData}
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseDepartmentMdl(child.row)}>
                                        <Pen size={16} />
                                        <span className='text-sm'>Edit</span>
                                    </Dropdown.Item>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleDepartmentHODMdl(child.row)}>
                                        <UserRoundCog size={16} />
                                        <span className='text-sm'>Department HOD</span>
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

export default DepartmentTbl

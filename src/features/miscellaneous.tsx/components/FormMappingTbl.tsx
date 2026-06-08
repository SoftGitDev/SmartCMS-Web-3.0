// Purpose: Form Mapping Table Components
// Created by: Harish
// Created Date: 01-06-2026


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';

const columns: tableColumnProps[] = [
    {
        field: 'circular',
        header: 'Circular',
        sorting: true,
    },
    {
        field: 'subcircular',
        header: 'Sub-Category',
        sorting: true,
    },
    {
        field: 'subColumns',
        header: 'Sub-Columns',
        sorting: true,
    },
    {
        field: 'createdBy',
        header: 'Created By',
        sorting: true,
    },
    {
        field: 'createdDate',
        header: 'Created Date',
        sorting: true,
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
        circular: "HR Policy 2026",
        subcircular: "Leave Amendments",
        subColumns: "Sick Leave, Casual Leave",
        createdBy: "John Doe",
        createdDate: "2026-01-15",
    },
    {
        circular: "Finance Update",
        subcircular: "Tax Revisions",
        subColumns: "TDS, GST Rates",
        createdBy: "Jane Smith",
        createdDate: "2026-02-20",
    },
    {
        circular: "IT Security",
        subcircular: "Password Guidelines",
        subColumns: "MFA, Expiry Policy",
        createdBy: "Alex Jones",
        createdDate: "2026-05-12",
    }
];


interface FormMappingTblProps {
    handleCloseFormMappingMdl: (row: any) => void
}

const FormMappingTbl: React.FC<FormMappingTblProps> = ({ handleCloseFormMappingMdl }) => {
    return (
        <>
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseFormMappingMdl(child.row)}>
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

export default FormMappingTbl
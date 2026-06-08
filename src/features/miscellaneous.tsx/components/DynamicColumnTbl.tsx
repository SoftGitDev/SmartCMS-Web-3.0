// Purpose: DynamicColumn Misc Module Table   
// Created by: Harish
// Created Date: 29-05-2026


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';


const columns: tableColumnProps[] = [
    {
        field: 'displayNm',
        header: 'Display Name',
        sorting: true,
    },

    {
        field: 'type',
        header: 'Type',
        sorting: true,
    },

    {
        field: 'fieldtype',
        header: 'Field Type',
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
        field: 'status',
        header: 'Status',
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
        displayNm: "First Name",
        type: "System Field",
        fieldtype: "Text",
        createdBy: "John Doe",
        createdDate: "2026-01-15",
        status: true,
    },
    {
        displayNm: "Age",
        type: "Custom Field",
        fieldtype: "Number",
        createdBy: "Jane Smith",
        createdDate: "2026-02-10",
        status: true,
    },
    {
        displayNm: "Email Address",
        type: "System Field",
        fieldtype: "Email",
        createdBy: "John Doe",
        createdDate: "2026-01-15",
        status: true,
    },
    {
        displayNm: "Profile Picture",
        type: "Custom Field",
        fieldtype: "File Upload",
        createdBy: "Alex Jones",
        createdDate: "2026-03-22",
        status: false,
    },
    {
        displayNm: "Date of Birth",
        type: "System Field",
        fieldtype: "Date",
        createdBy: "Jane Smith",
        createdDate: "2026-02-11",
        status: true,
    },
    {
        displayNm: "Country",
        type: "Custom Field",
        fieldtype: "Dropdown",
        createdBy: "Sarah Lee",
        createdDate: "2026-04-05",
        status: false,
    },
    {
        displayNm: "Phone Number",
        type: "System Field",
        fieldtype: "Phone",
        createdBy: "John Doe",
        createdDate: "2026-01-18",
        status: true,
    },
    {
        displayNm: "Postal Code",
        type: "Custom Field",
        fieldtype: "Text",
        createdBy: "Alex Jones",
        createdDate: "2026-03-25",
        status: true,
    },
    {
        displayNm: "Subscribe Newsletter",
        type: "Custom Field",
        fieldtype: "Checkbox",
        createdBy: "Sarah Lee",
        createdDate: "2026-04-06",
        status: false,
    },
    {
        displayNm: "Bio Description",
        type: "Custom Field",
        fieldtype: "TextArea",
        createdBy: "Jane Smith",
        createdDate: "2026-02-15",
        status: true,
    },
    {
        displayNm: "Terms Agreement",
        type: "System Field",
        fieldtype: "Checkbox",
        createdBy: "John Doe",
        createdDate: "2026-01-20",
        status: true,
    },
    {
        displayNm: "Website URL",
        type: "Custom Field",
        fieldtype: "URL",
        createdBy: "Alex Jones",
        createdDate: "2026-03-30",
        status: false,
    },
    {
        displayNm: "Annual Income",
        type: "Custom Field",
        fieldtype: "Currency",
        createdBy: "Jane Smith",
        createdDate: "2026-05-02",
        status: true,
    },
    {
        displayNm: "Department",
        type: "System Field",
        fieldtype: "Multi-Select",
        createdBy: "John Doe",
        createdDate: "2026-01-22",
        status: true,
    },
    {
        displayNm: "Joining Date",
        type: "System Field",
        fieldtype: "Date",
        createdBy: "Sarah Lee",
        createdDate: "2026-04-10",
        status: false,
    }
];


interface DynamicColumnTblProps {
    handleditData: any
}

const DynamicColumnTbl: React.FC<DynamicColumnTblProps> = ({ handleditData }) => {
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

                        {child.column.field === 'status' &&
                            <ToggleSwitch
                                checked={child.row.status}
                                onChange={() => console.log('')}
                            />
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleditData(child.row)}>
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
                            child.column.field !== "status" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </div>
    )
}

export default DynamicColumnTbl

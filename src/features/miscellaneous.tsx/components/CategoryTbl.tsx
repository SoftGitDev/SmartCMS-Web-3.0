import React, { JSX } from 'react'
import { Dropdown } from 'react-bootstrap'
import { EllipsisVertical, GitFork, Pen, Settings2Icon, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';


const columns: tableColumnProps[] = [
    {
        field: 'category',
        header: 'Category',
        sorting: true,
    },
    {
        field: 'categoryFor',
        header: 'Category For',
        sorting: true,
    },
    {
        field: 'categoryType',
        header: 'Category Type',
        sorting: true,
    },
    {
        field: 'customerType',
        header: 'Customer Type',
        sorting: true,
    },
    {
        field: 'categoryAutoAssign',
        header: 'Category Auto Assign',
        sorting: true,
    },
    {
        field: 'status',
        header: 'Status',
        sorting: true,
        align: "left",
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
        category: 'Technical Support',
        categoryFor: 'Internal',
        categoryType: 'Service',
        customerType: 'Employee',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Network Issue',
        categoryFor: 'Internal',
        categoryType: 'Incident',
        customerType: 'Employee',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Software Installation',
        categoryFor: 'Internal',
        categoryType: 'Request',
        customerType: 'Employee',
        categoryAutoAssign: 'No',
        status: true,
    },
    {
        category: 'Customer Complaint',
        categoryFor: 'External',
        categoryType: 'Complaint',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: false,
    },
    {
        category: 'Account Verification',
        categoryFor: 'External',
        categoryType: 'Verification',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Payment Failure',
        categoryFor: 'External',
        categoryType: 'Incident',
        customerType: 'Merchant',
        categoryAutoAssign: 'No',
        status: true,
    },
    {
        category: 'Branch Support',
        categoryFor: 'Internal',
        categoryType: 'Support',
        customerType: 'Branch',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Document Approval',
        categoryFor: 'Internal',
        categoryType: 'Approval',
        customerType: 'Management',
        categoryAutoAssign: 'No',
        status: false,
    },
    {
        category: 'Mobile Banking',
        categoryFor: 'External',
        categoryType: 'Service',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Loan Inquiry',
        categoryFor: 'External',
        categoryType: 'Inquiry',
        customerType: 'Customer',
        categoryAutoAssign: 'No',
        status: true,
    },
];

interface CategoryTblProps {
    handleCloseCategoryMdl: any
    handleCategoryAssigneMdl: (row: any) => void
    handleMapSerivesMdl: (row: any) => void
}
const CategoryTbl: React.FC<CategoryTblProps> = ({ handleCloseCategoryMdl, handleCategoryAssigneMdl, handleMapSerivesMdl }) => {
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
                                checked={child.row.status} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                    throw new Error('Function not implemented.')
                                }} />
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseCategoryMdl(child.row)}>
                                        <Pen size={16} />
                                        <span className='text-sm'>Edit</span>
                                    </Dropdown.Item>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCategoryAssigneMdl(child.row)}>
                                        <GitFork size={16} />
                                        <span className='text-sm'>Ticket auto assign</span>
                                    </Dropdown.Item>

                                    {/* Service */}
                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleMapSerivesMdl(child.row)}>
                                        <Settings2Icon size={16} />
                                        <span className='text-sm'>Map Service</span>
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

export default CategoryTbl

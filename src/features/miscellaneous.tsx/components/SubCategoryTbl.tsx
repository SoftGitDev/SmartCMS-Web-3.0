
import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { EllipsisVertical, GitFork, Pen, Settings2Icon, Trash, Trash2 } from 'lucide-react'
import { tableColumnProps } from '../../../services/type';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';


const columns: tableColumnProps[] = [
    {
        field: 'category',
        header: 'Category',
        sorting: true,
    },
    {
        field: 'subcategory',
        header: 'Sub Category',
        sorting: true,
    },
    {
        field: 'categoryFor',
        header: 'Sub Category For',
        sorting: true,
    },
    {
        field: 'categoryType',
        header: 'Sub Category Type',
        sorting: true,
    },
    {
        field: 'customerType',
        header: 'Sub Customer Type',
        sorting: true,
    },
    {
        field: 'categoryAutoAssign',
        header: 'Sub Category Auto Assign',
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
        category: 'Technical Support',
        subcategory: 'ATM Service Related',
        categoryFor: 'Internal',
        categoryType: 'Service',
        customerType: 'Employee',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Network Issue',
        subcategory: 'LAN Connectivity',
        categoryFor: 'Internal',
        categoryType: 'Incident',
        customerType: 'Employee',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Software Installation',
        subcategory: 'Application Setup',
        categoryFor: 'Internal',
        categoryType: 'Request',
        customerType: 'Employee',
        categoryAutoAssign: 'No',
        status: true,
    },
    {
        category: 'Customer Complaint',
        subcategory: 'Service Quality',
        categoryFor: 'External',
        categoryType: 'Complaint',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: false,
    },
    {
        category: 'Account Verification',
        subcategory: 'KYC Verification',
        categoryFor: 'External',
        categoryType: 'Verification',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Payment Failure',
        subcategory: 'Transaction Declined',
        categoryFor: 'External',
        categoryType: 'Incident',
        customerType: 'Merchant',
        categoryAutoAssign: 'No',
        status: true,
    },
    {
        category: 'Branch Support',
        subcategory: 'Branch Operations',
        categoryFor: 'Internal',
        categoryType: 'Support',
        customerType: 'Branch',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Document Approval',
        subcategory: 'Policy Approval',
        categoryFor: 'Internal',
        categoryType: 'Approval',
        customerType: 'Management',
        categoryAutoAssign: 'No',
        status: false,
    },
    {
        category: 'Mobile Banking',
        subcategory: 'App Access Issue',
        categoryFor: 'External',
        categoryType: 'Service',
        customerType: 'Customer',
        categoryAutoAssign: 'Yes',
        status: true,
    },
    {
        category: 'Loan Inquiry',
        subcategory: 'Personal Loan Query',
        categoryFor: 'External',
        categoryType: 'Inquiry',
        customerType: 'Customer',
        categoryAutoAssign: 'No',
        status: true,
    },
];

interface SubCategoryTblProps {
    handleCloseSubCategoryMdl: any
    handleMapSerivesMdl: (row: any) => void
    handleSubCategoryAssigneMdl: (row: any) => void
}

const SubCategoryTbl: React.FC<SubCategoryTblProps> = ({ handleCloseSubCategoryMdl, handleMapSerivesMdl, handleSubCategoryAssigneMdl }) => {
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

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleCloseSubCategoryMdl(child.row)}>
                                        <Pen size={16} />
                                        <span className='text-sm'>Edit</span>
                                    </Dropdown.Item>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleSubCategoryAssigneMdl(child.row)}>
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
                            child.column.field !== "modifyBy" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </div>
    )
}

export default SubCategoryTbl

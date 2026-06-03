import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { Button } from 'react-bootstrap'
import { GitFork, Pen, Trash } from 'lucide-react'
import { tableColumnProps } from '../../../types/typr'
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch'


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
}
const CategoryTbl: React.FC<CategoryTblProps> = ({ handleCloseCategoryMdl }) => {
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
                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseCategoryMdl(child.row)} ><Pen size={16} /></Button>

                                {/* <Button variant="edit" title="Ticket auto assign" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseCategoryMdl(child.row)} ><GitFork size={16} /></Button> */}

                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle"><Trash size={16} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

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

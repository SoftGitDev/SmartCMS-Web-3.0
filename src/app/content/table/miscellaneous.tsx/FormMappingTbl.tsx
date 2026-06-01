// Purpose: Form Mapping Table Components
// Created by: Harish
// Created Date: 01-06-2026


import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { Button } from 'react-bootstrap'
import { Pen, Trash } from 'lucide-react'
import { tableColumnProps } from '../../../types/typr'

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


                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleCloseFormMappingMdl(child.row)} ><Pen size={16} /></Button>

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

export default FormMappingTbl
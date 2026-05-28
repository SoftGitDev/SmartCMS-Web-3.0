// Purpose: Branch Table Showing Details
// Created by: Harish
// Created Date: 25-05-2026

// Change History:


import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { branchPropsType, tableColumnProps } from '../../../types/typr'
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch';
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';

interface BranchTblProps {
    data: branchPropsType[],
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleBranchMdl: (row: branchPropsType) => void
}

const columns: tableColumnProps[] = [
    {
        field: 'branchCode',
        header: 'Branch Code',
        sorting: true,
        width: "180px",
    },
    {
        field: 'branchName',
        header: 'Branch Name',
        sorting: true,
    },
    {
        field: 'mobileNo',
        header: 'Contact Details',
        sorting: true,
    },
    {
        field: 'address',
        header: 'Address',
        sorting: true,
    },
    {
        field: 'status',
        header: 'Status',
        sorting: false,
        align: "center",
    },
    {
        field: '',
        header: '',
        sorting: true,
        align: "center",
    }
];

const BranchTbl: React.FC<BranchTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleBranchMdl }) => {
    return (
        <>
            <Datatable
                data={data}
                columns={columns}
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
                tableNm="Branch"
                isSearchBar
                isLoader={isLoader}
                pagination
                isNotHoverable
                setPageSize={setPageSize}
                setPageNo={setPageNo}
                totalRecord={totalRecord}
                setSearchContain={setSearchContain}
            >
                {(child: { row: branchPropsType, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === 'status' &&
                            <div className='d-flex justify-content-center'>
                                <ToggleSwitch checked={child.row.status} onChange={() => console.log('')} />
                            </div>
                        }

                        {child.column.field === 'mobileNo' &&
                            <>
                                <div><span className="text-primary">&#9742;</span> {" "}{child.row.mobileNo}</div>
                                {child.row.emailId !== null && <div className='text-sm text-slate-500'> <span className="text-primary">&#9993; </span> {" "}{child.row.emailId}</div>}
                            </>
                        }

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleBranchMdl(child.row)} ><Pen size={14} /></Button>
                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" ><Trash size={14} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }
                        {
                            child.column.field !== "status" &&
                            child.column.field !== "mobileNo" &&
                            child.row[child.column.field as keyof branchPropsType]}
                    </>
                )}

            </Datatable>
        </>
    )
}

export default BranchTbl

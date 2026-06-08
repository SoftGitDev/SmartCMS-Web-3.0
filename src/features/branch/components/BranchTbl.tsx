// Purpose: Branch Table Showing Details
// Created by: Harish
// Created Date: 25-05-2026

// Change History:


import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Trash, Trash2 } from 'lucide-react';
import { branchPropsType } from '../types/Branch';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import { tableColumnProps } from '../../../services/type';

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


                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleBranchMdl(child.row)}>
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
                            child.column.field !== "mobileNo" &&
                            child.row[child.column.field as keyof branchPropsType]}
                    </>
                )}

            </Datatable>
        </>
    )
}

export default BranchTbl

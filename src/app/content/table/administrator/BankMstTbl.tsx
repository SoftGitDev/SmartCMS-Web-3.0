// Purpose: Bank Master Table module 
// Created by: Harish 
// Created Date: 25-05-2026


import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { branchPropsType, tableColumnProps } from '../../../types/typr'
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch';
import { Button } from 'react-bootstrap';
import { Pen, Trash } from 'lucide-react';

interface BankMstTblProps {
    data: any[],
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleBankMdl: (row: any) => void
}

const columns: tableColumnProps[] = [
    {
        field: 'bankName',
        header: 'Organization ',
        sorting: true,
        width: "280px",
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

const BankMstTbl: React.FC<BankMstTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleBankMdl }) => {
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
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'bankName' &&
                            <>
                                <div className="d-flex align-items-center gap-2">
                                    <div className='blank-logo text-lg'>
                                        {child.row.bankName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div>{child.row.bankName}</div>
                                        <div className='text-sm text-slate-500'> <span className='text-primary'>Code : </span>{child.row.bankCode}</div>
                                    </div>
                                </div>
                            </>
                        }

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
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleBankMdl(child.row)} ><Pen size={14} /></Button>
                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" ><Trash size={14} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }
                        {
                            child.column.field !== "bankName" &&
                            child.column.field !== "mobileNo" &&
                            child.column.field !== "status" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}

            </Datatable>
        </>
    )
}
export default BankMstTbl
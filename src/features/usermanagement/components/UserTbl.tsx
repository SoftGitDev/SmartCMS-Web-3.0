// // Purpose: User Table Compoenets 
// // Created by: Harish 
// // Created Date: 25-05-2026

import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'lucide-react';
import { userPropsType } from '../types/User';
import StatusBadge from '../../../common/components/ui/customBadge/StatusBadge';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import { tableColumnProps } from '../../../services/type';


interface UserTblProps {
    data: userPropsType[],
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleUserMdl: (row?: userPropsType) => void
}

const columns: tableColumnProps[] = [
    {
        field: 'username',
        header: 'Username',
        sorting: true,
        width: "180px",
    },
    {
        field: 'personName',
        header: 'Person Name',
        sorting: true,
    },
    {
        field: 'mobileNo',
        header: 'Contact Details',
        sorting: true,
    },
    {
        field: 'lastUpdate',
        header: 'Last Update',
        sorting: true,
    },
    {
        field: 'status',
        header: 'Status',
        sorting: false,
        align: "center",
    },
    {
        field: 'unlock',
        header: 'Unlock',
        sorting: false,
        align: "center",
    },
    {
        field: '',
        header: '',
        sorting: false,
        align: "center",
    }
];

const UserTbl: React.FC<UserTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleUserMdl }) => {
    return (
        <>
            <Datatable
                data={data}
                columns={columns}
                style={{ height: "calc(-385px + 100vh)", overflow: "auto", }}
                tableNm="Branch"
                isSearchBar
                isNotCardRequired
                isLoader={isLoader}
                pagination
                isNotHoverable
                setPageSize={setPageSize}
                setPageNo={setPageNo}
                totalRecord={totalRecord}
                tableBtn={<div className='ms-auto'>
                    <Button onClick={() => handleUserMdl()}>
                        <Plus /> Add New User
                    </Button>
                </div>}
                setSearchContain={setSearchContain}
            >
                {(child: { row: userPropsType, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'username' &&
                            <>
                                <div className="d-flex align-items-center gap-2">
                                    <div className='blank-logo text-lg'>
                                        {child.row.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div>{child.row.username}</div>
                                        <div className='text-sm text-slate-500'> <span className='text-primary'>Role : </span>{child.row.roleNm}</div>
                                    </div>
                                </div>
                            </>
                        }


                        {child.column.field === 'mobileNo' &&
                            <>
                                <div><span className="text-primary">&#9742;</span> {" "}{child.row.mobileNo}</div>
                                {child.row.emailId !== null && <div className='text-sm text-slate-500'> <span className="text-primary">&#9993; </span> {" "}{child.row.emailId}</div>}
                            </>
                        }

                        {child.column.field === 'status' &&
                            <div className='d-flex justify-content-center'>
                                <ToggleSwitch
                                    checked={child.row.status}
                                    onChange={() => console.log('')}
                                />
                            </div>
                        }

                        {child.column.field === 'unlock' &&

                            <div className='d-flex justify-content-center'>
                                {child.row.unlock ?
                                    <ToggleSwitch
                                        checked={child.row.unlock}
                                        onChange={() => console.log('')}
                                    />
                                    :
                                    <StatusBadge label={'Unloack'} variant='success' />
                                }
                            </div>
                        }

                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleUserMdl(child.row)} ><Pen size={14} /></Button>
                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" ><Trash size={14} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

                        {
                            child.column.field !== "status" &&
                            child.column.field !== "mobileNo" &&
                            child.column.field !== "username" &&
                            child.row[child.column.field as keyof userPropsType]}
                    </>
                )}

            </Datatable>
        </>
    )
}

export default UserTbl

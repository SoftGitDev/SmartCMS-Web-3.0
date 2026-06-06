// // Purpose: User Role Table Compoenets 
// // Created by: Harish 
// // Created Date: 25-05-2026

import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'lucide-react';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import { tableColumnProps } from '../../../services/type';

interface UserRoleTblProps {
    data: any[],
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleUserRoleMdl: (row?: any) => void
}

const columns: tableColumnProps[] = [
    {
        field: 'roleNm',
        header: 'Role Name',
        sorting: true,
        width: "380px",
    },
    {
        field: 'roleType',
        header: 'Role Type',
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
        sorting: false,
        align: "left",
        width: 180,
    }
];

const UserRoleTbl: React.FC<UserRoleTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleUserRoleMdl }) => {
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
                    <Button onClick={() => handleUserRoleMdl()}>
                        <Plus /> Add New User
                    </Button>
                </div>}
                setSearchContain={setSearchContain}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'roleNm' &&
                            <>
                                <div className="d-flex align-items-center gap-2">
                                    <div className='blank-logo text-lg'>
                                        {child.row.roleNm.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div>{child.row.roleNm}</div>
                                        {/* <div className='text-sm text-slate-500'> <span className='text-primary'>Role : </span>{child.row.roleNm}</div> */}
                                    </div>
                                </div>
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



                        {child.column.field === '' && <div>
                            <div className='d-flex justify-content-center gap-2'>
                                {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                                <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => handleUserRoleMdl(child.row)} ><Pen size={14} /></Button>
                                {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                                <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" ><Trash size={14} /></Button>
                                {/* } */}
                            </div>
                        </div>
                        }

                        {
                            child.column.field !== "status" &&
                            child.column.field !== "roleNm" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}

            </Datatable>
        </>
    )
}

export default UserRoleTbl

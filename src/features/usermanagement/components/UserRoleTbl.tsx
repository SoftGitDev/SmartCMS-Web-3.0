// // Purpose: User Role Table Compoenets 
// // Created by: Harish 
// // Created Date: 25-05-2026

import React, { JSX } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { EllipsisVertical, Pen, Plus, Trash, Trash2 } from 'lucide-react';
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
        align: "right",
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


                        {child.column.field === '' && (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-1 border-0 text-muted shadow-none no-caret custom-action-btn"
                                >
                                    <EllipsisVertical size={20} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount popperConfig={{ strategy: 'fixed' }} className="shadow-lg border-0 py-2" style={{ minWidth: '160px', zIndex: 9999 }}>

                                    <Dropdown.Item className="d-flex align-items-center gap-2 py-2 px-3" onClick={() => handleUserRoleMdl(child.row)}>
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
                            child.column.field !== "roleNm" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}

            </Datatable>
        </>
    )
}

export default UserRoleTbl

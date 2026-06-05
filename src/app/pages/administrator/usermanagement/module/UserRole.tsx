// Purpose: User role module
// Created by: Harish 
// Created Date: 25-05-2026


import React, { lazy, Suspense, useEffect, useState } from 'react'
import LoaderUI from '../../../../components/loader/Loader';

// Lazy loading the Table and Modal components
const UserRoleTbl = lazy(() => import('../../../../content/table/administrator/UserRoleTbl'));
const UserRoleMdl = lazy(() => import('../../../../content/modal/administrator/userManagement/UserRoleMdl'));

const UserRole = () => {

    const [isUserRoleMdl, setIsUserRoleMdl] = useState<boolean>(false)
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [searchContain, setSearchContain] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [editTableData, setEditTableData] = useState<any>()

    // Handle User Mdl 
    const handleUserRoleMdl = (data?: any) => {
        setIsUserRoleMdl(!isUserRoleMdl)
        setEditTableData(data)
    }

    // search and auto neviget in page 1
    useEffect(() => {
        setPageNo(1);
        setPageSize(10);
    }, [searchContain])

    const dummyData = [
        {
            roleNm: 'Super Admin',
            roleType: 'System',
            status: true,
        },
        {
            roleNm: 'Branch Manager',
            roleType: 'Admin',
            status: true,
        },
        {
            roleNm: 'KYC Officer',
            roleType: 'Operations',
            status: false,
        },
        {
            roleNm: 'Support Executive',
            roleType: 'Support',
            status: true,
        },
        {
            roleNm: 'Audit User',
            roleType: 'Audit',
            status: false,
        },
    ];

    return (
        <>
            {/* table  */}
            <Suspense fallback={<LoaderUI />}>
                <UserRoleTbl
                    data={dummyData}
                    isLoader={isLoader}
                    setPageSize={setPageSize}
                    setPageNo={setPageNo}
                    totalRecord={totalRecord}
                    setSearchContain={setSearchContain}
                    handleUserRoleMdl={handleUserRoleMdl}
                />
            </Suspense>

            {/* Modal add edit user role */}
            <Suspense fallback={<LoaderUI />}>
                <UserRoleMdl
                    show={isUserRoleMdl}
                    handleClose={handleUserRoleMdl}
                    editedData={editTableData}
                />
            </Suspense>
        </>
    )
}

export default UserRole

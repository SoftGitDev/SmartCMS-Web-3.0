

// Purpose: User module 
// Created by: Harish 
// Created Date: 25-05-2026


import React, { lazy, Suspense, useEffect, useState } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import { userPropsType } from '../types/User';
import UserTbl from '../components/UserTbl';
import UserMdl from '../components/UserMdl';



const dummyData: userPropsType[] = [
    {
        username: 'admin001',
        personName: 'Harish Sharma',
        roleNm: 'Admin',
        mobileNo: '9876543210',
        emailId: 'harish.sharma@company.com',
        lastUpdate: '25-05-2026 11:41:59  ',
        status: true,
        unlock: true,
    },
    {
        username: 'john.d',
        personName: 'John Doe',
        mobileNo: '9123456780',
        roleNm: 'IT',

        emailId: 'john.doe@company.com',
        lastUpdate: '25-05-2026 11:41:59',
        status: true,
        unlock: true,
    },
    {
        username: 'priya.s',
        personName: 'Priya Singh',
        mobileNo: '9988776655',
        roleNm: 'Admin',

        emailId: 'priya.singh@company.com',
        lastUpdate: '25-05-2026 11:41:59',
        status: false,
        unlock: false,
    },
    {
        username: 'rahul.k',
        personName: 'Rahul Kumar',
        mobileNo: '9012345678',
        roleNm: 'Superadmin',

        emailId: 'rahul.kumar@company.com',
        lastUpdate: '25-05-2026 11:41:59',
        status: true,
        unlock: true,
    },
    {
        username: 'neha.p',
        personName: 'Neha Patel',
        mobileNo: '9090909090',
        roleNm: 'User',
        emailId: 'neha.patel@company.com',
        lastUpdate: '25-05-2026 11:41:59',
        status: true,
        unlock: true,
    },
];

const User = () => {
    const [isUserMdl, setIsUserMdl] = useState<boolean>(false)

    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [searchContain, setSearchContain] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [editTableData, setEditTableData] = useState<any>()

    // Handle User Mdl 
    const handleUserMdl = (data?: any) => {
        setIsUserMdl(!isUserMdl)
        setEditTableData(data)
    }

    // search and auto neviget in page 1
    useEffect(() => {
        setPageNo(1);
        setPageSize(10);
    }, [searchContain])


    return (
        <>
            {/* Table */}
            <Suspense fallback={<LoaderUI />}>
                <UserTbl
                    data={dummyData}
                    isLoader={isLoader}
                    setPageSize={setPageSize}
                    setPageNo={setPageNo}
                    totalRecord={totalRecord}
                    setSearchContain={setSearchContain}
                    handleUserMdl={handleUserMdl}
                />
            </Suspense>

            {/* Modal */}
            
            {isUserMdl &&
                <Suspense fallback={<LoaderUI />}>
                    <UserMdl
                        show={isUserMdl}
                        handleClose={handleUserMdl}
                        editedData={editTableData}
                    />
                </Suspense>
            }
        </>
    )
}

export default User

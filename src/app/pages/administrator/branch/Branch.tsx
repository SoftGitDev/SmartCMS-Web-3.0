// Purpose: Branch Config
// Created by: Harish
// Created Date: 25-05-2026

// Change History:


import React, { Suspense, useEffect, useState } from 'react'
import BranchTbl from '../../../content/table/administrator/BranchTbl'
import LoaderUI from '../../../components/loader/Loader';
import PageHeaeder from '../../../components/common/PageHeaeder';
import { GitBranchIcon, Plus, Upload } from 'lucide-react';
import { Button } from 'react-bootstrap';
import BranchMdl from '../../../content/modal/administrator/branch/BranchMdl';
import { branchPropsType } from '../../../types/typr';
import UploadMdl from '../../../content/modal/administrator/branch/UploadMdl';

const Branch = () => {
    const [isBranchMdl, setIsbranchMdl] = useState(false)
    const [isUploadBranchMdl, setIsUploadbranchMdl] = useState(false)
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [searchContain, setSearchContain] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [editTableData, setEditTableData] = useState<branchPropsType>()

    // Handle Branch Add edit mdl 
    const handleBranchMdl = (data?: branchPropsType) => {
        setIsbranchMdl(!isBranchMdl)
        setEditTableData(data)
    }

    // Handle Branch Add edit mdl 
    const handleUploadBranchMdl = () => {
        setIsUploadbranchMdl(!isUploadBranchMdl)
    }

    const dummyData: branchPropsType[] = [
        {
            branchCode: 'BR001',
            branchName: 'Jodhpur Main Branch',
            branchType: 'Head Office',
            mobileNo: '9876543210',
            address: 'Ratanada, Jodhpur, Rajasthan',
            emailId: 'admin@123gmail.com',
            status: true,
        },
        {
            branchCode: 'BR002',
            branchName: 'Jaipur Branch',
            branchType: 'Regional Office',
            mobileNo: '9123456780',
            address: 'Vaishali Nagar, Jaipur, Rajasthan',
            emailId: 'admin@123gmail.com',
            status: false,
        },
        {
            branchCode: 'BR003',
            branchName: 'Udaipur Branch',
            branchType: 'Service Branch',
            mobileNo: '9988776655',
            address: 'Fatehpura, Udaipur, Rajasthan',
            emailId: 'admin@123gmail.com',
            status: true,
        },
        {
            branchCode: 'BR004',
            branchName: 'Delhi Branch',
            branchType: 'Corporate Branch',
            mobileNo: '9012345678',
            address: 'Connaught Place, New Delhi',
            emailId: 'admin@123gmail.com',
            status: true,
        },
        {
            branchCode: 'BR005',
            branchName: 'Mumbai Branch',
            branchType: 'Retail Branch',
            mobileNo: '9090909090',
            address: 'Andheri East, Mumbai, Maharashtra',
            emailId: 'admin@123gmail.com',
            status: true,
        },
    ];

    // search and auto neviget in page 1
    useEffect(() => {
        setPageNo(1);
        setPageSize(10);
    }, [searchContain])

    
    return (
        <>
            {/* Header */}
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={GitBranchIcon}
                    title={'Branch Configuration'}
                    description={'Manage branch setup, operational details, contact information, and organizational branch hierarchy.'}
                    button={
                        <div className='d-flex ms-auto gap-3'>
                            <Button variant='success' size='sm' className="ms-auto" onClick={() => handleUploadBranchMdl()} >
                                <Upload size={16} className="me-2" />
                                Upload Branches
                            </Button>
                            <Button variant='primary' size='sm' onClick={() => handleBranchMdl()} >
                                <Plus size={16} className="me-2" />
                                New Branch
                            </Button>
                        </div>
                    }
                />
            </Suspense>

            <div className='p-3'>
                {/* Table  */}
                <Suspense fallback={<LoaderUI />}>
                    <BranchTbl
                        data={dummyData}
                        isLoader={isLoader}
                        setPageSize={setPageSize}
                        setPageNo={setPageNo}
                        totalRecord={totalRecord}
                        setSearchContain={setSearchContain}
                        handleBranchMdl={handleBranchMdl}
                    />
                </Suspense>

                {/* Barnch Add edit Modal */}
                {isBranchMdl &&
                    <BranchMdl
                        show={isBranchMdl}
                        handleClose={handleBranchMdl}
                        editedData={editTableData}
                    />
                }

                {isUploadBranchMdl &&
                    <UploadMdl
                        show={isUploadBranchMdl}
                        handleClose={handleUploadBranchMdl}
                    />
                }

            </div>
        </>
    )
}

export default Branch

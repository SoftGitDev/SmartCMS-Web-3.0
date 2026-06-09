/************************************************************
// Component     : Create Customers
// Purpose       : In this we Create a new Customers organization.
// Created by    : Harish
// Created Date  : 09-06-2026

************************************************************/

import React, { Suspense, useState } from 'react'
import PageHeaeder from '../../../common/components/common/PageHeaeder'
import { CircleCheck, CircleXIcon, ClockFadingIcon, LucideUsers } from 'lucide-react'
import { Card, CardBody, Tab, Tabs } from 'react-bootstrap';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import CustomerTbl from '../components/CustomerTbl';
import CustomerMdl from '../components/CustomerMdl';

const dummyData = [
    {
        "UserName": "STSHarish",
        "firstNm": "Harish",
        "lastNm": "Kumar",
        "MobileNo": "+91-98765-43210",
        "EmailId": "harish.kumar@example.in",
        "LastActivityDate": "2026-06-09T09:15:00Z",
        "status": true,
        "AuthRejectReason": ""
    },
    {
        "UserName": "Prateek01",
        "firstNm": "Prateek",
        "lastNm": "Sharma",
        "MobileNo": "+91-99887-76655",
        "EmailId": "prateek.sharma@example.com",
        "LastActivityDate": "2026-06-08T14:32:00Z",
        "status": true,
        "AuthRejectReason": ""
    },
    {
        "UserName": "STSAmit",
        "firstNm": "Amit",
        "lastNm": "Verma",
        "MobileNo": "+91-91234-56789",
        "EmailId": "amit.verma@example.in",
        "LastActivityDate": "2026-06-07T11:24:00Z",
        "status": false,
        "AuthRejectReason": "Invalid identity proof document submitted"
    },
    {
        "UserName": "Rohan02",
        "firstNm": "Rohan",
        "lastNm": "Gupta",
        "MobileNo": "+91-88776-65544",
        "EmailId": "rohan.gupta@example.com",
        "LastActivityDate": "2026-06-01T16:45:00Z",
        "status": true,
        "AuthRejectReason": ""
    },
    {
        "UserName": "STSNeha",
        "firstNm": "Neha",
        "lastNm": "Singh",
        "MobileNo": "+91-77665-54433",
        "EmailId": "neha.singh@example.in",
        "LastActivityDate": "2026-06-07T08:00:00Z",
        "status": false,
        "AuthRejectReason": ""
    },
    {
        "UserName": "Pooja03",
        "firstNm": "Pooja",
        "lastNm": "Patel",
        "MobileNo": "+91-66554-43322",
        "EmailId": "pooja.patel@example.com",
        "LastActivityDate": "2026-04-12T10:15:00Z",
        "status": false,
        "AuthRejectReason": "Signature mismatch on authorization form"
    },
    {
        "UserName": "STSRahul",
        "firstNm": "Rahul",
        "lastNm": "Mishra",
        "MobileNo": "+91-55443-32211",
        "EmailId": "rahul.mishra@example.in",
        "LastActivityDate": "2026-06-09T10:30:00Z",
        "status": true,
        "AuthRejectReason": ""
    },
    {
        "UserName": "Anjali04",
        "firstNm": "Anjali",
        "lastNm": "Joshi",
        "MobileNo": "+91-44332-21100",
        "EmailId": "anjali.joshi@example.com",
        "LastActivityDate": "2026-06-05T13:12:00Z",
        "status": true,
        "AuthRejectReason": ""
    },
    {
        "UserName": "STSSunil",
        "firstNm": "Sunil",
        "lastNm": "Reddy",
        "MobileNo": "+91-33221-10099",
        "EmailId": "sunil.reddy@example.in",
        "LastActivityDate": "2026-03-30T06:50:00Z",
        "status": false,
        "AuthRejectReason": "Corporate email domain not whitelisted"
    },
    {
        "UserName": "Deepak05",
        "firstNm": "Deepak",
        "lastNm": "Choudhary",
        "MobileNo": "+91-22110-09988",
        "EmailId": "deepak.c@example.com",
        "LastActivityDate": "2026-06-08T18:22:00Z",
        "status": true,
        "AuthRejectReason": ""
    }
];


const Customers = () => {
    const [key, setKey] = useState<string>('approved');
    const [isCustomersEditMdl, setIsCustomersEditMdl] = useState<boolean>(false)
    const [editTableData, setEditTableData] = useState<any>()

    const handleEditCustomerDtl = (data?: any) => {
        setEditTableData(data)
        setIsCustomersEditMdl(!isCustomersEditMdl)
    }


    return (
        <>
            {/* Header */}
            <Suspense>
                <PageHeaeder
                    Icon={LucideUsers}
                    title="Customer Management"
                    description="View customer details, edit customer information, review customer requests, and approve or reject customer records."
                />
            </Suspense>

            {/* Customer Approval Tabs */}
            <Tabs
                defaultActiveKey="approved"
                onSelect={(k) => setKey(k || 'approved')}
                id="customer-approval-tabs"
                className="custom-tab-bar w-100 bg-white"
            >
                {/* Approved Customers */}
                <Tab
                    eventKey="approved"
                    title={
                        <>
                            <CircleCheck size={18} className="me-2" />
                            Approved Customers
                        </>
                    }
                >
                    <div className="p-3">
                        <Card>
                            <CardBody>
                                <Suspense fallback={<LoaderUI />}>
                                    <CustomerTbl
                                        data={dummyData}
                                        flag="A"
                                        handleEditCustomerDtl={handleEditCustomerDtl}

                                    />
                                </Suspense>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>

                {/* Pending Approval */}
                <Tab
                    eventKey="pending"
                    title={
                        <>
                            <ClockFadingIcon size={18} className="me-2" />
                            Approval Pending
                        </>
                    }
                >
                    <div className="p-3">
                        <Card>
                            <CardBody>
                                <Suspense fallback={<LoaderUI />}>
                                    <CustomerTbl
                                        data={dummyData}
                                        flag="P"
                                    />
                                </Suspense>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>

                {/* Rejected Customers */}
                <Tab
                    eventKey="rejected"
                    title={
                        <>
                            <CircleXIcon size={18} className="me-2" />
                            Rejected Customers
                        </>
                    }
                >
                    <div className="p-3">
                        <Card>
                            <CardBody>
                                <Suspense fallback={<LoaderUI />}>
                                    <CustomerTbl
                                        data={dummyData}
                                        flag="R"
                                    />
                                </Suspense>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>
            </Tabs>

            {/* Edit Modal */}
            {isCustomersEditMdl &&
                <CustomerMdl
                    show={isCustomersEditMdl}
                    editTableData={editTableData}
                    handleClose={handleEditCustomerDtl}
                />
            }
        </>
    )
}

export default Customers
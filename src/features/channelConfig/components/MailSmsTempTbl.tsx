import React, { JSX } from 'react'
import { Button } from 'react-bootstrap';
import { Plus, SquarePen, Trash } from 'lucide-react';
import { mailsmstemplate } from '../types/MailSMSTemp';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import { tableColumnProps } from '../../../services/type';


const columns: tableColumnProps[] = [
    {
        field: 'templateNm',
        header: 'Template Name',
        sorting: true,
    },
    {
        field: 'subject',
        header: 'Subject',
        sorting: true,
    },
    {
        field: 'insertBy',
        header: 'Insert Activity',
        sorting: true,
    },
    {
        field: 'modifyBy',
        header: 'Modify Activity',
        sorting: true,
    },
    {
        field: '',
        header: 'Action',
        sorting: true,
        align: 'center',
    },
];

interface MailSmsTempTblProps {
    data: any,
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleAddTemplateMdl: (data: mailsmstemplate) => void;
    handleDeleteConfirmationMdl: (data: mailsmstemplate) => void,
    handleAddTemplateMdlClose: () => void;
    userData: any;
}

const dummyData = [
    {
        id: 1,
        templateNm: 'Welcome Email',
        templateCode: 'TMP001',
        templateType: 'Email',
        subject: 'Welcome to Our Platform',
        status: 'Active',
        insertBy: 'Admin',
        insertIP: '192.168.1.10',
        insertDt: '2026-05-18 10:30 AM',
        modifyBy: 'John Doe',
        modifyIP: '192.168.1.20',
        modifyDt: '2026-05-18 11:00 AM',
    },
    {
        id: 2,
        templateNm: 'OTP Verification',
        templateCode: 'TMP002',
        templateType: 'SMS',
        subject: 'Your OTP Code',
        status: 'Active',
        insertBy: 'Super Admin',
        insertIP: '192.168.1.11',
        insertDt: '2026-05-17 09:15 AM',
        modifyBy: 'David Smith',
        modifyIP: '192.168.1.21',
        modifyDt: '2026-05-17 10:20 AM',
    },
    {
        id: 3,
        templateNm: 'Password Reset',
        templateCode: 'TMP003',
        templateType: 'Email',
        subject: 'Reset Your Password',
        status: 'Inactive',
        insertBy: 'Admin',
        insertIP: '192.168.1.12',
        insertDt: '2026-05-16 08:45 AM',
        modifyBy: 'Emma Wilson',
        modifyIP: '192.168.1.22',
        modifyDt: '2026-05-16 09:30 AM',
    },
    {
        id: 4,
        templateNm: 'Transaction Alert',
        templateCode: 'TMP004',
        templateType: 'SMS',
        subject: 'Transaction Successful',
        status: 'Active',
        insertBy: 'Rohit',
        insertIP: '192.168.1.13',
        insertDt: '2026-05-15 02:10 PM',
        modifyBy: 'Aman Verma',
        modifyIP: '192.168.1.23',
        modifyDt: '2026-05-15 03:00 PM',
    },
    {
        id: 5,
        templateNm: 'KYC Reminder',
        templateCode: 'TMP005',
        templateType: 'Email',
        subject: 'Complete Your KYC',
        status: 'Pending',
        insertBy: 'Karan',
        insertIP: '192.168.1.14',
        insertDt: '2026-05-14 11:00 AM',
        modifyBy: 'Rahul Sharma',
        modifyIP: '192.168.1.24',
        modifyDt: '2026-05-14 12:00 PM',
    },
    {
        id: 6,
        templateNm: 'Invoice Generated',
        templateCode: 'TMP006',
        templateType: 'Email',
        subject: 'Your Invoice is Ready',
        status: 'Active',
        insertBy: 'Admin',
        insertIP: '192.168.1.15',
        insertDt: '2026-05-13 01:25 PM',
        modifyBy: 'Neha Jain',
        modifyIP: '192.168.1.25',
        modifyDt: '2026-05-13 02:10 PM',
    },
    {
        id: 7,
        templateNm: 'Account Locked',
        templateCode: 'TMP007',
        templateType: 'SMS',
        subject: 'Security Alert',
        status: 'Inactive',
        insertBy: 'Vikas',
        insertIP: '192.168.1.16',
        insertDt: '2026-05-12 03:15 PM',
        modifyBy: 'Priya Shah',
        modifyIP: '192.168.1.26',
        modifyDt: '2026-05-12 04:00 PM',
    },
    {
        id: 8,
        templateNm: 'Payment Reminder',
        templateCode: 'TMP008',
        templateType: 'Email',
        subject: 'Pending Payment Reminder',
        status: 'Pending',
        insertBy: 'Admin',
        insertIP: '192.168.1.17',
        insertDt: '2026-05-11 09:45 AM',
        modifyBy: 'Ankit Singh',
        modifyIP: '192.168.1.27',
        modifyDt: '2026-05-11 10:30 AM',
    },
    {
        id: 9,
        templateNm: 'Profile Updated',
        templateCode: 'TMP009',
        templateType: 'SMS',
        subject: 'Profile Successfully Updated',
        status: 'Active',
        insertBy: 'Deepak',
        insertIP: '192.168.1.18',
        insertDt: '2026-05-10 05:20 PM',
        modifyBy: 'Riya Mehta',
        modifyIP: '192.168.1.28',
        modifyDt: '2026-05-10 06:10 PM',
    },
    {
        id: 10,
        templateNm: 'Subscription Expiry',
        templateCode: 'TMP010',
        templateType: 'Email',
        subject: 'Subscription Expiring Soon',
        status: 'Active',
        insertBy: 'Admin',
        insertIP: '192.168.1.19',
        insertDt: '2026-05-09 07:40 AM',
        modifyBy: 'Suresh Patel',
        modifyIP: '192.168.1.29',
        modifyDt: '2026-05-09 08:15 AM',
    },
    {
        id: 11,
        templateNm: 'Login Alert',
        templateCode: 'TMP011',
        templateType: 'SMS',
        subject: 'New Login Detected',
        status: 'Inactive',
        insertBy: 'Harsh',
        insertIP: '192.168.1.30',
        insertDt: '2026-05-08 01:00 PM',
        modifyBy: 'Nitin Kumar',
        modifyIP: '192.168.1.31',
        modifyDt: '2026-05-08 01:45 PM',
    },
    {
        id: 12,
        templateNm: 'Backup Notification',
        templateCode: 'TMP012',
        templateType: 'Email',
        subject: 'Backup Completed Successfully',
        status: 'Active',
        insertBy: 'System',
        insertIP: '192.168.1.32',
        insertDt: '2026-05-07 04:50 PM',
        modifyBy: 'Admin',
        modifyIP: '192.168.1.33',
        modifyDt: '2026-05-07 05:30 PM',
    },
];

const MailSmsTempTbl: React.FC<MailSmsTempTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleAddTemplateMdl, handleAddTemplateMdlClose, userData, handleDeleteConfirmationMdl }) => {


    return (
        <Datatable
            data={dummyData}
            columns={columns}
            style={{ height: "calc(-420px + 100vh)", overflow: "auto", }}
            tableNm="Template"
            isSearchBar
            isNotHoverable
            isLoader={isLoader}
            tableBtn={<>
                {/* {userData?.permissions?.SAVE_MAIL_SMS_TEMPLATE === "Y" && */}
                <Button
                    onClick={handleAddTemplateMdlClose}
                    variant='primary'
                    size='sm'
                    className="ms-auto">
                    <Plus size={15} strokeWidth={3} className="me-1" /> Add Template
                </Button>
                {/* } */}
            </>}
            pagination
            setPageSize={setPageSize}
            setPageNo={setPageNo}
            totalRecord={totalRecord}
            setSearchContain={setSearchContain}
        >
            {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                <>

                    {child.column.field === 'insertBy' && <div>
                        <div>{child.row.insertBy} | {child.row.insertIP} </div>
                        <div className='text-xs text-slate-500'>{child.row.insertDt}</div>
                    </div>}

                    {child.column.field === 'modifyBy' && child?.row?.modifyBy && <div>
                        <div>{child.row.modifyBy} | {child.row.modifyIP}</div>
                        <div className='text-xs text-slate-500'>{child.row.modifyDt}</div>
                    </div>}

                    {child.column.field === '' && <div>
                        <div className='d-flex justify-content-center gap-2'>
                            {/* {userData?.permissions?.UPDATE_MAIL_SMS_TEMPLATE === "Y" && */}
                            <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => { handleAddTemplateMdl(child.row) }} ><SquarePen size={16} /></Button>
                            {/* } */}
                            {/* {userData?.permissions?.DELETE_MAIL_SMS_TEMPLATE === "Y" && */}
                            <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" onClick={() => { handleDeleteConfirmationMdl(child.row) }}><Trash size={16} /></Button>
                            {/* } */}
                        </div>
                    </div>
                    }

                    {child.column.field !== "insertBy" &&
                        child.column.field !== "modifyBy" &&
                        child.row[child.column.field as keyof any]}
                </>
            )}
        </Datatable>
    )
}

export default MailSmsTempTbl
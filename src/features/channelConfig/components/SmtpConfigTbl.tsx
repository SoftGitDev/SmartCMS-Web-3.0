import React, { JSX, ReactNode } from 'react'
import { Button } from 'react-bootstrap';
import { CircleUserRound, SquarePen, Trash } from 'lucide-react';
import { SMTPConfigListProps } from '../types/MailSMSTemp';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import { tableColumnProps } from '../../../services/type';


interface SmtpConfigTblProps {
    data: SMTPConfigListProps[],
    isLoader: boolean,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    setPageNo: React.Dispatch<React.SetStateAction<number>>,
    totalRecord: number,
    setSearchContain: React.Dispatch<React.SetStateAction<string>>,
    handleSmtpConfigFrm: (data?: SMTPConfigListProps) => void,
    handleDeleteConfirmationMdl: (data: SMTPConfigListProps) => void,
    userData: any,
    tableBtn: ReactNode
}

const columns: tableColumnProps[] = [
    {
        field: 'smtpType',
        header: 'Configuration Name',
        sorting: true,
        width: "150px",
    },
    {
        field: 'description',
        header: 'Description',
        sorting: true,
        width: "150px",
    },
    {
        field: 'host',
        header: 'SMTP Host',
        sorting: true,
    },
    {
        field: 'port',
        header: 'Port',
        sorting: true,
    },
    {
        field: 'fromName',
        header: 'FromName',
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
        header: '',
        align: "center",
        sorting: false,
    }
];

const dummyData = [
    {
        id: 1,
        description: 'Primary SMTP Server',
        smtpType: 'I',
        host: 'smtp.gmail.com',
        port: 587,
        fromName: 'Support Team',
        emailId: 'support@gmail.com',
        fromId: 'support@gmail.com',
        insertBy: 'Admin',
        insertIP: '192.168.1.10',
        insertDt: '2026-05-18 10:30 AM',
        modifyBy: 'John Doe',
        modifyIP: '192.168.1.20',
        modifyDt: '2026-05-18 11:00 AM',
    },
    {
        id: 2,
        description: 'Marketing Mail Server',
        host: 'smtp.office365.com',
        port: 465,
        smtpType: 'I',

        fromName: 'Marketing',
        emailId: 'marketing@company.com',
        fromId: 'marketing@company.com',
        insertBy: 'Super Admin',
        insertIP: '192.168.1.11',
        insertDt: '2026-05-17 09:15 AM',
        modifyBy: 'David Smith',
        modifyIP: '192.168.1.21',
        modifyDt: '2026-05-17 10:20 AM',
    },
    {
        id: 3,
        description: 'Notification Service',
        host: 'mail.yahoo.com',
        port: 25,
        fromName: 'Notifier',
        emailId: 'notify@yahoo.com',
        smtpType: 'E',

        fromId: 'notify@yahoo.com',
        insertBy: 'Admin',
        insertIP: '192.168.1.12',
        insertDt: '2026-05-16 08:45 AM',
        modifyBy: 'Emma Wilson',
        modifyIP: '192.168.1.22',
        modifyDt: '2026-05-16 09:30 AM',
    },
    {
        id: 4,
        description: 'HR Communication',
        host: 'smtp.zoho.com',
        port: 587,
        fromName: 'HR Team',
        emailId: 'hr@company.com',
        fromId: 'hr@company.com',
        insertBy: 'Rohit',
        insertIP: '192.168.1.13',
        insertDt: '2026-05-15 02:10 PM',
        modifyBy: 'Aman Verma',
        modifyIP: '192.168.1.23',
        modifyDt: '2026-05-15 03:00 PM',
    },
    {
        id: 5,
        description: 'Finance Alerts',
        host: 'smtp.mailtrap.io',
        port: 2525,
        fromName: 'Finance',
        emailId: 'finance@company.com',
        fromId: 'finance@company.com',
        insertBy: 'Karan',
        insertIP: '192.168.1.14',
        insertDt: '2026-05-14 11:00 AM',
        modifyBy: 'Rahul Sharma',
        modifyIP: '192.168.1.24',
        modifyDt: '2026-05-14 12:00 PM',
    },
    {
        id: 6,
        description: 'Customer Support',
        host: 'smtp.sendgrid.net',
        port: 587,
        fromName: 'Customer Care',
        emailId: 'care@company.com',
        fromId: 'care@company.com',
        insertBy: 'Admin',
        insertIP: '192.168.1.15',
        insertDt: '2026-05-13 01:25 PM',
        modifyBy: 'Neha Jain',
        modifyIP: '192.168.1.25',
        modifyDt: '2026-05-13 02:10 PM',
    },
    {
        id: 7,
        description: 'Bulk Email Service',
        host: 'smtp.mailgun.org',
        port: 465,
        fromName: 'Bulk Mail',
        emailId: 'bulk@mail.com',
        fromId: 'bulk@mail.com',
        insertBy: 'Vikas',
        insertIP: '192.168.1.16',
        insertDt: '2026-05-12 03:15 PM',
        modifyBy: 'Priya Shah',
        modifyIP: '192.168.1.26',
        modifyDt: '2026-05-12 04:00 PM',
    },
    {
        id: 8,
        description: 'Transactional Emails',
        host: 'smtp.elasticemail.com',
        port: 2525,
        fromName: 'Transaction Team',
        emailId: 'transaction@company.com',
        fromId: 'transaction@company.com',
        insertBy: 'Admin',
        insertIP: '192.168.1.17',
        insertDt: '2026-05-11 09:45 AM',
        modifyBy: 'Ankit Singh',
        modifyIP: '192.168.1.27',
        modifyDt: '2026-05-11 10:30 AM',
    },
    {
        id: 9,
        description: 'System Notifications',
        host: 'smtp.postmarkapp.com',
        port: 587,
        fromName: 'System Alert',
        emailId: 'alerts@system.com',
        fromId: 'alerts@system.com',
        insertBy: 'Deepak',
        insertIP: '192.168.1.18',
        insertDt: '2026-05-10 05:20 PM',
        modifyBy: 'Riya Mehta',
        modifyIP: '192.168.1.28',
        modifyDt: '2026-05-10 06:10 PM',
    },
    {
        id: 10,
        description: 'Internal Communication',
        host: 'smtp.aol.com',
        port: 465,
        fromName: 'Internal Mail',
        emailId: 'internal@company.com',
        fromId: 'internal@company.com',
        insertBy: 'Admin',
        insertIP: '192.168.1.19',
        insertDt: '2026-05-09 07:40 AM',
        modifyBy: 'Suresh Patel',
        modifyIP: '192.168.1.29',
        modifyDt: '2026-05-09 08:15 AM',
    },
    {
        id: 11,
        description: 'Client Email Service',
        host: 'smtp.fastmail.com',
        port: 587,
        fromName: 'Client Desk',
        emailId: 'client@company.com',
        fromId: 'client@company.com',
        insertBy: 'Harsh',
        insertIP: '192.168.1.30',
        insertDt: '2026-05-08 01:00 PM',
        modifyBy: 'Nitin Kumar',
        modifyIP: '192.168.1.31',
        modifyDt: '2026-05-08 01:45 PM',
    },
    {
        id: 12,
        description: 'Backup SMTP Server',
        host: 'smtp.protonmail.com',
        port: 25,
        fromName: 'Backup Mail',
        emailId: 'backup@company.com',
        fromId: 'backup@company.com',
        insertBy: 'System',
        insertIP: '192.168.1.32',
        insertDt: '2026-05-07 04:50 PM',
        modifyBy: 'Admin',
        modifyIP: '192.168.1.33',
        modifyDt: '2026-05-07 05:30 PM',
    },
];

const SmtpConfigTbl: React.FC<SmtpConfigTblProps> = ({ data, isLoader, setPageSize, setPageNo, totalRecord, setSearchContain, handleSmtpConfigFrm, handleDeleteConfirmationMdl, userData, tableBtn }) => {

    return (
        <Datatable
            data={dummyData}
            columns={columns}
            style={{ height: "calc(-418px + 100vh)", overflow: "auto", }}
            tableNm="SMTP"
            isSearchBar
            isLoader={isLoader}
            pagination
            isNotHoverable
            tableBtn={tableBtn}
            setPageSize={setPageSize}
            setPageNo={setPageNo}
            totalRecord={totalRecord}
            setSearchContain={setSearchContain}
        >
            {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                <>

                    {child.column.field === 'fromName' &&
                        <>
                            <div><span className="text-primary"><CircleUserRound size={13} /></span> {" "}{child.row.fromName}</div>
                            {child.row.emailId !== null && <div className='text-sm text-slate-500'> <span className="text-primary">&#9993; </span> {" "}{child.row.fromId}</div>}
                        </>
                    }

                    {child.column.field === 'insertBy' && <div>
                        <div>{child.row.insertBy} | {child.row.insertIP} </div>
                        <div className='text-xs text-slate-500'>{child.row.insertDt}</div>
                    </div>}

                    {child.column.field === 'smtpType' &&
                        <div>{child.row.smtpType === 'I' ? 'Internal Ticket mail' : 'External Ticket mail'}</div>
                    }

                    {child.column.field === 'modifyBy' && child?.row?.modifyBy && <div>
                        <div>{child.row.modifyBy} | {child.row.modifyIP}</div>
                        <div className='text-xs text-slate-500'>{child.row.modifyDt}</div>
                    </div>}


                    {child.column.field === '' && <div>
                        <div className='d-flex justify-content-center gap-2'>
                            {/* {userData?.permissions?.UPDATE_MAIL_CONFIG === "Y" && */}
                            <Button variant="edit" title="Edit" className="btn-sm icon-wrapper-edit rounded-circle" onClick={() => { handleSmtpConfigFrm(child.row) }} ><SquarePen size={16} /></Button>
                            {/* {userData?.permissions?.DELETE_MAIL_CONFIG === "Y" && */}
                            <Button variant="delete" title="Delete" className="btn-sm icon-wrapper-delete rounded-circle" onClick={() => { handleDeleteConfirmationMdl(child.row) }}><Trash size={16} /></Button>
                            {/* } */}
                        </div>
                    </div>
                    }

                    {child.column.field !== "fromName" &&
                        child.column.field !== "insertBy" &&
                        child.column.field !== "modifyBy" &&
                        child.column.field !== "smtpType" &&
                        child.row[child.column.field as keyof any]}
                </>
            )}
        </Datatable>
    )
}

export default SmtpConfigTbl
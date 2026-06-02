import React, { Suspense, useState } from 'react'
import AuditlogTbl from '../../content/table/auditlog/AuditlogTbl';
import AuditlogDtlView from '../../content/modal/auditlog/AuditlogDtlView';
import LoaderUI from '../../components/loader/Loader';
import PageHeaeder from '../../components/common/PageHeaeder';
import { History, ShieldAlert } from 'lucide-react';
import { Card, CardBody } from 'react-bootstrap';


// ── Page component ──────
const Auditlog = () => {

    const [isAuditDtlView, setIsAuditDtlView] = useState<boolean>(false)
    // const [auditlogDtl, setAuditlogDtl] = useState<any>()

    const [auditlogDtl, setAuditlogDtl] = useState<any>({
        user: "Admin User",

        OldData: JSON.stringify({
            customerId: "CUST1001",
            customerName: "Rahul Sharma",
            mobileNo: "9876543210",
            email: "rahul.old@example.com",
            status: "Inactive",
            updatedBy: "System"
        }),

        NewData: JSON.stringify({
            customerId: "CUST1001",
            customerName: "Rahul Sharma",
            mobileNo: "9876543210",
            email: "rahul.new@example.com",
            status: "Active",
            updatedBy: "Admin"
        })
    })

    console.log('auditlogDtl', auditlogDtl);

    const handleAuditDtlMdl = (data?: any) => {
        setIsAuditDtlView(!isAuditDtlView)
        // setAuditlogDtl(data)
    }
    return (
        <>
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={ShieldAlert}
                    title={'Audit Log'}
                    description={'Track, monitor, and review comprehensive system events, user actions, and security access changes across your account.'}
                />
            </Suspense>

            <div className='p-3'>
                <Card>
                    <CardBody>
                        {/* ── Table ── */}
                        <AuditlogTbl
                            handleAuditDtlMdl={handleAuditDtlMdl}
                        />
                    </CardBody>
                </Card>


                {isAuditDtlView &&
                    <AuditlogDtlView
                        show={isAuditDtlView}
                        handleClose={handleAuditDtlMdl}
                        auditlogDtl={auditlogDtl}
                    />
                }
            </div>
        </>
    );
};

export default Auditlog;
import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Eye } from 'lucide-react'
import { tableColumnProps } from '../../../types/typr'


const columns: tableColumnProps[] = [
    {
        field: 'timestamp',
        header: 'Timestamp ',
        sorting: true
    },
    {
        field: 'user',
        header: 'User ',
        sorting: true
    },
    {
        field: 'action',
        header: 'Action ',
        sorting: true
    },
    {
        field: 'resource',
        header: 'Resource',
        sorting: true
    },
    {
        field: 'result',
        header: 'Result',
        sorting: true
    },
    {
        field: 'ipaddress',
        header: 'IP Address',
        sorting: true
    },
    {
        field: '',
        header: '',
        sorting: false
    },
]

const dummayData: any = [
    { "timestamp": "2026-04-18 06:01:12", "user": "jdoe", "action": "DELETE_FILE", "resource": "/api/v1/data", "result": "SUCCESS", "ipaddress": "203.0.113.8", "": "" },
    { "timestamp": "2026-04-18 05:46:12", "user": "jdoe", "action": "DOWNLOAD", "resource": "/docs/plan.pdf", "result": "SUCCESS", "ipaddress": "8.8.8.8", "": "" },
    { "timestamp": "2026-04-18 05:31:12", "user": "asmith", "action": "CREATE_FILE", "resource": "/settings/profile", "result": "FAILURE", "ipaddress": "10.0.0.12", "": "" },
    { "timestamp": "2026-04-18 05:16:12", "user": "sparker", "action": "DELETE_FILE", "resource": "/docs/plan.pdf", "result": "SUCCESS", "ipaddress": "172.16.254.1", "": "" },
    { "timestamp": "2026-04-18 05:01:12", "user": "sparker", "action": "LOGIN", "resource": "/api/v1/data", "result": "SUCCESS", "ipaddress": "192.168.1.45", "": "" },
    { "timestamp": "2026-04-18 04:46:12", "user": "asmith", "action": "DOWNLOAD", "resource": "/settings/profile", "result": "DENIED", "ipaddress": "192.168.1.45", "": "" },
    { "timestamp": "2026-04-18 04:31:12", "user": "sparker", "action": "LOGIN", "resource": "/docs/plan.pdf", "result": "FAILURE", "ipaddress": "203.0.113.8", "": "" },
    { "timestamp": "2026-04-18 04:16:12", "user": "mchen", "action": "CREATE_FILE", "resource": "root/config", "result": "PENDING", "ipaddress": "203.0.113.8", "": "" },
    { "timestamp": "2026-04-18 04:01:12", "user": "asmith", "action": "UPDATE_PERMISSIONS", "resource": "/api/v1/auth", "result": "PENDING", "ipaddress": "10.0.0.12", "": "" },
    { "timestamp": "2026-04-18 03:46:12", "user": "mchen", "action": "LOGIN", "resource": "/api/v1/data", "result": "FAILURE", "ipaddress": "172.16.254.1", "": "" },
    { "timestamp": "2026-04-18 03:31:12", "user": "asmith", "action": "UPDATE_PERMISSIONS", "resource": "/settings/profile", "result": "SUCCESS", "ipaddress": "192.168.1.45", "": "" },
    { "timestamp": "2026-04-18 03:16:12", "user": "rroberts", "action": "UPDATE_PERMISSIONS", "resource": "root/config", "result": "DENIED", "ipaddress": "8.8.8.8", "": "" },
    { "timestamp": "2026-04-18 03:01:12", "user": "sparker", "action": "DOWNLOAD", "resource": "/docs/plan.pdf", "result": "DENIED", "ipaddress": "203.0.113.8", "": "" },
    { "timestamp": "2026-04-18 02:46:12", "user": "rroberts", "action": "DOWNLOAD", "resource": "/settings/profile", "result": "SUCCESS", "ipaddress": "192.168.1.45", "": "" },
    { "timestamp": "2026-04-18 02:31:12", "user": "jdoe", "action": "LOGOUT", "resource": "/api/v1/data", "result": "SUCCESS", "ipaddress": "203.0.113.8", "": "" },
    { "timestamp": "2026-04-18 02:16:12", "user": "jdoe", "action": "LOGIN", "resource": "/settings/profile", "result": "FAILURE", "ipaddress": "172.16.254.1", "": "" },
    { "timestamp": "2026-04-18 02:01:12", "user": "sparker", "action": "DOWNLOAD", "resource": "/settings/profile", "result": "PENDING", "ipaddress": "8.8.8.8", "": "" },
    { "timestamp": "2026-04-18 01:46:12", "user": "jdoe", "action": "LOGOUT", "resource": "/docs/plan.pdf", "result": "DENIED", "ipaddress": "203.0.113.8", "": "" }
]

interface AuditlogTblProps {
    handleAuditDtlMdl: (row: any) => void
}
const AuditlogTbl: React.FC<AuditlogTblProps> = ({ handleAuditDtlMdl }) => {
    return (
        <div>
            <Datatable
                data={dummayData}
                columns={columns}
                isSearchBar
                pagination
                isNotCardRequired
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === '' &&
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 0, hide: 0 }}
                                overlay={<Tooltip id="button-tooltip">View Detail</Tooltip>}
                            >
                                <Button size='sm' variant="edit" className="rounded-circle" onClick={() => handleAuditDtlMdl(child.row)}
                                >
                                    <Eye size={15} />
                                </Button>
                            </OverlayTrigger>


                        }
                        {/* DEFAULT FALLBACK */}
                        {
                            child.column.field !== "status" &&
                            <span>{child.row[child.column.field as keyof any]}</span>
                        }
                    </>
                )}

            </Datatable>
        </div>
    )
}

export default AuditlogTbl


// Purpose: Escalation Level Assign table  
// Created by: Harish
// Created Date: 02-06-2026

import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../types/typr'
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import { Button } from 'react-bootstrap';

const columns: tableColumnProps[] = [
    {
        field: 'users',
        header: 'Users',
        sorting: true,
    },
    {
        field: 'escalationAssign',
        header: 'Escalation Assign',
        sorting: false,
        align: 'center'
    },
    {
        field: 'mailSMSAlert',
        header: 'Mail SMS Alert',
        sorting: false,
        align: 'center'

    },
];

const dummyDAta = [
    {
        "id": 1,
        "users": "Alice Johnson",
        "escalationAssign": true,
        "mailSMSAlert": true
    },
    {
        "id": 2,
        "users": "Bob Smith",
        "escalationAssign": false,
        "mailSMSAlert": true
    },
    {
        "id": 3,
        "users": "Charlie Davis",
        "escalationAssign": true,
        "mailSMSAlert": false
    },
    {
        "id": 4,
        "users": "Diana Prince",
        "escalationAssign": false,
        "mailSMSAlert": false
    },
    {
        "id": 5,
        "users": "Ethan Hunt",
        "escalationAssign": true,
        "mailSMSAlert": true
    },
    {
        "id": 6,
        "users": "Fiona Gallagher",
        "escalationAssign": false,
        "mailSMSAlert": true
    },
    {
        "id": 7,
        "users": "George Miller",
        "escalationAssign": true,
        "mailSMSAlert": false
    },
    {
        "id": 8,
        "users": "Hannah Abbott",
        "escalationAssign": false,
        "mailSMSAlert": false
    },
    {
        "id": 9,
        "users": "Ian Wright",
        "escalationAssign": true,
        "mailSMSAlert": true
    },
    {
        "id": 10,
        "users": "Julia Roberts",
        "escalationAssign": true,
        "mailSMSAlert": false
    },
    {
        "id": 11,
        "users": "Kevin Hart",
        "escalationAssign": false,
        "mailSMSAlert": true
    },
    {
        "id": 12,
        "users": "Laura Croft",
        "escalationAssign": true,
        "mailSMSAlert": true
    },
    {
        "id": 13,
        "users": "Michael Scott",
        "escalationAssign": false,
        "mailSMSAlert": false
    },
    {
        "id": 14,
        "users": "Nina Simone",
        "escalationAssign": true,
        "mailSMSAlert": true
    },
    {
        "id": 15,
        "users": "Oscar Isaac",
        "escalationAssign": false,
        "mailSMSAlert": true
    }
]

const EscalationLevelAssignTbl = () => {
    return (
        <>
            <Datatable
                data={dummyDAta}
                columns={columns}
                isSearchBar
                style={{ height: "calc(-320px + 100vh)", overflow: "auto", }}
                tableBtn={<div className='ms-auto d-flex gap-3'>
                    <div style={{ width: 320 }}>
                        <SelectField
                            placeholder='Select matrix level'
                        />
                    </div>
                    <Button>
                        Update
                    </Button>
                </div>}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === 'escalationAssign' &&
                            <div className='d-flex justify-content-center'>
                                <Checkbox
                                    checked={child.row.escalationAssign}
                                />
                            </div>
                        }

                        {child.column.field === 'mailSMSAlert' &&
                            <div className='d-flex justify-content-center'>
                                <Checkbox
                                    checked={child.row.mailSMSAlert}
                                />
                            </div>
                        }

                        {
                            child.column.field !== "status" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default EscalationLevelAssignTbl
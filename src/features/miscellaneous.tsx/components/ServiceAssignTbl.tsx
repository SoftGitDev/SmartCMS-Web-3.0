import React, { JSX } from 'react'
import { Datatable } from '../../../common/components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../services/type';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';

const columns: tableColumnProps[] = [
    {
        field: 'UserName',
        header: 'UserName',
        align: 'left',
        sorting: true,
    },
    {
        field: '',
        header: '',
        align: 'center',
        sorting: false,
    },
];

interface ServiceAssignTblProps {
    values: any,
    setFieldValue: any
    userList: any
}

const ServiceAssignTbl: React.FC<ServiceAssignTblProps> = ({ values, setFieldValue, userList }) => {
    return (
        <>
            <Datatable
                data={userList}
                columns={columns}
                isNotHoverable
                isNotCardRequired
                style={{ height: "calc(-340px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === '' &&
                            <Checkbox
                                onChange={(e: any) => {
                                    var newValaue = values.assignedServices.map((row: any) => ({
                                        ...row,
                                        MapFlag: e.target.checked ? "Y" : "N"
                                    }));
                                    setFieldValue('assignedServices', newValaue);
                                }}
                            />
                        }

                        {
                            child.column.field !== "required" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default ServiceAssignTbl
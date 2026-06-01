
// Purpose: Form permisson Mapping   modal 
// Created by: Harish
// Created Date: 01-06-2026

import React, { JSX } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../types/typr'
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch';

const columns: tableColumnProps[] = [
    {
        field: 'displayNm',
        header: 'Display Name',
        sorting: true,
    },
    {
        field: 'type',
        header: 'Type',
        sorting: true,
    },
    {
        field: 'required',
        header: 'Required',
        sorting: true,
    },
];

const dummyData = [
    { displayNm: "First Name", type: "Text", required: true },
    { displayNm: "Last Name", type: "Text", required: true },
    { displayNm: "Age", type: "Number", required: false },
    { displayNm: "Email Address", type: "Email", required: true },
    { displayNm: "Phone Number", type: "Phone", required: false },
    { displayNm: "Profile Picture", type: "File Upload", required: false },
    { displayNm: "Date of Birth", type: "Date", required: true },
    { displayNm: "Password", type: "Password", required: true },
    { displayNm: "Country", type: "Dropdown", required: true },
    { displayNm: "Postal Code", type: "Text", required: false },
    { displayNm: "Subscribe to Newsletter", type: "Checkbox", required: false },
    { displayNm: "Bio / Description", type: "TextArea", required: false },
    { displayNm: "Terms and Conditions", type: "Checkbox", required: true },
    { displayNm: "Website URL", type: "URL", required: false },
    { displayNm: "Gender", type: "Radio", required: true }
];

interface FormPermissionTblProps {
    selectData: any
    setSelectData: any
}

const FormPermissionTbl: React.FC<FormPermissionTblProps> = ({ selectData, setSelectData }) => {
    return (
        <>
            <Datatable
                data={dummyData}
                columns={columns}
                isSearchBar
                isNotHoverable
                isNotCardRequired
                style={{ height: "calc(-640px + 100vh)", overflow: "auto", }}
                checkbox
                selectData={selectData}
                setSelectData={setSelectData}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>

                        {child.column.field === 'required' && <div>
                            <ToggleSwitch
                                checked={child.row.required}
                                onChange={() => console.log('')}
                            />
                        </div>
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

export default FormPermissionTbl
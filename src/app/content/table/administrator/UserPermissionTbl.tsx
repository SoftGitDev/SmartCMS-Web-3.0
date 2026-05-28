import React, { useEffect } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { Package, UserLock } from "lucide-react";
import NoDatafound from "../../../assets/images/NoDatafound.png";
import { FormikErrors } from "formik";
import Checkbox from "../../../components/ui/checkBox/Checkbox";

const columns = [
    { field: 'formCaption', header: 'Menu Name', width: '260px' },
    { field: 'permissionView', header: 'Show', align: 'center' },
    { field: 'permissionsave', header: 'Save', align: 'center' },
    { field: 'permissionUpdate', header: 'Update', align: 'center' },
    { field: 'permissionDelete', header: 'Delete', align: 'center' },
    { field: 'permissionCopy', header: 'Copy (Ctrl + C)', align: 'center' },
    { field: 'permissionCut', header: 'Cut (Ctrl + X)', align: 'center' },
    { field: 'permissionPaste', header: 'Paste (Ctrl + V)', align: 'center' },
    { field: 'permissionRightClick', header: 'Mouse Right Click', align: 'center' },
];

type permissionFieldType =
    | 'permissionView'
    | 'permissionsave'
    | 'permissionUpdate'
    | 'permissionDelete'
    | 'permissionCopy'
    | 'permissionCut'
    | 'permissionPaste'
    | 'permissionRightClick';

type UserRolePermissionProps = {
    heading: string;
    data: any[];
    setFieldValue: (
        field: string,
        value: any[]
    ) => Promise<void | FormikErrors<any>>;
    values: any;
};

const UserPermissionTbl: React.FC<UserRolePermissionProps> = ({
    heading,
    data,
    setFieldValue,
    values
}) => {

    const deepCopy = (array: any[]) => {
        return array.map((item: any) => ({
            ...item,
            submoduleList: item?.submoduleList
                ? item?.submoduleList?.map((sub: any) => ({ ...sub }))
                : [],
        }));
    };

    useEffect(() => {
        setFieldValue('permission', deepCopy(data));
    }, []);

    const handleParentCheckboxChange = (
        rowIndex: number,
        field: permissionFieldType,
        checked: boolean,
        flag: "P" | "S",
        childIndex?: number
    ) => {

        const newValue = [...values.permission];
        const parentRow = newValue[rowIndex];

        const autoViewFields = [
            'permissionsave',
            'permissionUpdate',
            'permissionDelete',
            'permissionCopy',
            'permissionCut',
            'permissionPaste',
            'permissionRightClick',
        ];

        if (flag === "P") {

            parentRow[field] = checked ? 'Y' : 'N';

            // Auto Enable Show
            if (
                checked &&
                autoViewFields.includes(field)
            ) {
                parentRow.permissionView = "Y";
            }

            // Child Sync
            if (
                parentRow.submoduleList &&
                parentRow.submoduleList.length > 0
            ) {

                parentRow.submoduleList.forEach((submodule: any) => {

                    submodule[field] = checked ? 'Y' : 'N';

                    if (
                        checked &&
                        autoViewFields.includes(field)
                    ) {
                        submodule.permissionView = "Y";
                    }

                    // Remove View if all unchecked
                    if (
                        !checked &&
                        submodule.permissionsave === "N" &&
                        submodule.permissionUpdate === "N" &&
                        submodule.permissionDelete === "N" &&
                        submodule.permissionCopy === "N" &&
                        submodule.permissionCut === "N" &&
                        submodule.permissionPaste === "N" &&
                        submodule.permissionRightClick === "N"
                    ) {
                        submodule.permissionView = "N";
                    }
                });
            }

        } else if (
            newValue[rowIndex].submoduleList &&
            (childIndex || childIndex === 0)
        ) {

            const child =
                newValue[rowIndex].submoduleList[childIndex];

            child[field] = checked ? 'Y' : 'N';

            // Auto Enable Show
            if (
                checked &&
                autoViewFields.includes(field)
            ) {
                child.permissionView = "Y";
            }

            // Auto Remove Show
            if (
                !checked &&
                child.permissionsave === "N" &&
                child.permissionUpdate === "N" &&
                child.permissionDelete === "N" &&
                child.permissionCopy === "N" &&
                child.permissionCut === "N" &&
                child.permissionPaste === "N" &&
                child.permissionRightClick === "N"
            ) {
                child.permissionView = "N";
            }

            // Parent Sync
            const anyChecked =
                newValue[rowIndex].submoduleList.some(
                    (sub: any) =>
                        sub.permissionView === 'Y' ||
                        sub.permissionsave === 'Y' ||
                        sub.permissionUpdate === 'Y' ||
                        sub.permissionDelete === 'Y' ||
                        sub.permissionCopy === 'Y' ||
                        sub.permissionCut === 'Y' ||
                        sub.permissionPaste === 'Y' ||
                        sub.permissionRightClick === 'Y'
                );

            newValue[rowIndex].permissionView =
                anyChecked ? "Y" : "N";
        }

        setFieldValue('permission', newValue);
    };

    const renderCheckbox = (
        row: any,
        rowIndex: number,
        field: permissionFieldType,
        formField: string,
        flag: "P" | "S",
        childIndex?: number,
        isLight?: boolean
    ) => {

        if (row?.[formField] !== 'Y') {
            return null;
        }

        return (
            <td className={`text-center ${isLight ? 'bg-light' : ''}`}>
                <Checkbox
                    checked={row?.[field] === 'Y'}
                    className="justify-content-center"
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                        handleParentCheckboxChange(
                            rowIndex,
                            field,
                            e.target.checked,
                            flag,
                            childIndex
                        )
                    }
                />
            </td>
        );
    };

    return (
        <div>
            <Row>
                <Col sm={12} className="table-heading mb-1">
                    <h1 className="d-flex text-base mb-0 fw-semibold gap-2">
                        <span className="icon-wrapper-sm">
                            <UserLock size={16} />
                        </span>
                        {heading}
                    </h1>
                </Col>
            </Row>

            <div className="mt-1 border rounded overflow-hidden">

                <div
                    style={{
                        maxHeight: "calc(100vh - 430px)",
                        overflowY: "auto",
                    }}
                >

                    <Table hover className="mb-0">

                        <thead className="bg-light sticky-top">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={column.align === 'center' ? 'text-center' : ''}
                                        style={{ width: column.width, minWidth: column.width, }}>
                                        <div className="text-slate-700 text-md fw-semibold">
                                            {column.header}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {values?.permission?.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-5" >
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <img src={NoDatafound} alt="no data found" style={{ width: 200 }} />
                                            <h1 className="text-base mt-3">
                                                No user permission found
                                            </h1>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                values?.permission?.map(
                                    (row: any, rowIndex: number) => (
                                        <React.Fragment key={rowIndex}>
                                            {/* Parent Row */}
                                            <tr className="bg-light">
                                                <td className="fw-semibold text-md bg-light">
                                                    <Package size={16} className="me-1"/>
                                                    {row.formCaption}
                                                </td>
                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionView',
                                                    'formView',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionsave',
                                                    'formSave',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionUpdate',
                                                    'formUpdate',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionDelete',
                                                    'formDelete',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionCopy',
                                                    'formCopy',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionCut',
                                                    'formCut',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionPaste',
                                                    'formPaste',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                                {renderCheckbox(
                                                    row,
                                                    rowIndex,
                                                    'permissionRightClick',
                                                    'formRightClick',
                                                    "P",
                                                    undefined,
                                                    true
                                                )}

                                            </tr>

                                            {/* Child Rows */}

                                            {row?.submoduleList?.map(
                                                (
                                                    submodule: any,
                                                    childIndex: number
                                                ) => (

                                                    <tr
                                                        key={`${rowIndex}-${childIndex}`}
                                                    >

                                                        <td className="ps-5 text-xs">
                                                            {
                                                                submodule.formCaption
                                                            }
                                                        </td>

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionView',
                                                            'formView',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionsave',
                                                            'formSave',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionUpdate',
                                                            'formUpdate',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionDelete',
                                                            'formDelete',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionCopy',
                                                            'formCopy',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionCut',
                                                            'formCut',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionPaste',
                                                            'formPaste',
                                                            "S",
                                                            childIndex
                                                        )}

                                                        {renderCheckbox(
                                                            submodule,
                                                            rowIndex,
                                                            'permissionRightClick',
                                                            'formRightClick',
                                                            "S",
                                                            childIndex
                                                        )}

                                                    </tr>
                                                )
                                            )}
                                        </React.Fragment>
                                    )
                                )
                            )}

                        </tbody>

                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserPermissionTbl;
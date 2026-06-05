// Purpose: Mail & SMS Template Mapping Table Config 
// Created by: Harish 
// Created Date: 04-06-2026

import React, { JSX, useState } from 'react'
import { Datatable } from '../../../components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../types/typr'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import ToggleSwitch from '../../../components/ui/toggleSwitch/ToggleSwitch';
import { Edit, Save } from 'lucide-react';

const columns: tableColumnProps[] = [
    { field: 'Label', header: 'Label' },
    { field: 'Internal', header: 'Internal' },
    { field: 'InternalTempStatus', header: 'Internal Status', align: "center" },
    { field: 'External', header: 'External' },
    { field: 'ExternalTempStatus', header: 'External Status', align: "center" },
    { field: 'actions', header: 'Actions', align: "center" }, // Fixed empty string issue
];

interface MailSMSTemplateMappingTblProps { }

const MailSMSTemplateMappingTbl: React.FC<MailSMSTemplateMappingTblProps> = () => {
    // Component Data States
    const [alertData, setAlertData] = useState<any[]>([
        {
            Seq: 1,
            TranCode: 'TXN001',
            Label: 'Customer Registration OTP',
            Type: 'SMS & Email',
            InternalTempId: 'INT_OTP_01',
            InternalTempName: 'Internal OTP Template v1',
            InternalTempStatus: 'Y',
            ExternalTempId: 'EXT_OTP_01',
            ExternalTempName: 'External Gateway OTP Template',
            ExternalTempStatus: 'Y'
        }
    ]);


    // Track active inline editing states per row index
    const [editRow, setEditRow] = useState<{ [key: number]: boolean }>({});

    const startEditingRow = (rowIndex: number) => {
        setEditRow(prev => ({ ...prev, [rowIndex]: true }));
    };

    const commitRowSavings = (rowIndex: number) => {
        setEditRow(prev => ({ ...prev, [rowIndex]: false }));
    };

    return (
        <>
            <Datatable
                data={alertData}
                columns={columns}
                pagination
                isSearchBar
                isNotCardRequired
                isNotHoverable
                style={{ height: "calc(-385px + 100vh)", overflow: "auto", }}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => {
                    const { row, column, rowIndex } = child;

                    return (
                        <>
                            {/* --- Label Column --- */}
                            {column.field === "Label" && (
                                <>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id={`tooltip-${rowIndex}`}>{row.Label}</Tooltip>}
                                    >
                                        <div className="text-sm mailsms-title">{row.Label}</div>
                                    </OverlayTrigger>
                                    <div className="text-xs text-slate-500">{row.Type}</div>
                                </>
                            )}

                            {/* --- Internal Template Column --- */}
                            {column.field === "Internal" && (
                                <>
                                    {editRow[rowIndex] ? (
                                        <SelectField
                                            placeholder='Templates'
                                            name={`internal-${rowIndex}`}
                                            value={{ value: row.InternalTempId, label: row.InternalTempName }}
                                            options={[
                                                { value: "", label: "Select Internal Template" },
                                            ]}
                                            onChange={(e: any) => {
                                                const updateData = [...alertData];
                                                const idx = updateData.findIndex((items: any) => items.Seq === row.Seq && items.TranCode === row.TranCode);
                                                if (idx !== -1) {
                                                    updateData[idx].InternalTempName = e.label;
                                                    updateData[idx].InternalTempId = e.value;
                                                    setAlertData(updateData);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div>{row.InternalTempName}</div>
                                    )}
                                </>
                            )}

                            {/* --- External Template Column --- */}
                            {column.field === "External" && (
                                <>
                                    {editRow[rowIndex] ? (
                                        <SelectField
                                            placeholder='Templates'
                                            name={`external-${rowIndex}`}
                                            value={{ value: row.ExternalTempId, label: row.ExternalTempName }}
                                            options={[
                                                { value: "", label: "Select External Template" },
                                            ]}
                                            onChange={(e: any) => {
                                                const updateData = [...alertData];
                                                const idx = updateData.findIndex((items: any) => items.Seq === row.Seq && items.TranCode === row.TranCode);
                                                if (idx !== -1) {
                                                    updateData[idx].ExternalTempName = e.label;
                                                    updateData[idx].ExternalTempId = e.value;
                                                    setAlertData(updateData);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div>{row.ExternalTempName}</div>
                                    )}
                                </>
                            )}

                            {/* --- Internal Status Toggle --- */}
                            {column.field === "InternalTempStatus" && (
                                <ToggleSwitch
                                    checked={row.InternalTempStatus === "Y"}
                                    disabled={!editRow[rowIndex]}
                                    className="d-flex justify-content-center"
                                    onChange={(e: any) => {
                                        const updateData = [...alertData];
                                        const idx = updateData.findIndex((item: any) => item.Seq === row.Seq && item.TranCode === row.TranCode);
                                        if (idx !== -1) {
                                            updateData[idx].InternalTempStatus = e.target.checked ? "Y" : "N";
                                        }
                                    }}
                                />
                            )}

                            {/* --- External Status Toggle --- */}
                            {column.field === "ExternalTempStatus" && (
                                <ToggleSwitch
                                    checked={row.ExternalTempStatus === "Y"}
                                    disabled={!editRow[rowIndex]}
                                    className="d-flex justify-content-center"
                                    onChange={(e: any) => {
                                        const updateData = [...alertData];
                                        const idx = updateData.findIndex((item: any) => item.Seq === row.Seq && item.TranCode === row.TranCode);
                                        if (idx !== -1) {
                                            updateData[idx].ExternalTempStatus = e.target.checked ? "Y" : "N";
                                        }
                                    }}
                                />
                            )}

                            {/* --- Central Row Action Actions Column --- */}
                            {column.field === "actions" && (
                                <div className="d-flex gap-2 justify-content-center">
                                    {editRow[rowIndex] ? (
                                        <Button variant="save" title="Save" className="btn-sm rounded-circle" onClick={() => commitRowSavings(rowIndex)}>
                                            <Save size={14} />
                                        </Button>
                                    ) : (
                                        <Button variant="edit" title="Edit" className="btn-sm rounded-circle" onClick={() => startEditingRow(rowIndex)}>
                                            <Edit size={14} />
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* --- Default Fallback Field Renderer --- */}
                            {column.field !== "Label" &&
                                column.field !== "Internal" &&
                                column.field !== "External" &&
                                column.field !== "InternalTempStatus" &&
                                column.field !== "ExternalTempStatus" &&
                                column.field !== "actions" &&
                                row[column.field as keyof any]}
                        </>
                    );
                }}
            </Datatable>
        </>
    )
}

export default MailSMSTemplateMappingTbl;
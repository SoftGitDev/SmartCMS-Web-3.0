import React, { JSX } from 'react'
import { Datatable } from '../../../common/components/ui/DataTable/Datatable'
import { tableColumnProps } from '../../../services/type';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import Datepicker from '../../../common/components/ui/datePicker/Datepicker';
import { Button } from 'react-bootstrap';
import { CirclePlus, Trash } from 'lucide-react';



const columns: tableColumnProps[] = [
    {
        field: 'trnRefNo',
        header: 'Trn. Ref. No.',
        sorting: false,
        align: 'center',
    },
    {
        field: 'trnDate',
        header: 'Trn. Date',
        sorting: true,
    },
    {
        field: 'amount',
        header: 'Amount',
        sorting: true,
    },
    {
        field: 'action',
        header: 'Action',
        sorting: true,
    },

];

interface TransactionLogTblProps {
    values: any,
    handleChange: any
    remove: any
    push: any
    transcationDtl: any
}

const TransactionLogTbl: React.FC<TransactionLogTblProps> = ({ transcationDtl, values, handleChange, remove, push }) => {
    return (
        <>
            <Datatable
                data={transcationDtl}
                columns={columns}
                style={{ height: "calc(-465px + 100vh)", overflow: "auto", }}
                footerSection={<Button variant="outline-primary" size="sm" type="button" onClick={() => push({ TranRefNo: "", TranAmount: "", TranDate: "" })}>
                    <CirclePlus size={16} className="me-1" /> Add Record
                </Button>}
            >
                {(child: { row: any, column: tableColumnProps, rowIndex: number }): JSX.Element => (
                    <>
                        {child.column.field === 'trnRefNo' &&

                            <Textfield
                                type="text"
                                className="form-control 
                                 form-control-sm"
                                name={`transcationDtl.${child.rowIndex}.TranRefNo`}
                                value={values.transcationDtl[child.rowIndex].TranRefNo}
                                onChange={handleChange}
                                placeholder="Ref Number"
                            />

                        }

                        {child.column.field === 'trnDate' &&
                            <Datepicker
                                className="form-control form-control-sm"
                                name={`transcationDtl.${child.rowIndex}.TranDate`}
                                value={values.transcationDtl[child.rowIndex].TranDate}
                                onChange={handleChange}
                            />

                        }

                        {child.column.field === 'amount' &&
                            <Textfield
                                type="number"
                                className="form-control form-control-sm text-end"
                                name={`transcationDtl.${child.rowIndex}.TranAmount`}
                                value={values.transcationDtl[child.rowIndex].TranAmount}
                                onChange={handleChange} placeholder="0.00"
                            />

                        }

                        {child.column.field === 'action' &&
                            <Button variant="link" className="text-danger p-0" disabled={values.transcationDtl.length === 1} onClick={() => remove(child.rowIndex)}>
                                <Trash size={16} />
                            </Button>
                        }

                        {

                            child.column.field !== "trnRefNo" &&
                            child.column.field !== "trnDate" &&
                            child.column.field !== "amount" &&
                            child.column.field !== "action" &&
                            child.row[child.column.field as keyof any]}
                    </>
                )}
            </Datatable>
        </>
    )
}

export default TransactionLogTbl
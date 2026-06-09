import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import Checkbox from "../../../common/components/ui/checkBox/Checkbox";
import { CornerDownRightIcon, LayoutDashboard } from "lucide-react";
import noDataFound from '../../../assets/images/commone/NoDatafound.png'


const columns: any = [
    {
        field: 'DepartmentName',
        header: 'Departments & Users'
    },
];

type departmentWisePermission = {
    heading?: string;
    data: any,
    setFieldValue: any,
    values: any,
};

const DepartmentWiseCategoryAssignTbl: React.FC<departmentWisePermission> = ({ heading, data, setFieldValue, values }) => {

    useEffect(() => {
        setFieldValue('assignedCategory', data);
    }, [data]);

    return (
        <div>
            {heading &&
                <h1 className="text-base mb-0">{heading}</h1>
            }

            <div className="dataTables_scroll">
                <div className="dataTables_scrollHead">
                    <div className="dataTables_scrollHeadInner fixed-TableHeader mt-2 border rounded" style={{ height: "calc(100vh - 327px)" }}>
                        <Table hover responsive="sm" className="mb-0 categoryAssign-table">
                            <thead >
                                {columns.map((column: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <th className="bg-light">
                                                <div className="d-flex  justift-content-between text-slate-700">
                                                    {column.header}
                                                </div>
                                            </th>
                                            <th className="bg-light">
                                                <Checkbox
                                                    onChange={(e: any) => {
                                                        var newValaue = [...values.assignedCategory]
                                                        values.assignedCategory.map((row: any, rowIndex: number) => {

                                                            if (e.target.checked) {
                                                                newValaue[rowIndex].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                row.UserList.map((items: any, id: any) => {
                                                                    newValaue[rowIndex].UserList[id].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                });
                                                            } else {
                                                                newValaue[rowIndex].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                row.UserList.map((items: any, id: any) => {
                                                                    newValaue[rowIndex].UserList[id].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                });
                                                            }
                                                        });
                                                        setFieldValue('assignedCategory', newValaue);
                                                    }}
                                                />
                                            </th>
                                        </tr>
                                    );
                                })}
                            </thead>
                            <tbody>
                                {values.assignedCategory.map((row: any, rowIndex: number) => {
                                    return (
                                        <React.Fragment key={rowIndex}>
                                            <tr>
                                                {columns.map((column: any, colIndex: number) => {
                                                    return (
                                                        <React.Fragment key={colIndex}>
                                                            <td className='data-cell text-sm text-primary bg-primary-50'><LayoutDashboard size={15} className="text-primary" /> {row[column.field]}</td>

                                                            <td className='data-cell text-sm bg-primary-50'>
                                                                <Checkbox
                                                                    value={row.AssignFlag}
                                                                    checked={row.AssignFlag === 'Y'}
                                                                    onChange={(e: any) => {
                                                                        var newValaue = [...values.assignedCategory]
                                                                        newValaue[rowIndex].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                        if (row.AssignFlag === 'Y') {
                                                                            row.UserList.map((items: any, id: any) => {
                                                                                newValaue[rowIndex].UserList[id].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                            });
                                                                        } else {
                                                                            row.UserList.map((items: any, id: any) => {
                                                                                newValaue[rowIndex].UserList[id].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                            });
                                                                        }
                                                                        setFieldValue('assignedCategory', newValaue);
                                                                    }}
                                                                />
                                                            </td>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </tr>

                                            {row.UserList.map((items: any, id: any) => (
                                                <tr key={id} >
                                                    {columns.map((column: any, colIndex: number) => {
                                                        return (
                                                            <React.Fragment key={colIndex}>
                                                                <td className='px-4 data-cell text-sm'>
                                                                    {column.field === "DepartmentName" && (
                                                                        <>
                                                                            <CornerDownRightIcon size={15} />   {items.UserName}
                                                                        </>
                                                                    )}
                                                                    {column.field !== "DepartmentName" && items[column.field]}
                                                                </td>

                                                                <td >
                                                                    <Checkbox
                                                                        value={items.AssignFlag}
                                                                        checked={items.AssignFlag === 'Y'}
                                                                        onChange={(e: any) => {
                                                                            var newValaue = [...values.assignedCategory]
                                                                            newValaue[rowIndex].UserList[id].AssignFlag = e.target.checked ? 'Y' : 'N';
                                                                            setFieldValue('assignedCategory', newValaue);
                                                                        }}
                                                                    />
                                                                </td>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </Table>

                        <div>
                            {values.assignedCategory.length === 0 && <div className="d-flex align-items-center justify-content-center" style={{ height: '40vh' }}>
                                <div>
                                    <img src={noDataFound} alt="no data found" style={{ width: 200 }} />
                                    <h1 className="text-base text-center">No category found</h1>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default DepartmentWiseCategoryAssignTbl;

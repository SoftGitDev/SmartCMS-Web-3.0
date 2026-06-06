import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';

import * as urls from "../../../services/axios/url";
import { DetailsArrayChangeCheck } from './ArrayChangeCheck';
import toastNotify from '../../../services/notification/tostNotify';
import { apiRequest } from '../../../services/api/apiRequest';
import { CheckCircle, Loader2 } from 'lucide-react';
import DepartmentWiseCategoryAssignTbl from './DepartmentWiseCategoryAssignTbl';


interface categoryWiseTicketAssignProps {
    isAssignCategoryMdl: boolean;
    setIsAssignCategoryMdl: React.Dispatch<React.SetStateAction<boolean>>;
    departmentList: any;
    formData: any;
    setDepartmentList: any;
    selectedData: any;
    setSelectedData: any;
}

const CategoryWiseTicketAssignMdl: React.FC<categoryWiseTicketAssignProps> = ({ isAssignCategoryMdl, setIsAssignCategoryMdl, departmentList, formData, setDepartmentList, selectedData, setSelectedData }) => {

    const [isLoader, setIsLoader] = useState<boolean>(false);

    const initialValues = {
        assignedCategory: [],
    };


    const updateAssignedCategory = async (val: any, resetForm: any) => {
        const newCategoryAssign: any = [];
        for (let i = 0; i < val.assignedCategory.length; i++) {
            for (let j = 0; j < val.assignedCategory[i].UserList.length; j++) {
                newCategoryAssign.push({
                    Status: val.assignedCategory[i].UserList[j].AssignFlag,
                    AssignFlag: val.assignedCategory[i].UserList[j].ExistingFlag,
                    AssignUserId: val.assignedCategory[i].UserList[j].AssignUserId,
                    DeleteFlag: val.assignedCategory[i].UserList[j].AssignFlag === "N" && val.assignedCategory[i].UserList[j].ExistingFlag === "Y" ? "Y" : "N"
                })
            }
        }

        if (newCategoryAssign.length !== 0) {
            try {
                if (DetailsArrayChangeCheck(val.assignedCategory, formData)) {
                    return toastNotify("You have not made any changes.", 'error');
                }
                setIsLoader(true);
                const payload = {
                    CategoryCode: selectedData.categoryCd,
                    SubCategoryCode: selectedData.subCategoryCd,
                    Detail: newCategoryAssign
                };
                const config = {};
                // setUserTicketAutoAssign
                const result = await apiRequest("POST", urls, payload, config)
                if (result.STATUS === '0') {
                    toastNotify(result.MESSAGE, 'success');
                    setDepartmentList([]);
                    resetForm();
                    setIsAssignCategoryMdl(!isAssignCategoryMdl);
                } else {
                    toastNotify(result.MESSAGE, 'error');
                }
            } catch (error: any) {

            } finally {
                setIsLoader(false);
            }
        }
    };

    const assignedCategory = [
        {
            DepartmentName: "Human Resources",
            AssignFlag: "Y",
            UserList: [
                {
                    UserName: "John Smith",
                    AssignFlag: "Y",
                },
                {
                    UserName: "Sarah Johnson",
                    AssignFlag: "N",
                },
                {
                    UserName: "Michael Brown",
                    AssignFlag: "Y",
                },
            ],
        },
        {
            DepartmentName: "Information Technology",
            AssignFlag: "N",
            UserList: [
                {
                    UserName: "David Wilson",
                    AssignFlag: "N",
                },
                {
                    UserName: "Emily Davis",
                    AssignFlag: "N",
                },
                {
                    UserName: "James Anderson",
                    AssignFlag: "Y",
                },
            ],
        },
        {
            DepartmentName: "Finance",
            AssignFlag: "Y",
            UserList: [
                {
                    UserName: "Robert Taylor",
                    AssignFlag: "Y",
                },
                {
                    UserName: "Jessica Moore",
                    AssignFlag: "Y",
                },
            ],
        },
        {
            DepartmentName: "Sales & Marketing",
            AssignFlag: "N",
            UserList: [
                {
                    UserName: "William Thomas",
                    AssignFlag: "N",
                },
                {
                    UserName: "Jennifer White",
                    AssignFlag: "Y",
                },
                {
                    UserName: "Christopher Harris",
                    AssignFlag: "N",
                },
                {
                    UserName: "Lisa Martin",
                    AssignFlag: "Y",
                },
            ],
        },
    ];

    return (
        <Modal
            show={isAssignCategoryMdl}
            onHide={() => { setIsAssignCategoryMdl(!isAssignCategoryMdl) }}
            backdrop="static"
            keyboard={false}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-base'>Ticket auto assign to users</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    updateAssignedCategory(values, resetForm)
                }}
            >
                {({ values, handleSubmit, setFieldValue }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <DepartmentWiseCategoryAssignTbl
                                    data={assignedCategory}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="light" onClick={() => setIsAssignCategoryMdl(!isAssignCategoryMdl)} > Close</Button>
                                <Button
                                    type="submit"
                                    disabled={isLoader}
                                >
                                    {!isLoader ? (
                                        <>
                                            <CheckCircle className="me-1" />
                                            Update
                                        </>
                                    ) : (
                                        <>
                                            <Loader2 className="icon-loader text-white text-lg me-1" />
                                            Loading...
                                        </>
                                    )}
                                </Button>
                            </Modal.Footer>
                        </form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default CategoryWiseTicketAssignMdl
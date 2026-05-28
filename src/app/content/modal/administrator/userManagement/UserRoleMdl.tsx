// Purpose: User Role module 
// Created by: Harish 
// Created Date: 25-05-2026


import { ErrorMessage, Form, Formik } from 'formik'
import { UserCog } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Textfield from '../../../../components/ui/TextField/TextInput'
import * as Yup from 'yup';
import RadioBtn from '../../../../components/ui/Radio/RadioBtn'
import LoaderUI from '../../../../components/loader/Loader'
import UserPermissionTbl from '../../../table/administrator/UserPermissionTbl'


interface UserRoleMdlProps {
    show: boolean
    handleClose: () => void
    editedData: any
}
const UserRoleMdl: React.FC<UserRoleMdlProps> = ({ show, handleClose, editedData }) => {

    const editUserRole = (data: any) => {
        console.log('Edit Data', data);
    }

    const addUserRole = (data: any) => {
        console.log('Edit Data', data);
    }

    const [isLoader, setIsLoader] = useState<boolean>(false);
    // const [userRolePermission, setUserRolePermission] = useState<any[]>([]);
    const [updateRoleForm, setUpdateRoleForm] = useState<any | object>(editUserRole || {});

    const userRolePermission = [
        {
            formCaption: "Dashboard",
            icon: "LayoutDashboard",
            path: "/dashboard",

            formView: "Y",
            formSave: "N",
            formUpdate: "N",
            formDelete: "N",
            formCopy: "N",
            formCut: "N",
            formPaste: "N",
            formRightClick: "N",

            permissionView: "N",
            permissionsave: "N",
            permissionUpdate: "N",
            permissionDelete: "N",
            permissionCopy: "N",
            permissionCut: "N",
            permissionPaste: "N",
            permissionRightClick: "N",

            submoduleList: [],
        },

        {
            formCaption: "Master",
            icon: "Database",
            path: "/master",

            formView: "Y",
            formSave: "Y",
            formUpdate: "Y",
            formDelete: "Y",
            formCopy: "Y",
            formCut: "Y",
            formPaste: "Y",
            formRightClick: "Y",

            permissionView: "N",
            permissionsave: "N",
            permissionUpdate: "N",
            permissionDelete: "N",
            permissionCopy: "N",
            permissionCut: "N",
            permissionPaste: "N",
            permissionRightClick: "N",

            submoduleList: [
                {
                    formCaption: "Branch",
                    path: "/branch-master",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "User",
                    path: "/user-master",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "User Role",
                    path: "/user-role",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "User Permission",
                    path: "/user-permission",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "Organization",
                    path: "/organization",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "Exception Matrix",
                    path: "/exception-matrix",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
            ],
        },

        {
            formCaption: "Miscellaneous",
            icon: "Layers3",
            path: "/miscellaneous",

            formView: "Y",
            formSave: "Y",
            formUpdate: "Y",
            formDelete: "Y",
            formCopy: "Y",
            formCut: "Y",
            formPaste: "Y",
            formRightClick: "Y",

            permissionView: "N",
            permissionsave: "N",
            permissionUpdate: "N",
            permissionDelete: "N",
            permissionCopy: "N",
            permissionCut: "N",
            permissionPaste: "N",
            permissionRightClick: "N",

            submoduleList: [
                {
                    formCaption: "Service Assign",
                    path: "/service-assign",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "Department",
                    path: "/department",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "Mail SMS Template",
                    path: "/mail-sms-template",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "Y",
                    formCopy: "Y",
                    formCut: "Y",
                    formPaste: "Y",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
            ],
        },

        {
            formCaption: "Ticket",
            icon: "Ticket",
            path: "/ticket",

            formView: "Y",
            formSave: "Y",
            formUpdate: "Y",
            formDelete: "N",
            formCopy: "Y",
            formCut: "N",
            formPaste: "N",
            formRightClick: "Y",

            permissionView: "N",
            permissionsave: "N",
            permissionUpdate: "N",
            permissionDelete: "N",
            permissionCopy: "N",
            permissionCut: "N",
            permissionPaste: "N",
            permissionRightClick: "N",

            submoduleList: [
                {
                    formCaption: "All Ticket",
                    path: "/all-ticket",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "N",
                    formCopy: "Y",
                    formCut: "N",
                    formPaste: "N",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
                {
                    formCaption: "Department Ticket",
                    path: "/department-ticket",

                    formView: "Y",
                    formSave: "Y",
                    formUpdate: "Y",
                    formDelete: "N",
                    formCopy: "Y",
                    formCut: "N",
                    formPaste: "N",
                    formRightClick: "Y",

                    permissionView: "N",
                    permissionsave: "N",
                    permissionUpdate: "N",
                    permissionDelete: "N",
                    permissionCopy: "N",
                    permissionCut: "N",
                    permissionPaste: "N",
                    permissionRightClick: "N",
                },
            ],
        },
    ];

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Formik
                    initialValues={{
                        roleNm: editedData?.roleNm || '',
                        roleType: editedData?.roleType || 'Admin',
                    }}
                    validationSchema={Yup.object().shape({
                        roleNm: Yup.string().required('Role Name is required'),
                        roleType: Yup.string().required('Role Type is required'),
                    })}
                    onSubmit={(values) => {
                        if (editedData) {
                            editUserRole(values);
                        } else {
                            addUserRole(values);
                        }
                    }}
                >
                    {({ values, setFieldValue, handleBlur, handleChange, handleSubmit, }) =>
                    (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title className='w-100'>
                                    <div className='d-flex align-items-start'>
                                        <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0, }} >
                                            <UserCog className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>
                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit User Role' : 'Create New Role'}
                                            </h6>
                                            <p className="text-secondary text-xs mb-0">
                                                Configure user Role prmission and acess screen and module
                                            </p>
                                        </div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col md={4}>
                                        <Textfield
                                            placeholder='Enter a user role name'
                                            id='roleNm'
                                            label='Role Name'
                                            name='roleNm'
                                            required
                                            value={values.roleNm}
                                            maxLength={20}
                                            type='text'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        <ErrorMessage name="roleNm" className="ErrorMessage" component="div" />
                                    </Col>
                                    <Col>
                                        <label className='text-sm text-muted'>
                                            Role Type : -
                                        </label>
                                        <div className='d-flex gap-3'>
                                            <RadioBtn
                                                label='Admin'
                                                id='roleTypeAdmin'
                                                name='roleType'
                                                value='Admin'
                                                checked={values.roleType === 'Admin'}
                                                onChange={handleChange}
                                            />
                                            <RadioBtn
                                                label='User'
                                                id='roleTypeUser'
                                                name='roleType'
                                                value='User'
                                                checked={values.roleType === 'User'}
                                                onChange={handleChange}
                                            />
                                            <RadioBtn
                                                label='HOD'
                                                id='roleTypeHod'
                                                name='roleType'
                                                value='HOD'
                                                checked={values.roleType === 'HOD'}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <ErrorMessage name="roleType" className="ErrorMessage" component="div" />
                                    </Col>
                                </Row>

                                {userRolePermission.length !== 0 &&
                                    <div className='mt-4'>
                                        <Suspense fallback={<LoaderUI />}>
                                            <UserPermissionTbl
                                                heading='Menu Permission'
                                                data={userRolePermission}
                                                setFieldValue={setFieldValue}
                                                values={values}
                                            />
                                        </Suspense>
                                    </div>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="light" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary">Submit</Button>
                            </Modal.Footer>
                        </Form>
                    )
                    }
                </Formik>
            </Modal >
        </>
    )
}
export default UserRoleMdl
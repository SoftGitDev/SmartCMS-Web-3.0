// Purpose: User Add edit module screen
// Created by: Harish
// Created Date: 25-05-2026

import { ErrorMessage, Form, Formik } from 'formik'
import { User2Icon } from 'lucide-react'
import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import * as Yup from 'yup';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import NoteUI from '../../../services/storage/NoteUI';
import { UserAddNote } from '../../../services/storage/note';



interface UserMdlProps {
    show: boolean
    handleClose: () => void
    editedData?: any
}

const roleOptions = [
    { label: 'Administrator', value: 'administrator' },
    { label: 'Manager', value: 'manager' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Operator', value: 'operator' },
];

const departmentOptions = [
    { label: 'IT Department', value: 'it' },
    { label: 'Operations', value: 'operations' },
    { label: 'Finance', value: 'finance' },
    { label: 'Customer Support', value: 'support' },
];

const UserMdl: React.FC<UserMdlProps> = ({ show, handleClose, editedData }) => {

    const initialValues: any = {
        username: editedData?.username || '',
        role: editedData?.role || '',
        department: editedData?.department || '',
        firstName: editedData?.firstName || '',
        lastName: editedData?.lastName || '',
        mobileNo: editedData?.mobileNo || '',
        emailId: editedData?.emailId || '',
        seniorEmail1: editedData?.seniorEmail1 || '',
        seniorEmail2: editedData?.seniorEmail2 || '',
        seniorEmail3: editedData?.seniorEmail3 || '',
        isServiceAccess: editedData?.isServiceAccess || '',
    };

    const UserValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),

        role: Yup.string()
            .required('User Role is required'),

        department: Yup.string()
            .required('Department is required'),

        firstName: Yup.string()
            .required('First Name is required'),

        mobileNo: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits')
            .required('Mobile Number is required'),

        emailId: Yup.string()
            .email('Invalid Email Id')
            .required('Email Id is required'),
    });

    const addUser = (values: any) => {
        console.log('Add User => ', values);
    };

    const editUser = (values: any) => {
        console.log('Edit User => ', values);
    };

    // Tab Index auto manage
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

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
                    initialValues={initialValues}
                    validationSchema={UserValidationSchema}
                    onSubmit={(values) => {
                        if (editedData) {
                            editUser(values);
                        } else {
                            addUser(values);
                        }
                    }}
                >
                    {({ values, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
                        <Form onSubmit={handleSubmit}>
                            {/* Header */}
                            <Modal.Header closeButton>
                                <Modal.Title className='w-100'>
                                    <div className='d-flex align-items-start'>
                                        <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0, }} >
                                            <User2Icon className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>

                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit User Details' : 'Create New User'}
                                            </h6>

                                            <p className="text-secondary text-xs mb-0">
                                                Configure user profile, roles, department access,
                                                and communication details.
                                            </p>
                                        </div>

                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            {/* Body */}
                            <Modal.Body>
                                <Row >
                                    {/* Left Section */}
                                    <Col md={8}>
                                        {/* User Details */}
                                        <fieldset className="border rounded-2  p-3 bg-white mb-3">
                                            <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                                                User <span className="text-primary">Information</span>
                                            </legend>
                                            <Row className='g-3'>
                                                <Col md={6}>
                                                    <Textfield
                                                        label='Username'
                                                        required
                                                        name='username'
                                                        maxLength={40}
                                                        value={values.username}
                                                        placeholder='Enter Username'
                                                        type='text'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage name="username" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={6}>
                                                    <SelectField
                                                        label='User Role'
                                                        required
                                                        name='role'
                                                        placeholder='Select User Role'
                                                        options={roleOptions}
                                                        value={
                                                            roleOptions.find(
                                                                (option) => option.value === values.role
                                                            )
                                                        }
                                                        onChange={(selected: any) => {
                                                            setFieldValue('role', selected?.value);
                                                        }}
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                    />

                                                    <ErrorMessage name="role" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={12}>
                                                    <SelectField
                                                        label='Department'
                                                        required
                                                        name='department'
                                                        placeholder='Select Department'
                                                        options={departmentOptions}
                                                        isMulti
                                                        value={
                                                            departmentOptions.find(
                                                                (option) => option.value === values.department
                                                            )
                                                        }
                                                        onChange={(selected: any) => {
                                                            setFieldValue('department', selected?.value);
                                                        }}
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="department" className="ErrorMessage" component="div" />
                                                </Col>
                                            </Row>
                                        </fieldset>

                                        {/* Contact Details */}
                                        <fieldset className="border rounded-2 mt-2 p-3 bg-white mb-3">
                                            <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                                                Contact <span className="text-primary">Details</span>
                                            </legend>
                                            <Row className='g-3'>
                                                <Col md={6}>
                                                    <Textfield
                                                        label='First Name'
                                                        required
                                                        name='firstName'
                                                        value={values.firstName}
                                                        placeholder='Enter First Name'
                                                        type='text'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />

                                                    <ErrorMessage name="firstName" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={6}>
                                                    <Textfield
                                                        label='Last Name'
                                                        name='lastName'
                                                        value={values.lastName}
                                                        placeholder='Enter Last Name'
                                                        type='text'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </Col>

                                                <Col md={6}>
                                                    <Textfield
                                                        label='Mobile No.'
                                                        required
                                                        name='mobileNo'
                                                        value={values.mobileNo}
                                                        placeholder='Enter Mobile Number'
                                                        type='text'
                                                        maxLength={10}
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />

                                                    <ErrorMessage name="mobileNo" className="ErrorMessage" component="div" />
                                                </Col>

                                                <Col md={6}>
                                                    <Textfield
                                                        label='Email Id'
                                                        required
                                                        name='emailId'
                                                        value={values.emailId}
                                                        placeholder='Enter Email Id'
                                                        type='email'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />

                                                    <ErrorMessage name="emailId" className="ErrorMessage" component="div" />
                                                </Col>

                                            </Row>
                                        </fieldset>

                                        {/* Senior Levels */}
                                        <fieldset className="border rounded-2 mt-2 p-3 bg-white mb-3">
                                            <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                                                Senior <span className='text-primary'> Levels</span>
                                            </legend>
                                            <Row className='g-3'>
                                                <Col md={6}>
                                                    <Textfield
                                                        label='Email Id 1'
                                                        name='seniorEmail1'
                                                        value={values.seniorEmail1}
                                                        placeholder='Enter Email Id 1'
                                                        type='email'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </Col>

                                                <Col md={6}>
                                                    <Textfield
                                                        label='Email Id 2'
                                                        name='seniorEmail2'
                                                        value={values.seniorEmail2}
                                                        placeholder='Enter Email Id 2'
                                                        type='email'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </Col>

                                                <Col md={6}>
                                                    <Textfield
                                                        label='Email Id 3'
                                                        name='seniorEmail3'
                                                        value={values.seniorEmail3}
                                                        placeholder='Enter Email Id 3'
                                                        type='email'
                                                        tabIndex={getNextTabIndex()}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </fieldset>

                                        {/* Public Access for Service */}
                                        <Checkbox
                                            label='Public Access for Service'
                                            name='isServiceAccess'
                                            value={values.isServiceAccess}
                                            onChange={handleChange}
                                        />
                                    </Col>


                                    {/* Right Note Section */}
                                    <Col >
                                        <div className="d-none d-md-block">
                                            <NoteUI data={UserAddNote} />
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            {/* Footer */}

                            <Modal.Footer>
                                <Button variant="light" onClick={handleClose}>
                                    Close
                                </Button>

                                <Button variant="primary" type='submit'>
                                    {editedData ? 'Update' : 'Submit'}
                                </Button>
                            </Modal.Footer>

                        </Form>
                    )}
                </Formik>
            </Modal >
        </>
    )
}

export default UserMdl
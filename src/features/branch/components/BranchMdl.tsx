// Purpose: Branch Add Edit Modal
// Created by: Harish
// Created Date: 25-05-2026

import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { GitBranchIcon } from 'lucide-react';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import { BranchNote } from '../../../services/storage/note';
import NoteUI from '../../../services/storage/NoteUI';


interface BranchMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

interface BranchFormValues {
    branchCode: string;
    branchName: string;
    address: string;
    mobileNo: string;
    emailId: string;
}

const BranchMdl: React.FC<BranchMdlProps> = ({ show, handleClose, editedData, }) => {

    const initialValues: BranchFormValues = {
        branchCode: editedData?.branchCode || '',
        branchName: editedData?.branchName || '',
        address: editedData?.address || '',
        mobileNo: editedData?.mobileNo || '',
        emailId: editedData?.emailId || '',
    };

    const branchValidationSchema = Yup.object().shape({
        branchCode: Yup.string().required('Branch Code is required'),
        branchName: Yup.string().required('Branch Name is required'),
        address: Yup.string().required('Address is required'),
        mobileNo: Yup.string().matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits').required('Mobile Number is required'),
        emailId: Yup.string().email('Invalid Email Id').required('Email Id is required'),
    });

    const addBranch = (values: BranchFormValues) => {
        console.log('Add Branch => ', values);
    };

    const editBranch = (values: BranchFormValues) => {
        console.log('Edit Branch => ', values);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={branchValidationSchema}
                onSubmit={(values) => {
                    if (editedData) {
                        editBranch(values);
                    } else {
                        addBranch(values);
                    }
                }}
            >
                {({ values, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title className='w-100'>
                                <div className='d-flex align-items-start'>
                                    <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0, }} >
                                        <GitBranchIcon className='text-primary' size={22} strokeWidth={2.2} />
                                    </div>
                                    <div>
                                        <h6 className="fw-semibold text-dark mb-1">
                                            {editedData ? 'Edit Branch Details' : 'Create New Branch'}
                                        </h6>
                                        <p className="text-secondary text-xs mb-0">
                                            Manage branch information, contact details, operational setup,
                                            and organizational location configuration.
                                        </p>
                                    </div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Row className="g-2">
                                        <Col md={6}>
                                            <Textfield
                                                label="Branch Code"
                                                required
                                                name="branchCode"
                                                type='text'
                                                placeholder="Enter Branch Code"
                                                value={values.branchCode}
                                                onChange={(e) => {
                                                    const regex = /^[A-Za-z0-9]*$/;
                                                    if (regex.test(e.target.value
                                                    )) {
                                                        setFieldValue('branchCode', e.target.value.toUpperCase());
                                                    }
                                                }}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name="branchCode" component="div" className="ErrorMessage" />

                                        </Col>

                                        <Col md={6}>
                                            <Textfield
                                                label="Branch Name"
                                                required
                                                type='text'
                                                name="branchName"
                                                placeholder="Enter Branch Name"
                                                value={values.branchName}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    const regex = /^[A-Za-z\s]*$/;
                                                    if (regex.test(e.target.value)) {
                                                        setFieldValue('branchName', e.target.value);
                                                    }
                                                }}
                                            />
                                            <ErrorMessage name="branchName" component="div" className="ErrorMessage" />

                                        </Col>

                                        <Col md={12}>
                                            <Textfield
                                                label="Address"
                                                name="address"
                                                required
                                                type='text'
                                                placeholder="Enter Address"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name="address" component="div" className="ErrorMessage" />

                                        </Col>

                                        <Col md={6}>
                                            <Textfield
                                                label="Mobile No."
                                                name="mobileNo"
                                                type='text'
                                                required
                                                placeholder="Enter Mobile Number"
                                                value={values.mobileNo}
                                                // onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={10}
                                                onChange={(e) => {
                                                    const regex = /^[0-9]*$/;
                                                    if (regex.test(e.target.value)) {
                                                        setFieldValue('mobileNo', e.target.value);
                                                    }
                                                }}
                                            />
                                            <ErrorMessage name="mobileNo" component="div" className="ErrorMessage" />
                                        </Col>

                                        <Col md={6}>
                                            <Textfield
                                                label="Email Id"
                                                name="emailId"
                                                type='email'
                                                required

                                                placeholder="Enter Email Id"
                                                value={values.emailId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name="emailId" component="div" className="ErrorMessage" />
                                        </Col>
                                    </Row>
                                </Col>
                                {/* Note UI */}
                                <Col md={5}>
                                    <div className="d-none d-md-block">
                                        <NoteUI data={BranchNote} />
                                    </div>
                                </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={handleClose} >
                                Cancel
                            </Button>

                            <Button variant="primary" type="submit">
                                {editedData ? 'Update' : 'Save'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
};

export default BranchMdl;
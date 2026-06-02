// Purpose: Form Mapping   modal 
// Created by: Harish
// Created Date: 01-06-2026

import { Formik, Form, ErrorMessage } from 'formik';
import { LucideListChecks } from 'lucide-react';
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Textfield from '../../../components/ui/TextField/TextInput';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import FormPermissionTbl from '../../table/miscellaneous.tsx/FormPermissionTbl';


interface FormMappingMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const FormMappingMdl: React.FC<FormMappingMdlProps> = ({ show, handleClose, editedData }) => {
    const [selectData, setSelectData] = useState<any>()

    // Form submission handlers
    const addFormMappingMdl = (values: any) => {
        console.log('Add Department => ', values);
    };

    const editFormMappingMdl = (values: any) => {
        console.log('Edit Department => ', values);
    };


    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Formik
                    // Initial values mapped cleanly to database keys and fallback states
                    initialValues={{
                        category: editedData?.category || '',
                        subcategory: editedData?.subcategory || '',
                        columns: editedData?.columns || '',
                        subcolumns: editedData?.subcolumns || '',
                    }}
                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        category: Yup.string().required('Category is required'),
                        subcategory: Yup.string().required('Sub Category  is required'),
                        columns: Yup.string().required('columns  is required'),
                        subcolumns: Yup.string().required('Sub columns  is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editFormMappingMdl(values);
                        } else {
                            addFormMappingMdl(values);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>

                            {/* Modal Header */}
                            <Modal.Header closeButton>
                                <Modal.Title className='w-100'>
                                    <div className='d-flex align-items-start'>
                                        <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0 }} >
                                            <LucideListChecks className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>
                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit Sub-Category' : 'Create New Sub-Category'}
                                            </h6>
                                            <p className="text-secondary text-sm mb-0">
                                                FormMappingMdl
                                            </p>
                                        </div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>

                            {/* Modal Body */}
                            <Modal.Body>
                                <Row>
                                    <Col md={8}>
                                        <Row>
                                            <Col md={6} className='mb-3'>
                                                <SelectField
                                                    label='Category'
                                                    value={values.category}
                                                    name='category'
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Select Category  '
                                                />
                                                <ErrorMessage name="category" className="ErrorMessage" component="div" />
                                            </Col>
                                            {/* Sub category */}
                                            <Col md={6} className='mb-3'>
                                                <SelectField
                                                    label='Sub Category'
                                                    value={values.subcategory}
                                                    name='subcategory'
                                                    required
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Select  Sub Category  '
                                                />
                                                <ErrorMessage name="subcategory" className="ErrorMessage" component="div" />
                                            </Col>
                                        </Row>

                                        <fieldset>
                                            <legend className='text-sm text-primary'>Columns Details</legend>
                                            <Row>
                                                <Col md={6} className='mb-3'>
                                                    <SelectField
                                                        label='Columns'
                                                        value={values.columns}
                                                        name='columns'
                                                        required
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='Select columns  '
                                                    />
                                                    <ErrorMessage name="columns" className="ErrorMessage" component="div" />
                                                </Col>
                                                {/* Sub category */}
                                                <Col md={6} className='mb-3'>
                                                    <SelectField
                                                        label='Sub Columns'
                                                        value={values.subcolumns}
                                                        name='subcolumns'
                                                        required
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder='Select  Sub Columns  '
                                                    />
                                                    <ErrorMessage name="subcolumns" className="ErrorMessage" component="div" />
                                                </Col>
                                            </Row>
                                        </fieldset>

                                        {/* Table */}
                                        <FormPermissionTbl
                                            selectData={selectData}
                                            setSelectData={setSelectData}
                                        />

                                    </Col>

                                    {/* Sidebar Guidance Notes */}
                                    {/* <Col md={5}>
                                        <Note data={SubCategoryMdlNote} />
                                    </Col> */}
                                </Row>
                            </Modal.Body>

                            {/* Modal Footer Controls */}
                            <Modal.Footer>
                                <Button variant="light" onClick={handleClose} disabled={isSubmitting}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    )
}

export default FormMappingMdl

// Purpose: Sub Category Add/Edit Modal Module
// Created by: Harish
// Created Date: 26-05-2026
// Updated: Code refinement, validation key alignment, and Formik checkbox/submit bug fixes.

import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Textfield from '../../../components/ui/TextField/TextInput';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import Note from '../../../utils/Note';
import { SubCategoryMdlNote } from '../../data/note';
import { ListChecks } from 'lucide-react';
import SelectField from '../../../components/ui/SelectBox/SelectField';

interface SubCategoryMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const SubCategoryMdl: React.FC<SubCategoryMdlProps> = ({ show, handleClose, editedData }) => {

    // Form submission handlers
    const addSubCategory = (values: any) => {
        console.log('Add Category => ', values);
    };

    const editSubCategory = (values: any) => {
        console.log('Edit Category => ', values);
    };

    // Auto-managed Tab Index increments sequentially on render
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

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
                        subCategory: editedData?.subCategory || '',
                        subCategoryFor: editedData?.subCategoryFor || 'BOTH',
                        subCategoryType: editedData?.subCategoryType || 'BOTH',
                        customerType: editedData?.customerType || 'BOTH',
                        subCategoryAutoAssign: editedData?.subCategoryAutoAssign || false,
                    }}
                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        category: Yup.string().required('Category Name is required'),
                        subCategory: Yup.string().required('Sub-Category Name is required'),
                        subCategoryFor: Yup.string().required('Category For selection is required'),
                        subCategoryType: Yup.string().required('Category Type selection is required'),
                        customerType: Yup.string().required('Customer Type selection is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editSubCategory(values);
                        } else {
                            addSubCategory(values);
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
                                            <ListChecks className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>
                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit Sub-Category' : 'Create New Sub-Category'}
                                            </h6>
                                            <p className="text-secondary text-sm mb-0">
                                                Manage Sub-Category settings and classification details.
                                            </p>
                                        </div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>

                            {/* Modal Body */}
                            <Modal.Body>
                                <Row>
                                    <Col md={7}>
                                        <Row>
                                            {/* Category DropDown */}
                                            <Col md={12} className='mb-3'>
                                                <SelectField
                                                    label='Category'
                                                    placeholder='Select Category'
                                                    name='category'
                                                    required
                                                    onBlur={handleBlur}
                                                    value={values.category}
                                                // onChange={(e) => setFieldValue(e.target.values)}
                                                />
                                            </Col>
                                            {/* Sub Category Name input field */}
                                            <Col md={12} className='mb-3'>
                                                <Textfield
                                                    label='Sub Category Name'
                                                    value={values.subCategory}
                                                    name='subCategory'
                                                    id='subCategory'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter sub Category name'
                                                    maxLength={100}
                                                    tabIndex={getNextTabIndex()}
                                                />
                                                <ErrorMessage name="subCategory" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Category For Radio Selections */}
                                            <Col md={6} className='mb-3'>
                                                <label className='text-sm text-muted fw-medium d-block mb-1'>Category For</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        id='both'
                                                        name='subCategoryFor'
                                                        value='BOTH'
                                                        checked={values.subCategoryFor === 'BOTH'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Internal'
                                                        id='internal'
                                                        name='subCategoryFor'
                                                        value='INTERNAL'
                                                        checked={values.subCategoryFor === 'INTERNAL'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='External'
                                                        id='external'
                                                        name='subCategoryFor'
                                                        value='EXTERNAL'
                                                        checked={values.subCategoryFor === 'EXTERNAL'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                                <ErrorMessage name="subCategoryFor" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Category Type Radio Selections */}
                                            <Col md={6} className='mb-3'>
                                                <label className='text-sm text-muted fw-medium d-block mb-1'>Category Type</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        id='cboth'
                                                        name='subCategoryType'
                                                        value='BOTH'
                                                        checked={values.subCategoryType === 'BOTH'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Service'
                                                        id='service'
                                                        name='subCategoryType'
                                                        value='SERVICE'
                                                        checked={values.subCategoryType === 'SERVICE'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Transaction'
                                                        id='transaction'
                                                        name='subCategoryType'
                                                        value='TRANSACTION'
                                                        checked={values.subCategoryType === 'TRANSACTION'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                                <ErrorMessage name="subCategoryType" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Customer Type Radio Selections */}
                                            <Col md={12} className='mb-3'>
                                                <label className='text-sm text-muted fw-medium d-block mb-1'>Customer Type</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        id='cuboth'
                                                        name='customerType'
                                                        value='BOTH'
                                                        checked={values.customerType === 'BOTH'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Existing'
                                                        id='existing'
                                                        name='customerType'
                                                        value='EXISTING'
                                                        checked={values.customerType === 'EXISTING'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Non Existing'
                                                        id='nonexisting'
                                                        name='customerType'
                                                        value='NONEXISTING'
                                                        checked={values.customerType === 'NONEXISTING'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                                <ErrorMessage name="customerType" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Checkbox Configuration logic */}
                                            <Col md={12} className='mt-2 mb-3'>
                                                <Checkbox
                                                    label='Sub-Category auto assign to all users'
                                                    name='subCategoryAutoAssign'
                                                    checked={values.subCategoryAutoAssign}
                                                    onChange={handleChange}
                                                    tabIndex={getNextTabIndex()}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* Sidebar Guidance Notes */}
                                    <Col md={5}>
                                        <Note data={SubCategoryMdlNote} />
                                    </Col>
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
    );
};

export default SubCategoryMdl;
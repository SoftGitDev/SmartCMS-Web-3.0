// Purpose: Category add edit module modal 
// Created by: Harish
// Created Date: 26-05-2026


import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Textfield from '../../../components/ui/TextField/TextInput'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import Note from '../../../utils/Note';
import { CategoryMdlNote } from '../../data/note';
import { FolderPlus, ListChecks } from 'lucide-react';


interface CategoryMdlProps {
    show: boolean
    handleClose: () => void
    editedData?: any
}
const CategoryMdl: React.FC<CategoryMdlProps> = ({ show, handleClose, editedData }) => {

    const addCategory = (values: any) => {
        console.log('Add User => ', values);
    };

    const editCategory = (values: any) => {
        console.log('Edit User => ', values);
    };

    console.log('editedData', editedData);


    // Tab Index auto manage
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
                    initialValues={{
                        category: editedData?.category || '',
                        categoryFor: editedData?.categoryFor || 'BOTH',
                        categoryType: editedData?.categoryType || 'BOTH',
                        customerType: editedData?.customerType || 'BOTH',
                        categoryAutoAssign: editedData?.categoryAutoAssign || false,
                    }}
                    validationSchema={Yup.object().shape({
                        category: Yup.string().required('Category Name is required'),
                        categoryFor: Yup.string().required('Category For is required'),
                        categoryType: Yup.string().required('Category Type is required'),
                        customerType: Yup.string().required('Customer Type is required'),
                    })}
                    onSubmit={(values) => {
                        if (editedData) {
                            editCategory(values);
                        } else {
                            addCategory(values);
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
                                            <FolderPlus className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>

                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit Category' : 'Create New Category'}
                                            </h6>

                                            <p className="text-secondary text-sm mb-0">
                                                Manage category settings and classification details.
                                            </p>
                                        </div>

                                    </div>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col md={12} className='mb-2'>
                                                <Textfield
                                                    label='Category Name'
                                                    value={values.category}
                                                    name='category'
                                                    id='category'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter category name'
                                                    maxLength={100}
                                                    tabIndex={getNextTabIndex()}
                                                />
                                                <ErrorMessage name="category" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Category For */}
                                            <Col md={6} className='mb-2'>
                                                <label className='text-sm text-muted'>Category For</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        tabIndex={getNextTabIndex()}
                                                        id='both'
                                                        name='categoryFor'
                                                        value='BOTH'
                                                        checked={values.categoryFor === 'BOTH'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='Internal'
                                                        id='internal'
                                                        tabIndex={getNextTabIndex()}

                                                        name='categoryFor'
                                                        value='INTERNAL'
                                                        checked={values.categoryFor === 'INTERNAL'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='External'
                                                        id='external'
                                                        name='categoryFor'
                                                        tabIndex={getNextTabIndex()}

                                                        value='EXTERNAL'
                                                        checked={values.categoryFor === 'EXTERNAL'}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <ErrorMessage name="categoryFor" className="ErrorMessage" component="div" />


                                            </Col>

                                            {/* Category Type */}
                                            <Col md={6} className='mb-2'>
                                                <label className='text-sm text-muted'>Category Type</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        id='cboth'
                                                        tabIndex={getNextTabIndex()}
                                                        name='categoryType'
                                                        value='BOTH'
                                                        checked={values.categoryType === 'BOTH'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='Service'
                                                        id='service'
                                                        tabIndex={getNextTabIndex()}

                                                        name='categoryType'
                                                        value='SERVICE'
                                                        checked={values.categoryType === 'SERVICE'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='Transaction'
                                                        id='transaction'
                                                        tabIndex={getNextTabIndex()}

                                                        name='categoryType'
                                                        value='TRANSACTION'
                                                        checked={values.categoryType === 'TRANSACTION'}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <ErrorMessage name="categoryType" className="ErrorMessage" component="div" />


                                            </Col>

                                            {/* Customer Type */}
                                            <Col md={7} className='mb-2'>
                                                <label className='text-sm text-muted'>Customer Type</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Both'
                                                        tabIndex={getNextTabIndex()}

                                                        id='cuboth'
                                                        name='customerType'
                                                        value='BOTH'
                                                        checked={values.customerType === 'BOTH'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='Existing'
                                                        tabIndex={getNextTabIndex()}

                                                        id='existing'
                                                        name='customerType'
                                                        value='EXISTING'
                                                        checked={values.customerType === 'EXISTING'}
                                                        onChange={handleChange}
                                                    />

                                                    <RadioBtn
                                                        label='Non Existing'
                                                        tabIndex={getNextTabIndex()}

                                                        id='nonexisting'
                                                        name='customerType'
                                                        value='NONEXISTING'
                                                        checked={values.customerType === 'NONEXISTING'}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <ErrorMessage name="customerType" className="ErrorMessage" component="div" />


                                            </Col>

                                            {/* Category auto assign to all users Check box*/}
                                            <Col md={6} className='mt-3'>
                                                <Checkbox
                                                    label='Category auto assign to all users'
                                                    name='categoryAutoAssign'
                                                    tabIndex={getNextTabIndex()}
                                                    checked={values.categoryAutoAssign === 'Yes'}

                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={5}>
                                        <Note data={CategoryMdlNote} />
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="light" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary">Submit</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>

            </Modal>
        </div>
    )
}

export default CategoryMdl

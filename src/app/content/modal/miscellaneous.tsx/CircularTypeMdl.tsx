// Purpose: Circular Type add edit module modal 
// Created by: Harish
// Created Date: 28-05-2026


import { ErrorMessage, Formik, Form } from 'formik';
import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Textfield from '../../../components/ui/TextField/TextInput';
import { LucideCircleDot, LucideListChecks } from 'lucide-react';
import * as Yup from 'yup';


interface CircularTypeMdlMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const CircularTypeMdl: React.FC<CircularTypeMdlMdlProps> = ({ show, handleClose, editedData }) => {

    // Form submission handlers
    const addCircularTypeMdl = (values: any) => {
        console.log('Add CircularTypeMdl => ', values);
    };

    const editCircularTypeMdl = (values: any) => {
        console.log('Edit CircularTypeMdl => ', values);
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            // size='xl'
            >
                <Formik
                    // Initial values mapped cleanly to database keys and fallback states
                    initialValues={{
                        circularType: editedData?.circularType || '',
                    }}
                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        circularType: Yup.string().required('Category type is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editCircularTypeMdl(values);
                        } else {
                            addCircularTypeMdl(values);
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
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3"
                                            style={{ width: 40, height: 40, flexShrink: 0 }}
                                        >
                                            <LucideCircleDot className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>

                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit Circular Type' : 'Create Circular Type'}
                                            </h6>

                                            <p className="text-secondary text-sm mb-0">
                                                Configure and manage circular type.
                                            </p>
                                        </div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>

                            {/* Modal Body */}
                            <Modal.Body>
                                <Row>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={12} className='mb-3'>
                                                <Textfield
                                                    label='Category Type'
                                                    value={values.circularType}
                                                    name='circularType'
                                                    id='circularType'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter Circular Type '
                                                    maxLength={100}
                                                />
                                                <ErrorMessage name="circularType" className="ErrorMessage" component="div" />
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* Sidebar Guidance Notes */}
                                    {/*  <Col md={5} className="d-none d-md-block">
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

export default CircularTypeMdl

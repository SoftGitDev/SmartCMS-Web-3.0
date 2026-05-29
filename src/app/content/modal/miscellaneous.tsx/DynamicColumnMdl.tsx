import { ErrorMessage, Form, Formik } from 'formik';
import { LucideListChecks } from 'lucide-react';
import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Textfield from '../../../components/ui/TextField/TextInput';


interface DynamicColumnMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const DynamicColumnMdl: React.FC<DynamicColumnMdlProps> = ({ show, handleClose, editedData }) => {

    // Form submission handlers
    const addDynamicColumnMdl = (values: any) => {
        console.log('Add Department => ', values);
    };

    const editDynamicColumnMdl = (values: any) => {
        console.log('Edit Department => ', values);
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
                        departmentNm: editedData?.departmentNm || '',
                    }}
                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        departmentNm: Yup.string().required('Department Name is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editDynamicColumnMdl(values);
                        } else {
                            addDynamicColumnMdl(values);
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
                                            <Col md={12} className='mb-3'>
                                                <Textfield
                                                    label='Department Name'
                                                    value={values.departmentNm}
                                                    name='departmentNm'
                                                    id='departmentNm'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter Department name '
                                                    maxLength={100}
                                                />
                                                <ErrorMessage name="departmentNm" className="text-danger small mt-1" component="div" />
                                            </Col>
                                        </Row>
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

export default DynamicColumnMdl

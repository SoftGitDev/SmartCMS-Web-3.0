// Purpose: Ticket Template Add/Edit Modal Module
// Created by: Harish
// Created Date: 02-06-2026
// Updated: Code refinement, validation key alignment, and Formik checkbox/submit bug fixes.

import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import Textfield from '../../../components/ui/TextField/TextInput';
import { ListChecks } from 'lucide-react';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import Editor from '../../../components/ui/editor/Editor';

interface TicketTemplateMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const TicketTemplateMdl: React.FC<TicketTemplateMdlProps> = ({ show, handleClose, editedData }) => {

    // Form submission handler for CREATING a template
    const addTicketTemplate = (values: any) => {
        // Logged payload values map directly to DB schema
        console.log('Add Ticket Template Payload => ', values);
    };

    // Form submission handler for UPDATING an existing template
    const editTicketTemplate = (values: any) => {
        // Logged payload values map directly to DB schema
        console.log('Edit Ticket Template Payload => ', values);
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
                        templateNm: editedData?.templateNm || '',
                        subject: editedData?.subject || '',
                        message: editedData?.message || '',
                        ticketFor: editedData?.ticketFor || 'INTERNAL'
                    }}

                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        templateNm: Yup.string().required('Template Name is required'),
                        subject: Yup.string().required('Subject is required'),
                        message: Yup.string().required('Message is required'),
                        ticketFor: Yup.string().required('Selection is required'),
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editTicketTemplate(values);
                        } else {
                            addTicketTemplate(values);
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
                                                {editedData ? 'Edit Ticket Template' : 'Create New Ticket Template'}
                                            </h6>
                                            <p className="text-secondary text-sm mb-0">
                                                Manage Ticket Template settings and layout configurations.
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
                                            {/* Template Name Input Field */}
                                            <Col md={7} className='mb-3'>
                                                <Textfield
                                                    label='Template Name'
                                                    value={values.templateNm}
                                                    name='templateNm'
                                                    id='templateNm'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter Template name'
                                                    maxLength={100}
                                                    tabIndex={getNextTabIndex()}
                                                />
                                                <ErrorMessage name="templateNm" className="ErrorMessage text-danger small mt-1" component="div" />
                                            </Col>

                                            {/* Scope Radio Selections (Ticket For) */}
                                            <Col md={5} className='mb-3'>
                                                <label className='text-sm text-muted fw-medium d-block mb-1'>Ticket For</label>
                                                <div className='d-flex gap-3 mt-1'>
                                                    <RadioBtn
                                                        label='Internal'
                                                        id='internal'
                                                        name='ticketFor'
                                                        value='INTERNAL'
                                                        checked={values.ticketFor === 'INTERNAL'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='External'
                                                        id='external'
                                                        name='ticketFor' // Fixed: Changed from subCategoryFor to ticketFor
                                                        value='EXTERNAL'
                                                        checked={values.ticketFor === 'EXTERNAL'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label='Both'
                                                        id='both'
                                                        name='ticketFor'
                                                        value='BOTH'
                                                        checked={values.ticketFor === 'BOTH'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                                <ErrorMessage name="ticketFor" className="ErrorMessage text-danger small mt-1" component="div" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            {/* Subject Field */}
                                            <Col md={12} className='mb-3'>
                                                <Textfield
                                                    label='Subject'
                                                    value={values.subject}
                                                    name='subject'
                                                    id='subject'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter Subject line'
                                                    maxLength={100}
                                                    tabIndex={getNextTabIndex()}
                                                />
                                                <ErrorMessage name="subject" className="ErrorMessage text-danger small mt-1" component="div" />
                                            </Col>

                                            {/* Rich Text Editor Message Field */}
                                            <Col md={12} className='mb-3'>
                                                <Editor
                                                    label='Message'
                                                    required
                                                    value={values.message}
                                                    // Fixed: Typo target correction & correct setFieldValue signature
                                                    onChange={(content: any) => setFieldValue('message', content?.target ? content.target.value : content)}
                                                />
                                                <ErrorMessage name="message" className="ErrorMessage text-danger small mt-1" component="div" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Note : -
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
}

export default TicketTemplateMdl;
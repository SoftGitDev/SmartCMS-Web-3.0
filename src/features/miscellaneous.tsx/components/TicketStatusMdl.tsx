// Purpose: Ticket Status module screen 
// Created by: Harish
// Created Date: 02-06-2026



import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { ListChecks } from 'lucide-react';
import * as Yup from 'yup';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import RadioBtn from '../../../common/components/ui/Radio/RadioBtn';


interface TicketStatusMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const TicketStatusMdl: React.FC<TicketStatusMdlProps> = ({ show, handleClose, editedData }) => {
    // Form submission handler for CREATING a template
    const addTicketStatus = (values: any) => {
        console.log('Add Ticket Status Payload => ', values);
    };

    // Form submission handler for UPDATING an existing template
    const editTicketStatus = (values: any) => {
        console.log('Edit Ticket Status Payload => ', values);
    };

    // Auto-managed Tab Index increments sequentially on render
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        // size="xl"
        >
            <Formik
                // Initial values mapped cleanly to database keys and fallback states
                initialValues={{
                    statusNm: editedData?.statusNm || '',
                    statusType: editedData?.statusType || '',
                    statusFor: editedData?.statusFor || 'INTERNAL'
                }}
                // Validation Schema alignment with form fields
                validationSchema={Yup.object().shape({
                    statusNm: Yup.string().required('Status Name is required'),
                    statusType: Yup.string().required('Status Type is required'),
                    statusFor: Yup.string().required('Status For is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    if (editedData) {
                        editTicketStatus(values);
                    } else {
                        addTicketStatus(values);
                    }
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* Modal Header */}
                        <Modal.Header closeButton>
                            <Modal.Title className="w-100">
                                <div className="d-flex align-items-start">
                                    <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0 }} >
                                        <ListChecks className="text-primary" size={22} strokeWidth={2.2} />
                                    </div>
                                    <div>
                                        <h6 className="fw-semibold text-dark mb-1">
                                            {editedData ? 'Edit Ticket Status' : 'Create New Ticket Status'}
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
                                {/* Status Name Field */}
                                <Col md={6} className="mb-3">
                                    <Textfield
                                        label="Status Name"
                                        value={values.statusNm}
                                        name="statusNm"
                                        id="statusNm"
                                        required
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter status name"
                                        maxLength={100}
                                        tabIndex={getNextTabIndex()}
                                    />
                                    <ErrorMessage name="statusNm" className="ErrorMessage" component="div" />
                                </Col>

                                {/* Status Type Field */}
                                <Col md={6} className="mb-3">
                                    <SelectField
                                        label="Status Type"
                                        value={values.statusType}
                                        name="statusType"
                                        required
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Select status type"
                                        tabIndex={getNextTabIndex()}
                                    />
                                    <ErrorMessage name="statusType" className="ErrorMessage" component="div" />
                                </Col>

                                {/* Scope Radio Selections (Status For) */}
                                <Col md={12} className="mb-3">
                                    <label className="text-sm text-muted fw-medium d-block mb-1">Ticket For</label>
                                    <div className="d-flex gap-3 mt-1">
                                        <RadioBtn
                                            label="Internal"
                                            id="internal"
                                            name="statusFor"
                                            value="INTERNAL"
                                            checked={values.statusFor === 'INTERNAL'}
                                            onChange={handleChange}
                                            tabIndex={getNextTabIndex()}
                                        />
                                        <RadioBtn
                                            label="External"
                                            id="external"
                                            name="statusFor"
                                            value="EXTERNAL"
                                            checked={values.statusFor === 'EXTERNAL'}
                                            onChange={handleChange}
                                            tabIndex={getNextTabIndex()}
                                        />
                                        <RadioBtn
                                            label="Both"
                                            id="both"
                                            name="statusFor"
                                            value="BOTH"
                                            checked={values.statusFor === 'BOTH'}
                                            onChange={handleChange}
                                            tabIndex={getNextTabIndex()}
                                        />
                                    </div>
                                    <ErrorMessage name="statusFor" className="ErrorMessage" component="div" />
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
    );
};

export default TicketStatusMdl;
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Textfield from '../../../components/ui/TextField/TextInput'
import { LucideListChecks, X } from 'lucide-react'
import * as Yup from 'yup';
import SelectField from '../../../components/ui/SelectBox/SelectField'



interface ExceptionMatrixMdlProps {
    show: boolean
    handleClose: any
    editedData?: any
}

const ExceptionMatrixMdl: React.FC<ExceptionMatrixMdlProps> = ({ show, handleClose, editedData }) => {

    // Form submission handlers
    const addExceptionMatrixMdl = (values: any) => {
        console.log('Add Matrix => ', values);
    };

    const editExceptionMatrixMdl = (values: any) => {
        console.log('Edit Matrix => ', values);
    };


    // Auto-managed Tab Index increments sequentially on render
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState<string[]>(
        editedData?.emails || []
    );

    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const email = emailInput.trim();
            if (!email) return;
            setEmailList((prev) => [...prev, email]);
            setEmailInput('');
        }
    };

    const removeEmail = (index: number) => {
        setEmailList((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
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
                    level: editedData?.level || '',
                    mobileNo: editedData?.mobileNo || '',
                    emailId: editedData?.emailId || '',
                }}
                // Validation Schema alignment with form fields
                validationSchema={Yup.object().shape({
                    level: Yup.string().required('Level is required'),
                    mobileNo: Yup.string()
                        .matches(/^[0-9]{10}$/, 'Enter valid mobile number')
                        .nullable(),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    if (editedData) {
                        editExceptionMatrixMdl(values);
                    } else {
                        addExceptionMatrixMdl(values);
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
                                            {editedData
                                                ? 'Edit Exception Matrix'
                                                : 'Create Exception Matrix'}
                                        </h6>

                                        <p className="text-secondary text-sm mb-0">
                                            Configure approval level, contact number and escalation email IDs.
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
                                                label='Level'
                                                value={values.level}
                                                name='level'
                                                required
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                tabIndex={getNextTabIndex()}
                                                placeholder='select Level Type '
                                            />
                                            <ErrorMessage name="level" className="ErrorMessage" component="div" />
                                        </Col>

                                        <Col md={6} className='mb-3'>
                                            <Textfield
                                                label='Mobile No'
                                                value={values.mobileNo}
                                                name='mobileNo'
                                                id='mobileNo'
                                                type='text'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                tabIndex={getNextTabIndex()}
                                                placeholder='Enter Mobile number '
                                            />
                                        </Col>

                                        <Col md={12} className="mb-3">
                                            <Textfield
                                                label='Email ID'
                                                name="emailId"
                                                type="email"
                                                required
                                                maxLength={60}
                                                value={emailInput}
                                                placeholder="Type email and press Enter"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setEmailInput(e.target.value)
                                                }
                                                onKeyDown={handleEmailKeyDown}
                                                disabled={emailList.length >= 5}
                                            />

                                            <small className="text-muted">
                                                Press Enter to add email • {5 - emailList.length} remaining
                                            </small>

                                            {emailList.length > 0 && (
                                                <div className="d-flex flex-wrap gap-2 mt-2">
                                                    {emailList.map((email, index) => (
                                                        <span key={index} className="badge bg-primary-50 text-primary d-flex align-items-center px-3 py-2" >
                                                            {email}
                                                            <button type="button" className="btn btn-sm border-0 p-0 ms-2" onClick={() => removeEmail(index)} >
                                                                <X size={12} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </Col>
                                        <ErrorMessage name="emailId" className="ErrorMessage" component="div" />

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
    )
}

export default ExceptionMatrixMdl
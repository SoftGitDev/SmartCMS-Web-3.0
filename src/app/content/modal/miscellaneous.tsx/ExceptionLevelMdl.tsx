import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Textfield from '../../../components/ui/TextField/TextInput';
import { LucideListChecks, LucideShieldAlert } from 'lucide-react';
import * as Yup from 'yup';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import Note from '../../../utils/Note';
import { ExceptionLevelNote } from '../../data/note';


interface ExceptionLevelMdlProps {
    show: boolean
    handleClose: any
    editedData?: any
}

const ExceptionLevelMdl: React.FC<ExceptionLevelMdlProps> = ({ show, handleClose, editedData }) => {
    // Form submission handlers
    const addExceptionLevelMdl = (values: any) => {
        console.log('Add ExceptionLevelMdl => ', values);
    };

    const editExceptionLevelMdl = (values: any) => {
        console.log('Edit ExceptionLevelMdl => ', values);
    };


    // Auto-managed Tab Index increments sequentially on render
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    const formatMinutes = (minutes: string | number) => {
        const mins = Number(minutes);

        if (!mins || mins <= 0) return '';

        const days = Math.floor(mins / 1440);
        const hours = Math.floor((mins % 1440) / 60);
        const remainingMinutes = mins % 60;

        let result = '';

        if (days > 0) result += `${days} Day${days > 1 ? 's' : ''} `;
        if (hours > 0) result += `${hours} Hr `;
        if (remainingMinutes > 0) result += `${remainingMinutes} Min`;

        return result.trim();
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
                        levelNm: editedData?.levelNm || '',
                        internalPeriod: editedData?.internalPeriod || '',
                        externalPeriod: editedData?.externalPeriod || '',
                        periodBy: editedData?.statusFor || 'CREATEDATE',
                        alertby: editedData?.statusFor || 'NONE',

                    }}
                    // Validation Schema alignment with form fields
                    validationSchema={Yup.object().shape({
                        levelNm: Yup.string().required('Level name  is required'),
                        internalPeriod: Yup.string().required('Internal Period name  is required'),
                        externalPeriod: Yup.string().required('External Period name  is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        if (editedData) {
                            editExceptionLevelMdl(values);
                        } else {
                            addExceptionLevelMdl(values);
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
                                            <LucideShieldAlert className='text-primary' size={22} strokeWidth={2.2} />
                                        </div>

                                        <div>
                                            <h6 className="fw-semibold text-dark mb-1">
                                                {editedData ? 'Edit Exception Level' : 'Create Exception Level'}
                                            </h6>

                                            <p className="text-secondary text-sm mb-0">
                                                Manage exception levels.
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
                                            <Col md={12} className='mb-3'>
                                                <Textfield
                                                    label='Level Name'
                                                    value={values.levelNm}
                                                    name='levelNm'
                                                    id='levelNm'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder='Enter Circular Type '
                                                    maxLength={100}
                                                />
                                                <ErrorMessage name="levelNm" className="ErrorMessage" component="div" />
                                            </Col>

                                            {/* Internal Period */}
                                            <Col md={6} className='mb-3'>
                                                <Textfield
                                                    label='Internal Period (In Min)'
                                                    value={values.internalPeriod}
                                                    name='internalPeriod'
                                                    id='internalPeriod'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const value = e.target.value.replace(/\D/g, ''); // numbers only
                                                        setFieldValue('internalPeriod', value);
                                                    }}
                                                    placeholder='Enter Internal Period'
                                                    maxLength={5}
                                                />

                                                <ErrorMessage name="internalPeriod" className="ErrorMessage" component="div" />

                                                {values.internalPeriod && (
                                                    <div className="mt-1 text-primary fw-semibold small">
                                                        {formatMinutes(values.internalPeriod)}
                                                    </div>
                                                )}
                                            </Col>

                                            {/* externalPeriod */}
                                            <Col md={6} className='mb-3'>
                                                <Textfield
                                                    label='External Period (In Min)'
                                                    value={values.externalPeriod}
                                                    name='externalPeriod'
                                                    id='externalPeriod'
                                                    required
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setFieldValue('externalPeriod', value);
                                                    }}
                                                    placeholder='Enter External Period'
                                                    maxLength={5}
                                                />

                                                <ErrorMessage name="externalPeriod" className="ErrorMessage" component="div" />

                                                {values.externalPeriod && (
                                                    <div className="mt-1 text-primary fw-semibold small">
                                                        {formatMinutes(values.externalPeriod)}
                                                    </div>
                                                )}
                                            </Col>

                                            <Col md={6} className='mb-3'>
                                                <label className='text-sm text-muted'>Period by  <span className='text-success text-xs'>(Used to calculate alert interval)</span></label>
                                                <div className="d-flex gap-3 mt-1">
                                                    <RadioBtn
                                                        label="Create Date"
                                                        id="CREATEDATE"
                                                        name="periodBy"
                                                        value="CREATEDATE"
                                                        checked={values.periodBy === 'CREATEDATE'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label="Update Date"
                                                        id="UPDATEDATE"
                                                        name="periodBy"
                                                        value="UPDATEDATE"
                                                        checked={values.periodBy === 'UPDATEDATE'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Alert Type */}
                                            <Col md={6} className='mb-3'>
                                                <label className='text-sm text-muted'>Alert Type  </label>
                                                <div className="d-flex gap-3 mt-1">
                                                    <RadioBtn
                                                        label="None"
                                                        id="NONE"
                                                        name="alertby"
                                                        value="NONE"
                                                        checked={values.alertby === 'NONE'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label="Mail"
                                                        id="MAIL"
                                                        name="alertby"
                                                        value="MAIL"
                                                        checked={values.alertby === 'MAIL'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label="SMS"
                                                        id="SMS"
                                                        name="alertby"
                                                        value="SMS"
                                                        checked={values.alertby === 'SMS'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                    <RadioBtn
                                                        label="Both"
                                                        id="BOTH"
                                                        name="alertby"
                                                        value="BOTH"
                                                        checked={values.alertby === 'BOTH'}
                                                        onChange={handleChange}
                                                        tabIndex={getNextTabIndex()}
                                                    />
                                                </div>
                                            </Col>

                                            {(values.alertby === 'MAIL' || values.alertby === 'BOTH') &&
                                                <Col md={6}>
                                                    <SelectField
                                                        label='Mail Templete'
                                                    />
                                                </Col>
                                            }
                                            {(values.alertby === 'SMS' || values.alertby === 'BOTH') &&
                                                <Col md={6}>
                                                    <SelectField
                                                        label='SMS Templete'
                                                    />
                                                </Col>
                                            }
                                        </Row>
                                    </Col>

                                    {/* Sidebar Guidance Notes */}
                                    <Col className="d-none d-md-block">
                                        <Note data={ExceptionLevelNote} />
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
    )
}

export default ExceptionLevelMdl
import { ErrorMessage, Form, Formik, FieldArray } from 'formik';
import { LucideListChecks, Trash, X } from 'lucide-react';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Textfield from '../../../components/ui/TextField/TextInput';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import Checkbox from '../../../components/ui/checkBox/Checkbox';

interface DynamicColumnMdlProps {
    show: boolean;
    handleClose: () => void;
    editedData?: any;
}

const DynamicColumnMdl: React.FC<DynamicColumnMdlProps> = ({ show, handleClose, editedData }) => {

    const addDynamicColumnMdl = (values: any) => {
        console.log('Add Department => ', values);
    };

    const editDynamicColumnMdl = (values: any) => {
        console.log('Edit Department => ', values);
    };

    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    const inputTypeOptions = [
        { label: "Combo-Box", value: "COMBO_BOX" },
        { label: "Input-box", value: "INPUT_BOX" },
        { label: "CheckBox", value: "CHECKBOX" },
        { label: "Number", value: "NUMBER" },
        { label: "Text Area", value: "TEXTAREA" },
        { label: "Date", value: "DATE" },
        { label: "Radio", value: "RADIO" },
    ];

    // Dynamic Validation Schema based on the selected Input Type
    const validationSchema = Yup.object().shape({
        displayNm: Yup.string().required('Display Name is required'),
        fieldType: Yup.string().required('Field Type is required'),
        displayInput: Yup.string().required("Input Type is required"),

        // Validation for Options (Combo-Box / Radio)
        options: Yup.array().of(
            Yup.object().shape({
                value: Yup.string().required('Value is required')
            })
        ).when('displayInput', {
            is: (val: string) => ['COMBO_BOX', 'RADIO'].includes(val),
            then: (schema) => schema.min(1, 'At least one option is required'),
            otherwise: (schema) => schema.notRequired(),
        }),

        // Validation for Number Type
        minLength: Yup.number().when('displayInput', {
            is: 'NUMBER',
            then: (schema) => schema.required('Min Length is required').min(0, 'Cannot be negative'),
            otherwise: (schema) => schema.notRequired(),
        }),
        maxLength: Yup.number().when('displayInput', {
            is: 'NUMBER',
            then: (schema) => schema.required('Max Length is required').min(Yup.ref('minLength'), 'Max must be greater than min'),
            otherwise: (schema) => schema.notRequired(),
        }),

        // Validation for Date Type
        minDays: Yup.number().when('displayInput', {
            is: 'DATE',
            then: (schema) => schema.required('Min Days is required').min(0, 'Cannot be negative'),
            otherwise: (schema) => schema.notRequired(),
        }),
        maxDays: Yup.number().when('displayInput', {
            is: 'DATE',
            then: (schema) => schema.required('Max Days is required').min(Yup.ref('minDays'), 'Max must be greater than min'),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

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
                        displayNm: editedData?.displayNm || '',
                        displayInput: editedData?.displayInput || "",
                        fieldType: editedData?.fieldType || 'DYNAMIC',
                        customerType: editedData?.customerType || 'EXISTING',
                        columnFor: editedData?.columnFor || 'BOTH',
                        ticketType: editedData?.ticketType || 'SERVICE',
                        storeSecurely: editedData?.storeSecurely || false,
                        displayMask: editedData?.displayMask || false,

                        // Conditionals
                        options: editedData?.options || [{ value: '' }],
                        minLength: editedData?.minLength ?? 0,
                        maxLength: editedData?.maxLength ?? 0,
                        minDays: editedData?.minDays ?? 0,
                        maxDays: editedData?.maxDays ?? 0,
                    }}
                    validationSchema={validationSchema}
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
                                    <Col md={8}>
                                        <Row>
                                            {/* Field Type */}
                                            <Col md={12} className="mb-3">
                                                <label className="text-sm text-muted fw-medium">Field Type</label>
                                                <div className="d-flex gap-3 mt-1">
                                                    <RadioBtn label="Dynamic" id="dynamic" name="fieldType" value="DYNAMIC" checked={values.fieldType === "DYNAMIC"} onChange={handleChange} />
                                                    <RadioBtn label="Fixed For Ticket" id="fixedTicket" name="fieldType" value="FIXED_TICKET" checked={values.fieldType === "FIXED_TICKET"} onChange={handleChange} />
                                                    <RadioBtn label="Fixed For Reply" id="fixedReply" name="fieldType" value="FIXED_REPLY" checked={values.fieldType === "FIXED_REPLY"} onChange={handleChange} />
                                                </div>
                                                <ErrorMessage name="fieldType" component="div" className="ErrorMessage" />
                                            </Col>

                                            {/* Fixed Ticket Options */}
                                            {values.fieldType === "FIXED_TICKET" && (
                                                <>
                                                    <Col md={6} className="mb-3">
                                                        <label className="text-sm text-muted fw-medium">Column For</label>
                                                        <div className="d-flex gap-3 mt-1">
                                                            <RadioBtn label="Both" name="columnFor" value="BOTH" checked={values.columnFor === "BOTH"} onChange={handleChange} />
                                                            <RadioBtn label="Internal" name="columnFor" value="INTERNAL" checked={values.columnFor === "INTERNAL"} onChange={handleChange} />
                                                            <RadioBtn label="External" name="columnFor" value="EXTERNAL" checked={values.columnFor === "EXTERNAL"} onChange={handleChange} />
                                                        </div>
                                                    </Col>
                                                    <Col md={6} className="mb-3">
                                                        <label className="text-sm text-muted fw-medium">Ticket Type</label>
                                                        <div className="d-flex gap-3 mt-1">
                                                            <RadioBtn label="Both" name="ticketType" value="BOTH" checked={values.ticketType === "BOTH"} onChange={handleChange} />
                                                            <RadioBtn label="Service" name="ticketType" value="SERVICE" checked={values.ticketType === "SERVICE"} onChange={handleChange} />
                                                            <RadioBtn label="Transaction" name="ticketType" value="TRANSACTION" checked={values.ticketType === "TRANSACTION"} onChange={handleChange} />
                                                        </div>
                                                    </Col>
                                                    <Col md={12} className="mb-3">
                                                        <label className="text-sm text-muted fw-medium">Customer Type</label>
                                                        <div className="d-flex gap-3 mt-1">
                                                            <RadioBtn label="Existing" name="customerType" value="EXISTING" checked={values.customerType === "EXISTING"} onChange={handleChange} />
                                                            <RadioBtn label="Non Existing" name="customerType" value="NON_EXISTING" checked={values.customerType === "NON_EXISTING"} onChange={handleChange} />
                                                        </div>
                                                    </Col>
                                                </>
                                            )}

                                            {/* Input Type Selection */}
                                            <Col md={6} className="mb-3">
                                                <SelectField
                                                    label="Input Type"
                                                    name="displayInput"
                                                    tabIndex={getNextTabIndex()}
                                                    required
                                                    options={inputTypeOptions}
                                                    placeholder="Select Input Type"
                                                    value={inputTypeOptions.find((option) => option.value === values.displayInput) || null}
                                                    onChange={(selected: any) => {
                                                        setFieldValue("displayInput", selected?.value || "");
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="displayInput" component="div" className="ErrorMessage" />
                                            </Col>

                                            {/* Display Name */}
                                            <Col md={6} className="mb-3">
                                                <Textfield
                                                    label="Display Name"
                                                    value={values.displayNm}
                                                    name="displayNm"
                                                    id="displayNm"
                                                    tabIndex={getNextTabIndex()}
                                                    required
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter Display Name"
                                                    maxLength={100}
                                                />
                                                <ErrorMessage name="displayNm" component="div" className="ErrorMessage" />
                                            </Col>

                                            {/* Dynamic Render Configuration Area */}
                                            <Col md={12} className="mb-3">
                                                {/* DYNAMIC FIELD OPTIONS (Combo-Box & Radio) */}
                                                {['COMBO_BOX', 'RADIO'].includes(values.displayInput) && (
                                                    <div className="p-3 border rounded bg-light mb-3">
                                                        <span className="text-sm fw-semibold text-secondary d-block mb-2">
                                                            Add {values.displayInput === 'COMBO_BOX' ? 'combo box' : 'radio'} options
                                                        </span>
                                                        <FieldArray name="options">
                                                            {({ push, remove }) => (
                                                                <Row>
                                                                    {values.options.map((_: any, index: number) => (
                                                                        <Col md={6} key={index} className="mb-2">
                                                                            <div className="d-flex align-items-center position-relative">
                                                                                <div className="flex-grow-1">
                                                                                    <Textfield
                                                                                        label="Values"
                                                                                        required
                                                                                        name={`options.${index}.value`}
                                                                                        value={values.options[index]?.value || ''}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="Enter option value"
                                                                                    />
                                                                                </div>
                                                                                <Button
                                                                                    variant="danger"
                                                                                    className='mt-3'
                                                                                    onClick={() => values.options.length > 1 && remove(index)}
                                                                                >
                                                                                    <Trash size={16} className="text-white" />
                                                                                </Button>
                                                                            </div>
                                                                            <ErrorMessage name={`options.${index}.value`} component="div" className="text-danger text-sm" />
                                                                        </Col>
                                                                    ))}
                                                                    <Col md={12} className="mt-2">
                                                                        <Button variant="link" className="p-0 text-sm fw-semibold text-decoration-none" onClick={() => push({ value: '' })}>
                                                                            + Add New Column
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                )}

                                                {/* NUMBER RENDERING */}
                                                {values.displayInput === 'NUMBER' && (
                                                    <Row>
                                                        <Col md={6} className="mb-3">
                                                            <Textfield
                                                                label="Min Length"
                                                                required type="number"
                                                                name="minLength"
                                                                value={values.minLength}
                                                                onChange={handleChange}
                                                                maxLength={3}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage name="minLength" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={6} className="mb-3">
                                                            <Textfield
                                                                label="Max Length"
                                                                required type="number"
                                                                name="maxLength"
                                                                value={values.maxLength}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                maxLength={3}
                                                            />
                                                            <ErrorMessage name="maxLength" component="div" className="ErrorMessage" />
                                                        </Col>
                                                    </Row>
                                                )}

                                                {/* DATE RENDERING */}
                                                {values.displayInput === 'DATE' && (
                                                    <Row>
                                                        <Col md={6} className="mb-3">
                                                            <Textfield label="Min Days" required type="number" name="minDays" value={values.minDays} onChange={handleChange} onBlur={handleBlur} />
                                                            <ErrorMessage name="minDays" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={6} className="mb-3">
                                                            <Textfield label="Max Days" required type="number" name="maxDays" value={values.maxDays} onChange={handleChange} onBlur={handleBlur} />
                                                            <ErrorMessage name="maxDays" component="div" className="ErrorMessage" />
                                                        </Col>
                                                    </Row>
                                                )}
                                            </Col>

                                            {/* Store Securely & Display Mask */}
                                            <Col md={3} className='mt-2'>
                                                <Checkbox label='Store Securely' name='storeSecurely' checked={values.storeSecurely} tabIndex={getNextTabIndex()} onChange={handleChange} />
                                            </Col>
                                            <Col md={3} className='mt-2'>
                                                <Checkbox label='Display Mask' name='displayMask' checked={values.displayMask} tabIndex={getNextTabIndex()} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Note
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

export default DynamicColumnMdl;
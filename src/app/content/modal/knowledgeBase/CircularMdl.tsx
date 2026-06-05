// Purpose: Circular Modal Add edit screen
// Created by: Harish 
// Created Date: 03-06-2026
// Updated Date: 04-06-2026

import React, { useState, useRef } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Editor from '../../../components/ui/editor/Editor';
import Datepicker from '../../../components/ui/datePicker/Datepicker';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import SelectField from '../../../components/ui/SelectBox/SelectField';
import Textfield from '../../../components/ui/TextField/TextInput';
import { CircleQuestionMarkIcon, Download, File, Link, LucideHelpCircle, Trash } from 'lucide-react';
import FileInput from '../../../components/ui/fileInput/FileInput';
import Note from '../../../utils/Note';
import { CircularForNote } from '../../data/note';

interface InitialValuesProps {
    circularTitle: string;
    circularTypeValue: string;
    circularTypeLabel: string;
    foruser: string;
    emailAlrts: string;
    startDt: any[];
    endDt: any[];
    description: string;
}

interface CircularTypeProps {
    TRAN_CD: string;
    NAME: string;
}

interface CircularMdlProps {
    show: boolean;
    handleClose: () => void;
    isEdited?: boolean;
    state?: {
        data?: Array<{
            Title?: string;
            CircularType?: string;
            CircularName?: string;
            ACFor?: string;
            EmailAlert?: string;
            StartDate?: string;
            EndDate?: string;
            Description?: string;
            FileName?: string;
            FileBase64?: string;
            FileContentType?: string;
        }>;
    };
    circularTypeData?: CircularTypeProps[];
    addCircularData?: (payload: FormData, resetForm: () => void) => void;
    editCircularData?: (payload: FormData, resetForm: () => void) => void;
}

const CircularMdl: React.FC<CircularMdlProps> = ({
    show,
    handleClose,
    isEdited = false,
    state,
    circularTypeData = [],
    addCircularData,
    editCircularData
}) => {
    const attachmentRef = useRef<HTMLInputElement>(null);
    const [multiFile, setMultiFile] = useState<File[]>([]);

    const validation = Yup.object({
        circularTitle: Yup.string().required('Circular title is a required field'),
        circularTypeValue: Yup.string().required('Circular Type is a required field'),
        description: Yup.string().required('Description is a required field'),
        startDt: Yup.array().min(1, 'Start date is a required field').required('Start date is a required field'),
        endDt: Yup.array().min(1, 'End date is a required field').required('End date is a required field'),
    });

    const initialValues: InitialValuesProps = {
        circularTitle: isEdited ? state?.data?.[0]?.Title || '' : '',
        circularTypeValue: isEdited ? state?.data?.[0]?.CircularType || '' : '',
        circularTypeLabel: isEdited ? state?.data?.[0]?.CircularName || '' : '',
        foruser: isEdited ? state?.data?.[0]?.ACFor || 'A' : 'A',
        emailAlrts: isEdited ? state?.data?.[0]?.EmailAlert || 'Y' : 'Y',
        startDt: isEdited && state?.data?.[0]?.StartDate ? [new Date(state.data[0].StartDate)] : [],
        endDt: isEdited && state?.data?.[0]?.EndDate ? [new Date(state.data[0].EndDate)] : [],
        description: isEdited ? state?.data?.[0]?.Description || '' : '',
    };

    const attachFilesClick = () => {
        attachmentRef.current?.click();
    };

    const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setMultiFile((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

    const downloadFile = (base64Data?: string, fileName?: string, contentType?: string) => {
        if (!base64Data || !fileName) return;
        const linkSource = `data:${contentType};base64,${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">

            {/* Header */}
            <Modal.Header closeButton>
                <Modal.Title className='d-flex align-items-center gap-2 '>
                    <div className='icon-wrapper    '>
                        <LucideHelpCircle className='text-primary' size={22} />
                    </div>
                    <div className=''>
                        <h6 className="m-0 fw-semibold text-dark">
                            {isEdited ? 'Edit Circular' : 'Add Circular'}
                        </h6>
                        <p className="text-xs text-muted fw-normal m-0 mt-1">
                            Manage and distribute official internal or external organizational circulars.
                        </p>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                    const payload = new FormData();
                    // Unified single-source payload values mapped straight out of Formik
                    const mappedData = {
                        Title: values.circularTitle,
                        CircularType: values.circularTypeValue,
                        CircularName: values.circularTypeLabel,
                        ACFor: values.foruser,
                        EmailAlert: values.emailAlrts,
                        StartDate: values.startDt[0] ? moment(values.startDt[0]).format('YYYY-MM-DD') : '',
                        EndDate: values.endDt[0] ? moment(values.endDt[0]).format('YYYY-MM-DD') : '',
                        Description: values.description
                    };

                    payload.append('CircularData', JSON.stringify(mappedData));

                    multiFile.forEach((file) => {
                        payload.append('Files', file);
                    });

                    if (isEdited && editCircularData) {
                        editCircularData(payload, resetForm);
                    } else if (addCircularData) {
                        addCircularData(payload, resetForm);
                    }
                }}
            >
                {({ values, handleChange, handleBlur, setFieldValue, }) => (
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <fieldset className="border rounded-3 p-3">
                                        <legend className="float-none w-auto px-2 text-sm text-slate-700 mb-0">Circular <span className='text-primary'> Details</span></legend>
                                        <Row>
                                            <Col md={12}>
                                                <Textfield
                                                    label="Circular Title"
                                                    name="circularTitle"
                                                    placeholder='Enter Circular Title'
                                                    id="circularTitle"
                                                    tabIndex={1}
                                                    maxLength={100}
                                                    required
                                                    value={values.circularTitle}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="circularTitle" className='ErrorMessage' component="div" />
                                            </Col>

                                            <Col md={6} className='mt-3'>
                                                <SelectField
                                                    label='Circular Type'
                                                    name="circularTypeValue"
                                                    required
                                                    options={[
                                                        { value: "", label: "Select Circular Type" },
                                                        ...circularTypeData.map((items) => ({ value: items.TRAN_CD, label: items.NAME }))
                                                    ]}
                                                    tabIndex={2}
                                                    placeholder="Circular Type"
                                                    value={values.circularTypeValue !== '' ? {
                                                        value: values.circularTypeValue,
                                                        label: values.circularTypeLabel,
                                                    } : null}
                                                    onChange={(e: any) => {
                                                        setFieldValue("circularTypeValue", e?.value);
                                                        setFieldValue("circularTypeLabel", e?.label);
                                                    }}
                                                />
                                                <ErrorMessage name="circularTypeValue" className='ErrorMessage' component="div" />
                                            </Col>

                                            <Col md={6} className='mt-2'>
                                                <label className='form-label text-xs text-slate-500'>For User</label>
                                                <div className="d-flex align-items-center gap-2">
                                                    <RadioBtn
                                                        label="Internal"
                                                        name="foruser"
                                                        value="A"
                                                        tabIndex={3}
                                                        checked={values.foruser === "A"}
                                                        onChange={handleChange}
                                                    />
                                                    <RadioBtn
                                                        label="External"
                                                        name="foruser"
                                                        value='C'
                                                        tabIndex={4}
                                                        checked={values.foruser === "C"}
                                                        onChange={handleChange}
                                                    />
                                                    <RadioBtn
                                                        label="Both"
                                                        name="foruser"
                                                        value='B'
                                                        tabIndex={5}
                                                        checked={values.foruser === "B"}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Col>



                                            <Col sm={3} className="mt-3">
                                                <Datepicker
                                                    className="form-control"
                                                    placeholder='Select Start Date'
                                                    label='Start Date'
                                                    name="startDt"
                                                    value={values.startDt}
                                                    size="small"
                                                    required
                                                    tabIndex={7}
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        minDate: !isEdited ? "today" : "",
                                                    }}
                                                    onChange={(e: any) => setFieldValue("startDt", e)}
                                                />
                                                <ErrorMessage name="startDt" component="div" className="ErrorMessage" />
                                            </Col>

                                            <Col sm={3} className="mt-3">
                                                <Datepicker
                                                    className="form-control"
                                                    label='End Date'
                                                    placeholder='Select End Date'
                                                    name="endDt"
                                                    value={values.endDt}
                                                    size="small"
                                                    required
                                                    tabIndex={8}
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        minDate: !isEdited ? "today" : "",
                                                        maxDate: values.startDt?.[0] ? moment(values.startDt[0]).add(90, 'days').format('DD-MM-YYYY') : "",
                                                    }}
                                                    onChange={(e: any) => setFieldValue("endDt", e)}
                                                />
                                                <ErrorMessage name="endDt" component="div" className="ErrorMessage" />
                                            </Col>

                                            <Col md={3} className='mt-3 d-flex align-items-center'>
                                                <Checkbox
                                                    label="Email Alerts"
                                                    name="emailAlrts"
                                                    tabIndex={6}
                                                    value={values.emailAlrts}
                                                    checked={values.emailAlrts === "Y"}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        setFieldValue("emailAlrts", e.target.checked ? "Y" : "N");
                                                    }}
                                                />
                                            </Col>

                                            <Col md={12} className="mt-3">
                                                <Editor
                                                    label='Description'
                                                    required
                                                    value={values.description}
                                                    onChange={(e: any) => setFieldValue("description", e)}
                                                />
                                                <ErrorMessage name="description" className='ErrorMessage' component="div" />
                                            </Col>

                                            {/* File Attachment */}
                                            <Col md={12} className="mt-4">
                                                <FileInput
                                                    title="Attach a validation reference file"
                                                    description="Document scale restriction up to 5 MB"
                                                    files={multiFile}
                                                    setFiles={setMultiFile}
                                                    accept=".pdf,.doc,.docx,.txt"
                                                    multiple={true}
                                                    maxSizeMB={5}
                                                    maxHeight="250px"
                                                    remoteFiles={
                                                        state?.data?.[0]?.FileName
                                                            ? [
                                                                {
                                                                    fileName: state.data[0].FileName,
                                                                    fileBase64: state.data[0].FileBase64,
                                                                    fileContentType: state.data[0].FileContentType,
                                                                },
                                                            ]
                                                            : []
                                                    }
                                                    onDownload={downloadFile}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                {isEdited && state?.data?.[0]?.FileName && (
                                                    <div className="d-flex align-items-center mt-3">
                                                        <div className="border rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: 35, height: 35 }}>
                                                            <File />
                                                        </div>
                                                        <h5 className="text-sm mb-1">{state.data[0].FileName}</h5>
                                                        <Button
                                                            variant='outline-success'
                                                            className='rounded-circle btn-sm ms-auto'
                                                            onClick={() => downloadFile(state?.data?.[0]?.FileBase64, state?.data?.[0]?.FileName, state?.data?.[0]?.FileContentType)}
                                                        >
                                                            <Download />
                                                        </Button>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </fieldset>
                                </Col>

                                <Col md={4}>
                                    <div className="d-none d-md-block">
                                        <Note data={CircularForNote} />
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEdited ? 'Save Changes' : 'Submit'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CircularMdl;
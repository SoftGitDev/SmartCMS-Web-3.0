// Purpose: Announcement Modal screen
// Created by: Harish 
// Created Date: 03-06-2026

import React, { useRef, useState } from 'react';
import { ArrowDownNarrowWide, File, Link, Trash } from 'lucide-react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import Editor from '../../../components/ui/editor/Editor';
import Datepicker from '../../../components/ui/datePicker/Datepicker';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import RadioBtn from '../../../components/ui/Radio/RadioBtn';
import Textfield from '../../../components/ui/TextField/TextInput';
import Note from '../../../utils/Note';
import { AnnouncementNote } from '../../data/note';
// import moment from 'moment';

interface AnnouncementMdlProps {
    show: boolean;
    handleClose: () => void;
    isEdited?: boolean;
    initialData?: any;
    state?: {
        data: Array<{
            FileName?: string;
            FileBase64?: string;
            FileContentType?: string;
        }>;
    };
    downloadFile?: (base64: any, name: any, contentType: any) => void;
}

// 📜 Form Validation Schema matching your field structures
const AnnouncementValidationSchema = Yup.object().shape({
    announcementTitle: Yup.string()
        .max(100, 'Title cannot exceed 100 characters')
        .required('Announcement Title is required'),
    foruser: Yup.string().required('Please select a target user audience'),
    startDt: Yup.mixed().required('Start date is required'),
    endDt: Yup.mixed().required('End date is required'),
    description: Yup.string().required('Description content body is required'),
});

const AnnouncementMdl: React.FC<AnnouncementMdlProps> = ({
    show,
    handleClose,
    isEdited = false,
    initialData,
    state,
    downloadFile = () => { }
}) => {
    const attanchmentRef = useRef<HTMLInputElement>(null);

    // Internal operational states matching your custom file upload routines
    const [multiFile, setMultiFile] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        Title: '',
        ACFor: 'A',
        PopupAlert: 'N',
        EmailAlert: 'N',
        StartDate: '',
        EndDate: '',
        Description: ''
    });

    // Baseline Formik initial values fallback
    const formInitialValues = {
        announcementTitle: initialData?.Title || '',
        foruser: initialData?.ACFor || 'A',
        popupAlrts: initialData?.PopupAlert || 'N',
        emailAlrts: initialData?.EmailAlert || 'N',
        startDt: initialData?.StartDate || '',
        endDt: initialData?.EndDate || '',
        description: initialData?.Description || '',
    };

    // Simulated handler mappings from your dashboard code setup
    const attachfiles = () => attanchmentRef.current?.click();

    const handleMultiFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setMultiFile([...multiFile, e.target.files[0]]);
        }
    };

    const handleFormSubmit = (values: typeof formInitialValues) => {
        console.log("Submitting structured Announcement Payload Data:", { values, formData, multiFile });
        // Trigger save API hooks here
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-md font-semibold text-slate-800">
                    {isEdited ? "Edit Announcement" : "Create New Announcement"}
                </Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={formInitialValues}
                validationSchema={AnnouncementValidationSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {({ values, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col lg={8}>
                                    <fieldset className="border rounded-3 p-3">
                                        <legend className="float-none w-auto px-2 text-sm text-slate-700 mb-0 fw-semibold">
                                            Announcement <span className='text-primary'> Configuration Details </span>
                                        </legend>
                                        <Row>
                                            {/* Title Field */}
                                            <Col md={12} className="mb-2">
                                                <Textfield

                                                    label="Title"
                                                    name="announcementTitle"
                                                    id="announcementTitle"
                                                    placeholder='Enter a announcement title '
                                                    tabIndex={1}
                                                    maxLength={100}
                                                    required
                                                    value={values.announcementTitle}
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                        setFormData({ ...formData, Title: e.target.value });
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="announcementTitle" className='ErrorMessage' component="div" />
                                            </Col>

                                            {/* Target Audience Radio Group */}
                                            <Col md={6} className='mt-2'>
                                                <label className='form-label text-xs text-slate-500 d-block mb-1.5'>For User</label>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <RadioBtn
                                                        label="Internal"
                                                        name="foruser"
                                                        value="A"
                                                        checked={values.foruser === "A"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ACFor: "A" }) }}
                                                    />
                                                    <RadioBtn
                                                        label="External"
                                                        name="foruser"
                                                        value='C'
                                                        checked={values.foruser === "C"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ACFor: "C" }) }}
                                                    />
                                                    <RadioBtn
                                                        label="Both"
                                                        name="foruser"
                                                        value='B'
                                                        checked={values.foruser === "B"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ACFor: "B" }) }}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Alert Modalities Checkboxes */}
                                            <Col md={3} className='mt-4 d-flex align-items-center'>
                                                <Checkbox
                                                    label="Pop-up Alerts"
                                                    name='popupAlrts'
                                                    checked={values.popupAlrts === "Y"}
                                                    value={values.popupAlrts}
                                                    onChange={(e: any) => {
                                                        setFieldValue("popupAlrts", e.target.checked ? "Y" : "N");
                                                        setFormData({ ...formData, PopupAlert: e.target.checked ? "Y" : "N" });
                                                    }}
                                                />
                                            </Col>

                                            <Col md={3} className='mt-4 d-flex align-items-center'>
                                                <Checkbox
                                                    label="Email Alerts"
                                                    name='emailAlrts'
                                                    checked={values.emailAlrts === "Y"}
                                                    value={values.emailAlrts}
                                                    onChange={(e: any) => {
                                                        setFieldValue("emailAlrts", e.target.checked ? "Y" : "N");
                                                        setFormData({ ...formData, EmailAlert: e.target.checked ? "Y" : "N" });
                                                    }}
                                                />
                                            </Col>

                                            {/* Start Datepicker */}
                                            <Col md={6} className="mt-3">
                                                <Datepicker
                                                    className="form-control"
                                                    label='Start Date'
                                                    placeholder='Select Start Date'
                                                    name="startDt"
                                                    required
                                                    value={values.startDt}
                                                    size="small"
                                                    tabIndex={8}
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        minDate: !isEdited ? "today" : "",
                                                    }}
                                                    onChange={(e: any) => { setFieldValue("startDt", e); setFormData({ ...formData, StartDate: e }) }}
                                                />
                                                <ErrorMessage name="startDt" component="div" className="ErrorMessage" />
                                            </Col>

                                            {/* End Datepicker */}
                                            <Col md={6} className="mt-3">
                                                <Datepicker
                                                    className="form-control"
                                                    label='End Date'
                                                    placeholder='Select End Date'

                                                    name="endDt"
                                                    required
                                                    value={values.endDt}
                                                    size="small"
                                                    tabIndex={9}
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        minDate: !isEdited ? "today" : "",
                                                        // ✅ Safely adds 90 days using native timestamps
                                                        maxDate: values.startDt && values.startDt[0]
                                                            ? new Date(new Date(values.startDt[0]).getTime() + 90 * 24 * 60 * 60 * 1000)
                                                            : "",
                                                        // maxDate: values.startDt ? moment(values.startDt[0]).add(90, 'days').format('DD-MM-YYYY') : "",
                                                    }}
                                                    onChange={(e: any) => { setFieldValue("endDt", e); setFormData({ ...formData, EndDate: e }) }}
                                                />
                                                <ErrorMessage name="endDt" component="div" className="ErrorMessage" />
                                            </Col>

                                            {/* Custom Rich Text Editor Block */}
                                            <Col md={12} className="mt-3">
                                                <Editor
                                                    label='Description'
                                                    required
                                                    value={values.description}
                                                    onChange={(e: any) => {
                                                        setFieldValue("description", e);
                                                        setFormData({ ...formData, Description: e });
                                                    }}
                                                />
                                                <ErrorMessage name="description" className='ErrorMessage' component="div" />
                                            </Col>

                                            {/* File Attachment Pipeline Row */}
                                            <Col md={12} className='mt-4'>
                                                <input
                                                    type="file"
                                                    name="attachFile"
                                                    className="d-none"
                                                    ref={attanchmentRef}
                                                    accept=".pdf,.doc,.docx,.txt"
                                                    onChange={handleMultiFile}
                                                    onBlur={handleBlur}
                                                />

                                                <span className="d-flex align-items-center" onClick={attachfiles} style={{ cursor: "pointer", width: 'fit-content' }}>
                                                    <div className="border rounded-circle d-flex justify-content-center align-items-center me-2 border-orange" style={{ width: 35, height: 35 }}>
                                                        <Link size={16} className="text-orange" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm mb-0 font-semibold text-slate-700">Attach a validation reference file</h5>
                                                        <div className="text-xs text-slate-500">Document scale restriction up to 5 MB</div>
                                                    </div>
                                                </span>

                                                {/* Local file loop rendering */}
                                                <div className='mt-2'>
                                                    {multiFile.map((file: any, id: number) => {
                                                        const fileSize = file.size >= 1048576 ? (file.size / 1048576).toFixed(2) + " MB" : (file.size / 1024).toFixed(2) + " KB";
                                                        return (
                                                            <div key={id} className="d-flex align-items-center mt-2 p-2 bg-light rounded border">
                                                                <div className="border rounded-circle d-flex justify-content-center align-items-center me-3 bg-white" style={{ width: 35, height: 35 }}>
                                                                    <File size={16} className="text-muted" />
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-sm mb-0 font-medium text-slate-700">{file.name}</h5>
                                                                    <div className="text-xs text-slate-500">File Size : {fileSize}</div>
                                                                </div>
                                                                <Button variant='outline-danger' className='rounded-circle btn-sm ms-auto d-flex justify-content-center align-items-center' style={{ width: 30, height: 30, padding: 0 }}
                                                                    onClick={() => {
                                                                        let selectedFile = [...multiFile];
                                                                        selectedFile.splice(id, 1);
                                                                        setMultiFile(selectedFile);
                                                                    }}>
                                                                    <Trash size={14} />
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}

                                                    {/* Remote database file pipeline check */}
                                                    {state?.data?.[0]?.FileName && (
                                                        <>
                                                            <hr className="my-3 text-slate-200" />
                                                            <div className="d-flex align-items-center p-2 bg-light rounded border">
                                                                <div className="border rounded-circle d-flex justify-content-center align-items-center me-3 bg-white" style={{ width: 35, height: 35 }}>
                                                                    <File size={16} />
                                                                </div>
                                                                <h5 className="text-sm mb-0 text-slate-700 font-medium">{state.data[0].FileName}</h5>
                                                                <Button variant='outline-success' className='rounded-circle btn-sm ms-auto d-flex justify-content-center align-items-center' style={{ width: 30, height: 30, padding: 0 }}
                                                                    onClick={() => downloadFile(state.data[0].FileBase64, state.data[0].FileName, state.data[0].FileContentType)}>
                                                                    <ArrowDownNarrowWide size={14} />
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                </Col>

                                {/* Note */}
                                <Col className="d-none d-md-block">
                                    <Note data={AnnouncementNote} />
                                </Col>
                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="light" className="px-3" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" className="px-3">
                                {isEdited ? "Update Changes" : "Save Announcement"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default AnnouncementMdl;
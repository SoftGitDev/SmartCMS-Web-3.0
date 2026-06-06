import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, CardBody, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Minus, Send, X } from 'lucide-react';

import Textfield from '../../../common/components/ui/TextField/TextInput';
import Editor from '../../../common/components/ui/editor/Editor';

interface EmailAddProps {
    show?: boolean;
    handleClose: () => void;
}

const EmailAdd: React.FC<EmailAddProps> = ({ show = false, handleClose, }) => {
    const [showCc, setShowCc] = useState<boolean>(false);
    const [showBcc, setShowBcc] = useState<boolean>(false);

    const handleCloseMdl = () => {
        handleClose();
        setShowCc(false);
        setShowBcc(false);
    };

    const initialValues = {
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
    };

    const validationSchema = Yup.object({
        to: Yup.string()
            .email('Invalid email address')
            .required('Recipient is required'),
        cc: Yup.string().email('Invalid email address'),
        bcc: Yup.string().email('Invalid email address'),
        subject: Yup.string(),
        body: Yup.string(),
    });

    return (
        <Card style={{ height: '80vh' }}>
            <CardBody className="d-flex flex-column p-0">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-light border-bottom">
                    <span className="fw-medium text-dark">
                        New Message
                    </span>

                    <div className="d-flex align-items-center gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip id="minimize-tooltip">Minimize</Tooltip>}>
                            <Button type="button" variant="link" onClick={handleCloseMdl} className="p-1 text-muted border-0 shadow-none"                            >
                                <Minus size={14} />
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={<Tooltip id="close-tooltip">Close</Tooltip>}>
                            <Button type="button" variant="link" onClick={handleCloseMdl} className="p-1 text-muted border-0 shadow-none"                            >
                                <X size={15} />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log('Email Data Submitted:', values);
                        resetForm();
                        setShowCc(false);
                        setShowBcc(false);
                        handleClose();
                    }}
                >
                    {({ values, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
                        <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                            {/* To */}
                            <div className="d-flex align-items-center border-bottom px-3 position-relative">
                                <div className="flex-grow-1">
                                    <Textfield
                                        label=""
                                        placeholder="To"
                                        name="to"
                                        id="to"
                                        value={values.to}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ border: 'none', boxShadow: 'none', height: '44px', }}
                                    />
                                </div>

                                <div className="d-flex gap-2 position-absolute end-0 me-3 bg-white" style={{ fontSize: '12px' }}        >
                                    {!showCc && (
                                        <span className="text-muted" style={{ cursor: 'pointer' }} onClick={() => setShowCc(true)}                >
                                            Cc
                                        </span>
                                    )}

                                    {!showBcc && (
                                        <span className="text-muted" style={{ cursor: 'pointer' }} onClick={() => setShowBcc(true)}                >
                                            Bcc
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ErrorMessage name="to" component="div" className="ErrorMessage px-3" />

                            {/* CC */}
                            {showCc && (
                                <div className="border-bottom px-3">
                                    <Textfield
                                        label=""
                                        placeholder="Cc"
                                        name="cc"
                                        id="cc"
                                        value={values.cc}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ border: 'none', boxShadow: 'none', height: '44px', }}
                                    />

                                    <ErrorMessage name="cc" component="div" className="ErrorMessage" />
                                </div>
                            )}

                            {/* BCC */}
                            {showBcc && (
                                <div className="border-bottom px-3">
                                    <Textfield
                                        label=""
                                        placeholder="Bcc"
                                        name="bcc"
                                        id="bcc"
                                        value={values.bcc}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ border: 'none', boxShadow: 'none', height: '44px', }}
                                    />
                                    <ErrorMessage name="bcc" component="div" className="ErrorMessage" />
                                </div>
                            )}

                            {/* Subject */}
                            <div className="border-bottom px-3">
                                <Textfield
                                    label=""
                                    placeholder="Subject"
                                    name="subject"
                                    id="subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ border: 'none', boxShadow: 'none', height: '44px', }}
                                />
                            </div>

                            {/* Editor */}
                            <div className="flex-grow-1 p-3 overflow-auto">
                                <Editor
                                    value={values.body}
                                    placeholder="Type your content here..."
                                    onChange={(_: any, editor: any) => {
                                        setFieldValue('body', editor.getData());
                                    }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="border-top d-flex justify-content-end gap-3 px-3 py-2">
                                <Button variant='light'>
                                    Close
                                </Button>
                                <Button className='submit' onClick={() => handleSubmit}>
                                    <Send size={15} className='me-1' />  Send
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </CardBody>
        </Card>
    );
};

export default EmailAdd;
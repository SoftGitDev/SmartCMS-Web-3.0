import { ErrorMessage, Form, Formik } from 'formik';
import { BadgeCheck, Copy, KeySquare, Loader, LoaderCircle, Mail, MessageSquare, Shield } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { Accordion, Button, Col, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import Editor from '../../../components/ui/editor/Editor';
import toastNotify from '../../../utils/tostNotify';
import * as urls from '../../../utils/url';
import * as Yup from "yup";
import { apiRequest } from '../../../utils/apiRequest';
import { SweetAlerts } from '../../../utils/sweetAlert';
import TextArea from '../../../components/ui/textArea/TextArea';
import Checkbox from '../../../components/ui/checkBox/Checkbox';
import Textfield from '../../../components/ui/TextField/TextInput';

// Define the initial values type
interface MailSMSTemplateFormValues {
    templateName: string;
    mailSubject: string;
    smsSubject: string;
    mailDescription: string;
    smsDescription: string;
    mailStatus: boolean;
    unicode: boolean;
    smsStatus: boolean;
    whatsAppStatus: boolean;
    tempId: string;
    tempIdLbl: string;
    whatsAppDesc: string;
    whatsAppTempId: string
}

type AddMailSMSTemplateProps = {
    show: boolean;
    handleClose: () => void;
    onSubmit?: (values: MailSMSTemplateFormValues) => void;
    editedData?: any;
    getMailSmsTemplateList?: any;
};

const mailSMSTemplateValidationSchema = Yup.object().shape({
    templateName: Yup.string().required('Template name is required'),
    mailSubject: Yup.string().required('Mail subject is required'),
    mailDescription: Yup.string().required('Mail content is required'),
    smsDescription: Yup.string().required('SMS content is required'),
    whatsAppDesc: Yup.string().required('WhatsApp content is required'),
    tempId: Yup.string().required('SMS Template Id is required'),
    whatsAppTempId: Yup.string().required('WhatsApp Template Id is required'),
});

const AddMailSMSTemplate: React.FC<AddMailSMSTemplateProps> = ({ show, handleClose, editedData, getMailSmsTemplateList }) => {

    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [keywordGroups, setKeywordGroups] = useState<any[]>([]);
    const [keywordData, setKeywordData] = useState<{ [key: number]: any[] }>({});
    const [isKeywordLoader, setIsKeywordLoader] = useState<boolean>(false);
    const [loadingGroups, setLoadingGroups] = useState<{ [key: number]: boolean }>({});
    const [mailSMSActiveTab, setMailSMSActiveTab] = useState<string>('mailconfig')

    // Initial values with proper typing
    const initialValues: MailSMSTemplateFormValues = {
        templateName: editedData?.templateNm || "",
        mailSubject: editedData?.subject || "",
        smsSubject: editedData?.Subject || "",
        mailDescription: editedData?.mailDescription || "",
        smsDescription: editedData?.smsDescription || "",
        mailStatus: editedData?.mailStatus || false,
        unicode: editedData?.unicode || false,
        smsStatus: editedData?.smsStatus || false,
        whatsAppStatus: editedData?.whatsAppStatus || false,
        tempId: editedData?.smsTemplateId || "",
        tempIdLbl: editedData?.tempIdLbl || "",
        whatsAppTempId: editedData?.whatsAppTempId || "",
        whatsAppDesc: editedData?.whatsAppDesc || "",
    };

    // Add New Templete
    const addMailSmsTemplate = useCallback(async (values: MailSMSTemplateFormValues) => {
        try {

            setIsLoader(true);
            const payload = {
                templateNm: values.templateName,
                subject: values.mailSubject, // Using mail subject as primary subject
                mailDescription: values.mailDescription,
                smsDescription: values.smsDescription,
                mailStatus: values.mailStatus,
                unicode: values.unicode,
                smsStatus: values.smsStatus,
                smsTempId: values.tempId,
            };

            const result = await apiRequest("POST", urls.addMailSmsTemplate, payload);

            if (result.status === "200" && result.success) {
                handleClose();
                getMailSmsTemplateList();
            } else {
                SweetAlerts("Error !", result?.message, "error");
            }
        } catch (err) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, [handleClose]);


    // Update Template
    const editMailSmsTemplate = useCallback(async (values: MailSMSTemplateFormValues) => {
        try {
            setIsLoader(true);
            const payload = {
                templateNm: values.templateName,
                subject: values.mailSubject, // Using mail subject as primary subject
                mailDescription: values.mailDescription,
                smsDescription: values.smsDescription,
                mailStatus: values.mailStatus,
                unicode: values.unicode,
                smsStatus: values.smsStatus,
                smsTempId: values.tempId,
                tempCode: editedData?.templateCode,
            };

            const result = await apiRequest("POST", urls.editMailSmsTemplate, payload);

            if (result.status === "200" && result.success) {
                handleClose();
                getMailSmsTemplateList();
            } else {
                SweetAlerts("Error !", result?.message, "error");
            }
        } catch (err) {
            // Ignore Case
        } finally {
            setIsLoader(false);
        }
    }, [handleClose]);


    // Get Keyword Group List
    const getAPIGroups = async () => {
        try {
            setIsKeywordLoader(true);
            const payload = {
                type: "TEMP",
                subType: "EMAIL_API",
            };
            const config = {};
            const result = await apiRequest("POST", urls.getKeywordGroupList, payload, config);
            if (result.status === "200" && result.success) {
                setKeywordGroups(result.response);
            } else {
                setKeywordGroups([]);
            }
        } catch {
            //   Ignore Case
        } finally {
            setIsKeywordLoader(false);
        }
    };

    // Updated getAPIGroupKeyword function - loads keywords for specific group
    const getAPIGroupKeyword = async (keywordCode: number) => {
        if (keywordData[keywordCode]) {
            return;
        }

        try {
            setLoadingGroups(prev => ({ ...prev, [keywordCode]: true }));
            const payload = {
                keywordCode: keywordCode,
            };
            const config = {};
            const result = await apiRequest("POST", urls.getKeywordList, payload, config);
            if (result.status === '200' && result.success) {
                setKeywordData(prev => ({
                    ...prev,
                    [keywordCode]: result.response
                }));
            } else {
                setKeywordData(prev => ({
                    ...prev,
                    [keywordCode]: []
                }));
            }
        } catch {
            // Ignore Case
        } finally {
            setLoadingGroups(prev => ({ ...prev, [keywordCode]: false }));
        }
    };

    const handleAccordionToggle = (keywordCode: number) => {
        getAPIGroupKeyword(keywordCode);
    };

    // useEffect(() => {
    //     getAPIGroups()
    // }, []);

    console.log('mailSMSActiveTab', mailSMSActiveTab);

    const handleMailSMSTab = (tab: string) => {
        setMailSMSActiveTab(tab)
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl" >
                <div className="modal-content border-0 shadow-lg">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={mailSMSTemplateValidationSchema}
                        onSubmit={(values) => {
                            if (editedData) {
                                editMailSmsTemplate(values);
                            } else
                                addMailSmsTemplate(values);
                        }}
                    >
                        {({ values, handleChange, handleBlur, setFieldValue }) => {
                            return (
                                <Form>
                                    <Modal.Header className="border-0" >
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                                                <Shield size={24} />
                                            </div>
                                            <div>
                                                <h6 className="mb-0">{editedData ? 'Edit Template' : 'Add New Template'}</h6>
                                                <span className="text-md fw-muted">Configure template settings</span>
                                            </div>
                                        </div>
                                        <button type="button" className="btn-close btn-close-white" onClick={handleClose} style={{ marginLeft: 'auto' }} />
                                    </Modal.Header>

                                    <Modal.Body className="mt-0">
                                        <Row>
                                            <Col md={8} lg={8}>
                                                <Row>
                                                    <Col md={8} className='mb-3'>
                                                        <Textfield
                                                            label="Template Name"
                                                            name="templateName"
                                                            placeholder="Enter template name"
                                                            maxLength={100}
                                                            required
                                                            tabIndex={1}
                                                            value={values.templateName}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <ErrorMessage name="templateName" component="div" className="ErrorMessage" />
                                                    </Col>

                                                    <Col md={4} className='mt-4'>
                                                        {mailSMSActiveTab === 'mailconfig' && (
                                                            <Checkbox
                                                                label="Mail Status"
                                                                name='mailStatus'
                                                                tabIndex={3}
                                                                checked={values.mailStatus === true}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue("mailStatus", e.target.checked);
                                                                }}
                                                            />
                                                        )}

                                                        {mailSMSActiveTab === 'smsconfig' && (
                                                            <Checkbox
                                                                label="SMS Status"
                                                                name='smsStatus'
                                                                tabIndex={5}
                                                                checked={values.smsStatus === true}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue("smsStatus", e.target.checked);
                                                                }}
                                                            />
                                                        )}

                                                        {mailSMSActiveTab === 'whatsAppConfig' && (
                                                            <Checkbox
                                                                label="WhatsApp Status"
                                                                name='whatsAppStatus'
                                                                tabIndex={5}
                                                                checked={values.whatsAppStatus === true}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue("whatsAppStatus", e.target.checked);
                                                                }}
                                                            />
                                                        )}
                                                    </Col>
                                                </Row>

                                                <div className='border rounded-3 mt-3'>
                                                    <Tabs defaultActiveKey={mailSMSActiveTab} onSelect={(key) => handleMailSMSTab(key as string)} id="custom-tabs" className="custom-tab-bar bg-white rounded-3 mb-3">

                                                        <Tab eventKey="mailconfig" title={<><Mail size={16} className='me-1' /> Mail Configurations</>} className='h-75'>
                                                            <Row className="g-3 px-3">
                                                                <Col md={8}>
                                                                    <Textfield
                                                                        label="Mail Subject"
                                                                        name="mailSubject"
                                                                        placeholder="Enter subject"
                                                                        value={values.mailSubject}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        maxLength={100}
                                                                        required
                                                                        tabIndex={2}
                                                                    />
                                                                    <ErrorMessage name="mailSubject" component="div" className="ErrorMessage" />
                                                                </Col>


                                                                <div className='mb-4'>
                                                                    <Editor
                                                                        label="Mail Content"
                                                                        value={values.mailDescription}
                                                                        onChange={(event: any, editor: any) => {
                                                                            const data = editor?.getData?.();
                                                                            if (data) {
                                                                                setFieldValue("mailDescription", data);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <ErrorMessage name="mailDescription" component="div" className="ErrorMessage" />
                                                                </div>

                                                                {/* <Col md={2} className='pb-3' style={{ marginTop: 20 }}>
                                                                    <Checkbox
                                                                        label="Mail Status"
                                                                        name='mailStatus'
                                                                        tabIndex={3}
                                                                        checked={values.mailStatus === true}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("mailStatus", e?.target.checked);
                                                                        }}
                                                                    />
                                                                </Col> */}
                                                            </Row>
                                                        </Tab>

                                                        {/* sms */}
                                                        <Tab eventKey="smsconfig" title={<><MessageSquare size={16} className='me-1' /> SMS Configurations</>} className='h-75'>
                                                            <Row className="g-3 px-3">

                                                                <Col md={6} className=''>
                                                                    <Textfield
                                                                        label="SMS Template Id"
                                                                        name="tempId"
                                                                        placeholder="Enter SMS Template Id"
                                                                        value={values.tempId}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            e.preventDefault();
                                                                            const { value } = e.target;
                                                                            const regex = /^[0-9]*[.,]?[0-9]*$/;
                                                                            if (regex.test(value.toString())) {
                                                                                setFieldValue("tempId", value);
                                                                            }
                                                                        }}
                                                                        maxLength={50}
                                                                        onBlur={handleBlur}
                                                                        required
                                                                        tabIndex={4}
                                                                    />
                                                                    <ErrorMessage name="tempId" component="div" className="ErrorMessage" />
                                                                </Col>
                                                                <Col md={3} className='mt-5 '>
                                                                    <Checkbox
                                                                        label="Unicode"
                                                                        name='unicode'
                                                                        tabIndex={3}
                                                                        checked={values.unicode === true}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("unicode", e?.target.checked);
                                                                        }}
                                                                    />
                                                                </Col>

                                                                <div className='mt-2 mb-3'>
                                                                    <TextArea
                                                                        label="SMS Content"
                                                                        name="smsDescription"
                                                                        placeholder='Enter SMS Content'
                                                                        required
                                                                        maxLength={400}
                                                                        tabIndex={5}
                                                                        value={values.smsDescription}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />

                                                                    <ErrorMessage name="smsDescription" component="div" className="ErrorMessage" />
                                                                </div>

                                                                {/* <Col md={2} className='pb-3' style={{ marginTop: 20 }}>
                                                                    <Checkbox
                                                                        label="SMS Status"
                                                                        name='smsStatus'
                                                                        tabIndex={5}
                                                                        checked={values.smsStatus === true}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("smsStatus", e?.target.checked);
                                                                        }}
                                                                    />
                                                                </Col> */}
                                                            </Row>
                                                        </Tab>

                                                        {/* WhatsApp Configuration */}
                                                        <Tab eventKey="whatsAppConfig" title={<><MessageSquare size={16} className='me-1' /> WhatsApp Configurations</>} className='h-75'>
                                                            <Row className="g-3 px-3">
                                                                <Col md={6} className=''>
                                                                    <Textfield
                                                                        label="WhatsApp Template Id"
                                                                        name="whatsAppTempId"
                                                                        placeholder="Enter WhatsApp Template Id"
                                                                        value={values.whatsAppTempId}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            e.preventDefault();
                                                                            const { value } = e.target;
                                                                            const regex = /^[0-9]*[.,]?[0-9]*$/;
                                                                            if (regex.test(value.toString())) {
                                                                                setFieldValue("whatsAppTempId", value);
                                                                            }
                                                                        }}
                                                                        maxLength={50}
                                                                        onBlur={handleBlur}
                                                                        required
                                                                        tabIndex={4}
                                                                    />
                                                                    <ErrorMessage name="whatsAppTempId" component="div" className="ErrorMessage" />
                                                                </Col>

                                                                <div className='mt-2 mb-3'>
                                                                    <TextArea
                                                                        label="WhatsApp Content"
                                                                        name="whatsAppDesc"
                                                                        placeholder='Enter WhatsApp Content'
                                                                        required
                                                                        maxLength={400}
                                                                        tabIndex={5}
                                                                        value={values.whatsAppDesc}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />

                                                                    <ErrorMessage name="whatsAppDesc" component="div" className="ErrorMessage" />
                                                                </div>

                                                                {/* <Col md={2} className='pb-3' style={{ marginTop: 20 }}>
                                                                    <Checkbox
                                                                        label="SMS Status"
                                                                        name='smsStatus'
                                                                        tabIndex={5}
                                                                        checked={values.smsStatus === true}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("smsStatus", e?.target.checked);
                                                                        }}
                                                                    />
                                                                </Col> */}
                                                            </Row>
                                                        </Tab>
                                                    </Tabs>
                                                </div>
                                            </Col>
                                            <Col md={4} lg={4}>
                                                <div className="mb-3 border rounded-4 overflow-auto" style={{ minHeight: "60px", maxHeight: "440px" }}>
                                                    {isKeywordLoader ? (
                                                        <div className="d-flex justify-content-center align-items-center" style={{ height: "440px" }}>
                                                            <LoaderCircle className='icon-loader text-white text-lg' />
                                                        </div>
                                                    ) : (
                                                        <Accordion defaultActiveKey='0' flush>
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header className="sticky-top">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="p-2 bg-primary-50 icon-wrapper text-primary rounded me-3"> <KeySquare size={20} className='text-primary' /> </div>
                                                                        <div>
                                                                            <h6 className="m-0 fw-bold text-dark">Template Variables</h6>
                                                                            <small className="text-muted">Use these to replace keyword with values</small>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Header>

                                                                <Accordion.Body className="p-2">
                                                                    {/* Nested Accordion for Groups */}
                                                                    <Accordion flush>
                                                                        {keywordGroups.map((group, index) => (
                                                                            <Accordion.Item eventKey={group.keywordCode.toString()} key={group.keywordCode}>
                                                                                <Accordion.Header onClick={() => handleAccordionToggle(group.keywordCode)} >
                                                                                    <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                                                                        <div>
                                                                                            <div className="fw-semibold text-primary text-sm"> {group.groupName} </div>
                                                                                            <div className="text-muted text-xs">  Click to view keywords </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </Accordion.Header>

                                                                                <Accordion.Body className="p-2">
                                                                                    {loadingGroups[group.keywordCode] ? (
                                                                                        <div className="d-flex justify-content-center py-3">
                                                                                            <Loader />
                                                                                        </div>
                                                                                    ) : keywordData[group.keywordCode] && keywordData[group.keywordCode].length > 0 ? (
                                                                                        keywordData[group.keywordCode].map((keyword: any, i: number) => (
                                                                                            <div key={i} className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2 variable-item cursor-pointer" >
                                                                                                <div className="flex-grow-1">
                                                                                                    <div className="fw-semibold text-dark text-sm"> {keyword.key} </div>
                                                                                                    <div className="text-muted text-xs"> {keyword.description} </div>
                                                                                                </div>

                                                                                                <button type="button" className="btn btn-light btn-sm rounded-circle flex-shrink-0" title="Copy key" onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    const textToCopy = keyword.Key;
                                                                                                    navigator.clipboard.writeText(textToCopy);
                                                                                                    toastNotify(`${textToCopy} copied!`, "success");
                                                                                                }}
                                                                                                > <Copy className="text-primary" size={14} /> </button>
                                                                                            </div>
                                                                                        ))
                                                                                    ) : (
                                                                                        <div className="text-center text-muted py-3 text-sm">  No keywords available </div>
                                                                                    )}
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        ))}

                                                                        {keywordGroups.length === 0 && (
                                                                            <div className="text-center text-muted py-4">
                                                                                No groups available
                                                                            </div>
                                                                        )}
                                                                    </Accordion>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>



                                    </Modal.Body>

                                    <Modal.Footer className="border-0">
                                        <Button variant="light" type="button" className='py-2' onClick={handleClose}>
                                            Cancel
                                        </Button>

                                        {/* <Button variant="primary" className='py-2' type="submit">
                                            <BadgeCheck size={18} className='me-2' />{isLoader ? 'Saving...' : editedData ? 'Update' : 'Save'}
                                        </Button> */}
                                        <Button type="submit" variant="primary" disabled={isLoader} tabIndex={14} >
                                            {isLoader ? <><LoaderCircle size={16} className="bx-spin text-white text-lg" /> Loading...</> : <>
                                                {editedData ? "Update" : 'Save'}
                                            </>}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

export default AddMailSMSTemplate
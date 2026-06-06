// Purpose: Ticket Create - Manage tickets, ticket records, status tracking, assignments, and support operations
// Created by: Harish
// Created Date: 06-06-2026

import React, { useRef } from 'react';
import { ErrorMessage, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { CirclePlus, Loader2, Trash, CheckCircle } from 'lucide-react';
import { Modal, Button, Card, Row, Col, Table } from 'react-bootstrap';
import toastNotify from '../../../services/notification/tostNotify';
import RadioBtn from '../../../common/components/ui/Radio/RadioBtn';
import SelectField from '../../../common/components/ui/SelectBox/SelectField';
import Textfield from '../../../common/components/ui/TextField/TextInput';
import TextArea from '../../../common/components/ui/textArea/TextArea';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import ToggleSwitch from '../../../common/components/ui/toggleSwitch/ToggleSwitch';
import Editor from '../../../common/components/ui/editor/Editor';
import TransactionLogTbl from './TransactionLogTbl';

// Mock Config Flags / Placeholders (Replace with your actual context/props/state variables)
const defaultClassification = "Q";
const defaultCategoryType = "S";
const defaultPriority = "M";
const ticketSubCategoryMandentoryFlag = "N";
const isShowBranchCombo = "Y";
const askToOrganization = "Y";
const isAddTicketLoader = false;
const ticketTypeSequence = [1, 2];

const getCategoryDropdownData: any[] = [];
const getSubCategoryDropdownData: any[] = [];
const getBranchDropdownData: any[] = [];
const getOrganizationDropdownData: any[] = [];

// Mock actions (Replace with actual functionality or props)
const setCategoryType = (type: string) => { };
const setSelectCategory = (val: string) => { };
const setSelectSubCategory = (val: string) => { };
const setMapIntegServiceList = (val: any[]) => { };
const getMapTicketIntageService = (...args: any[]) => { };
const filteredFixedInputs = () => [];
const setDynamicColumnData = (val: any) => { };

interface CreateTicketProps {
    show: boolean;
    handleClose: () => void;
}

const CreateTicket: React.FC<CreateTicketProps> = ({ show, handleClose }) => {
    const defaultPriority = 'L'
    const defaultClassification = 'F'

    const navigate = useNavigate();
    const attanchmentRef = useRef<HTMLInputElement | null>(null);

    const initialValues = {
        categoryValue: "",
        categoryLabel: "",
        subCategoryValue: "",
        subCategoryLabel: "",
        branchValue: "",
        branchLabel: "",
        classificationValue: defaultClassification || "",
        classificationLabel:
            // (defaultClassification === "F" && "Feature") ||
            // (defaultClassification === "Q" && "Question") ||
            // (defaultClassification === "P" && "Problem") ||
            // (defaultClassification === "O" && "Other") || "",
            (defaultClassification === "F" && "Feature") || "",
        organizationValue: "",
        organizationLabel: "",
        accountNo: "",
        personNm: '',
        mobileNo: '',
        emailId: '',
        ticketType: defaultCategoryType || "S",
        transcationDtl: [{ TranRefNo: "", TranAmount: "", TranDate: "" }],
        dynamicColumns: [],
        dynamicSubColumns: [],
        templateValue: "",
        templateLabel: "",
        subject: "",
        description: "",
        priorityValue: defaultPriority || "",
        // priorityLabel: (defaultPriority === "L" && "Low") || (defaultPriority === "M" && "Medium") || (defaultPriority === "H" && "High") || "",
        priorityLabel: (defaultPriority === "L" && "Low"),
        agreeTicket: false,
        isTemplate: false,
    };

    const validation = Yup.object({
        categoryValue: Yup.string().required("Category is a required field"),
        // subCategoryValue: ticketSubCategoryMandentoryFlag === "Y" ? Yup.string().required("Sub-Category is a required field") : Yup.string(),
        branchValue: isShowBranchCombo === "Y" ? Yup.string().required("Branch is a required field") : Yup.string(),
        classificationValue: Yup.string().required("Classification is a required field"),
        organizationValue: askToOrganization === "Y" ? Yup.string().required("Organization is a required field") : Yup.string(),
        subject: Yup.string().required("Subject is a required field"),
        description: Yup.string().required("Description is a required field"),
        priorityValue: Yup.string().required("Priority is a required field"),
        mobileNo: Yup.string().matches(/^[6-9][0-9]{9}$/, 'Must have valid mobile no.'),
        emailId: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must have valid email id'),
    });

    const attachfiles = () => {
        if (attanchmentRef.current) {
            attanchmentRef.current.click();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='xl'
            dialogClassName="custom-modal"
        // fullscreen
        >
            <Modal.Header closeButton>
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validation}
                            onSubmit={(values, { resetForm }) => {
                                if (values.agreeTicket) {
                                    console.log(values);
                                    // addTicket(values, resetForm);
                                } else {
                                    toastNotify("Please Select Agree Terms & condition", 'error');
                                }
                            }}
                        >
                            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                                console.log('values', values?.isTemplate);

                                return (
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={12} lg={12} className='pe-0 pe-md-3 overflow-auto' >
                                                <div className='fixed-card p-2'>
                                                    <Row>
                                                        {/* Ticket General Details Section */}
                                                        <Col md={12} lg={12}>
                                                            <fieldset className="border rounded-3 p-3 mb-3">
                                                                <legend className="float-none w-auto px-2 text-sm fw-semibold">Ticket General <span className='text-primary'> Details</span></legend>
                                                                <Row >
                                                                    <Col md={12} lg={12} className="mb-3">
                                                                        <label className='form-label text-xs fw-medium d-block mb-2'>Ticket Type</label>
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            {ticketTypeSequence.map((items: any, id: number) => (
                                                                                <React.Fragment key={id}>
                                                                                    {items === 1 && (
                                                                                        <RadioBtn
                                                                                            label="Service"
                                                                                            name="ticketType"
                                                                                            value="S"
                                                                                            checked={values.ticketType === "S"}
                                                                                            onChange={(e: any) => {
                                                                                                handleChange(e);
                                                                                                setCategoryType("S");
                                                                                                setFieldValue("categoryValue", "");
                                                                                                setFieldValue("categoryLabel", "");
                                                                                                setSelectCategory("");
                                                                                                setFieldValue("subCategoryValue", "");
                                                                                                setFieldValue("subCategoryLabel", "");
                                                                                                setSelectSubCategory("");
                                                                                                setDynamicColumnData(filteredFixedInputs());
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                    {items === 2 && (
                                                                                        <RadioBtn
                                                                                            label="Transaction"
                                                                                            name="ticketType"
                                                                                            value="T"
                                                                                            checked={values.ticketType === "T"}
                                                                                            onChange={(e: any) => {
                                                                                                handleChange(e);
                                                                                                setCategoryType("T");
                                                                                                setFieldValue("categoryValue", "");
                                                                                                setFieldValue("categoryLabel", "");
                                                                                                setSelectCategory("");
                                                                                                setFieldValue("subCategoryValue", "");
                                                                                                setFieldValue("subCategoryLabel", "");
                                                                                                setSelectSubCategory("");
                                                                                                setDynamicColumnData(filteredFixedInputs());
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </div>
                                                                    </Col>

                                                                    <Col md={6} className='mt-2'>
                                                                        <SelectField
                                                                            name="categoryValue"
                                                                            label='Category'
                                                                            placeholder="Select Category"
                                                                            options={[{ value: "", label: "Select Category" }, ...getCategoryDropdownData.map((items: any) => ({ value: items.TranCode, label: items.CategoryName }))]}
                                                                            value={values.categoryValue ? { value: values.categoryValue, label: values.categoryLabel } : null}
                                                                            onChange={(e: any) => {
                                                                                setMapIntegServiceList([]);
                                                                                setFieldValue("categoryValue", e?.value || "");
                                                                                setFieldValue("categoryLabel", e?.label || "");
                                                                                setSelectCategory(e?.value || "");
                                                                                setFieldValue("subCategoryValue", "");
                                                                                setFieldValue("subCategoryLabel", "");
                                                                                setSelectSubCategory("");
                                                                                getMapTicketIntageService(e?.value);
                                                                                setDynamicColumnData(filteredFixedInputs());
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                        <ErrorMessage name="categoryValue" className='ErrorMessage' component="div" />
                                                                    </Col>

                                                                    <Col md={6} className='mt-2'>
                                                                        <SelectField
                                                                            name="subCategoryValue"
                                                                            label='Sub Category'
                                                                            placeholder="Select Sub-Category"
                                                                            options={[{ value: "", label: "Select Sub-Category" }, ...getSubCategoryDropdownData.map((items: any) => ({ value: items.TranCode, label: items.SubCategoryName }))]}
                                                                            value={values.subCategoryValue ? { value: values.subCategoryValue, label: values.subCategoryLabel } : null}
                                                                            onChange={(e: any) => {
                                                                                setMapIntegServiceList([]);
                                                                                setFieldValue("subCategoryValue", e?.value || "");
                                                                                setFieldValue("subCategoryLabel", e?.label || "");
                                                                                setSelectSubCategory(e?.value || "");
                                                                                getMapTicketIntageService(values.categoryValue, e?.value);
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                        <ErrorMessage name="subCategoryValue" className='ErrorMessage' component="div" />
                                                                    </Col>

                                                                    {isShowBranchCombo === "Y" && (
                                                                        <Col md={6} className='mt-3'>
                                                                            <SelectField
                                                                                name="branchValue"
                                                                                label='Branch'
                                                                                placeholder="Select Branch"
                                                                                options={[{ value: "", label: "Select Branch" }, ...getBranchDropdownData.map((items: any) => ({ value: items.BranchCode, label: items.BranchName }))]}
                                                                                value={values.branchValue ? { value: values.branchValue, label: values.branchLabel } : null}
                                                                                onChange={(e: any) => {
                                                                                    setFieldValue("branchValue", e?.value || "");
                                                                                    setFieldValue("branchLabel", e?.label || "");
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                            />
                                                                            <ErrorMessage name="branchValue" className='ErrorMessage' component="div" />
                                                                        </Col>
                                                                    )}

                                                                    <Col md={6} className='mt-3'>
                                                                        <SelectField
                                                                            name="classificationValue"
                                                                            label='Classification'
                                                                            placeholder="Select Classification"
                                                                            options={[
                                                                                { value: "Q", label: "Question" },
                                                                                { value: "P", label: "Problem" },
                                                                                { value: "F", label: "Feature" },
                                                                                { value: "O", label: "Other" },
                                                                            ]}
                                                                            value={values.classificationValue ? { value: values.classificationValue, label: values.classificationLabel } : null}
                                                                            onChange={(e: any) => {
                                                                                setFieldValue("classificationValue", e?.value || "");
                                                                                setFieldValue("classificationLabel", e?.label || "");
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                        <ErrorMessage name="classificationValue" className='ErrorMessage' component="div" />
                                                                    </Col>

                                                                    <Col md={6} className='mt-3'>
                                                                        <SelectField
                                                                            name="priorityValue"
                                                                            label='Priority'
                                                                            placeholder="Select Priority"
                                                                            options={[
                                                                                { value: "H", label: "High" },
                                                                                { value: "M", label: "Medium" },
                                                                                { value: "L", label: "Low" },
                                                                            ]}
                                                                            value={values.priorityValue ? { value: values.priorityValue, label: values.priorityLabel } : null}
                                                                            onChange={(e: any) => {
                                                                                setFieldValue("priorityValue", e?.value || "");
                                                                                setFieldValue("priorityLabel", e?.label || "");
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                        <ErrorMessage name="priorityValue" className='ErrorMessage' component="div" />
                                                                    </Col>

                                                                    {askToOrganization === "Y" && (
                                                                        <Col md={6} className='mt-3'>
                                                                            <SelectField
                                                                                name="organizationValue"
                                                                                label='Organization'
                                                                                placeholder="Select Organization"
                                                                                options={[{ value: "", label: "Select Organization" }, ...getOrganizationDropdownData.map((items: any) => ({ value: items.TranCode, label: items.OrganizationName }))]}
                                                                                value={values.organizationValue ? { value: values.organizationValue, label: values.organizationLabel } : null}
                                                                                onChange={(e: any) => {
                                                                                    setFieldValue("organizationValue", e?.value || "");
                                                                                    setFieldValue("organizationLabel", e?.label || "");
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                            />
                                                                            <ErrorMessage name="organizationValue" className='ErrorMessage' component="div" />
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </fieldset>
                                                        </Col>

                                                        {/* Contact Details Section */}
                                                        <Col md={12} lg={12}>
                                                            <fieldset className="border rounded-3 p-3 mb-3">
                                                                <legend className="float-none w-auto px-2 text-sm fw-semibold ">Contact Person <span className='text-primary'> Details</span></legend>
                                                                <Row style={{ marginTop: -16 }}>
                                                                    <Col md={4} className="mt-2">
                                                                        <Textfield
                                                                            label="Person Name"
                                                                            name="personNm"
                                                                            placeholder='Enter Person Name'
                                                                            value={values.personNm}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            maxLength={30}
                                                                        />
                                                                    </Col>
                                                                    <Col md={4} className="mt-2">
                                                                        <Textfield
                                                                            label="Mobile No."
                                                                            placeholder='Enter mobile number'
                                                                            name="mobileNo"
                                                                            value={values.mobileNo}
                                                                            maxLength={10}
                                                                            onBlur={handleBlur}
                                                                            onChange={(e: any) => {
                                                                                if (/^[0-9]*$/.test(e.target.value)) handleChange(e);
                                                                            }}
                                                                        />
                                                                        <ErrorMessage name="mobileNo" className='ErrorMessage' component="div" />
                                                                    </Col>
                                                                    <Col md={4} className="mt-2">
                                                                        <Textfield
                                                                            label="Email Id"
                                                                            name="emailId"
                                                                            placeholder='Enter Email id'
                                                                            value={values.emailId}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            maxLength={100}
                                                                        />
                                                                        <ErrorMessage name="emailId" className='ErrorMessage' component="div" />
                                                                    </Col>
                                                                </Row>
                                                            </fieldset>
                                                        </Col>

                                                        <Col md={12} lg={12} className=" mt-3 d-flex align-items-center gap-2">
                                                            <ToggleSwitch
                                                                id="status"
                                                                title=' Do you want to use template.'
                                                                name="isTemplate"
                                                                onChange={handleChange}
                                                                checked={values.isTemplate}
                                                            />
                                                            <label htmlFor="status" className="text-sm mb-1 text-slate-500">
                                                                Do you want to use template.
                                                            </label>
                                                        </Col>

                                                        {values.isTemplate &&
                                                            <Col md={6} lg={6} className='mt-3'>
                                                                <SelectField
                                                                    name="template"
                                                                    label='Templates'
                                                                    options={[{ value: "", label: "Select Template" }]}
                                                                    tabIndex={9}
                                                                    placeholder=" Select Templates"
                                                                    value={values.templateValue !== "" && {
                                                                        value: values.templateValue,
                                                                        label: values.templateLabel
                                                                    }}
                                                                    onChange={(e: any) => { setFieldValue("templateValue", e?.value); setFieldValue("templateLabel", e?.label); setFieldValue("subject", e?.Subject); setFieldValue("description", e?.Description) }}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </Col>
                                                        }

                                                        {/* Transaction Array Injection Section */}
                                                        {values.ticketType === "T" && (
                                                            <Col md={12} className="mb-3 mt-3">
                                                                <FieldArray name="transcationDtl">
                                                                    {({ push, remove }) => (
                                                                        <div className="border rounded p-3 bg-light">
                                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                                <span className="fw-semibold text-sm">Transaction Logs</span>
                                                                                <Button variant="outline-primary" size="sm" type="button" onClick={() => push({ TranRefNo: "", TranAmount: "", TranDate: "" })}>
                                                                                    <CirclePlus size={16} className="me-1" /> Add Record
                                                                                </Button>
                                                                            </div>
                                                                            <TransactionLogTbl
                                                                                transcationDtl={[]}
                                                                                remove={remove}
                                                                                push={push}
                                                                                handleChange={handleChange}
                                                                                values={values}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </FieldArray>
                                                            </Col>
                                                        )}

                                                        {/* Subject, Description, and Terms Configuration */}
                                                        <Col md={12} className="mt-2">
                                                            <Textfield label="Subject"
                                                                placeholder='Enter Subject'
                                                                name="subject"
                                                                value={values.subject}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            <ErrorMessage name="subject" className='ErrorMessage' component="div" />
                                                        </Col>
                                                        <Col md={12} className="mt-3">
                                                            <Editor
                                                                label="Description"
                                                                required
                                                                value={values.description}
                                                                onChange={(_: any, editor: any) => {
                                                                    setFieldValue("description", editor.getData());
                                                                }}
                                                                placeholder="Provide case background details..."
                                                            />
                                                            <ErrorMessage name="description" className='ErrorMessage' component="div" />
                                                        </Col>
                                                        <Col md={12} className="mt-4">
                                                            <Checkbox
                                                                label={'I certify that the information filled above is verified and accurate.'}
                                                                id="agreeTicket"
                                                                name="agreeTicket"
                                                                checked={values.agreeTicket}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <input type="file" ref={attanchmentRef} className="d-none" onChange={() => { }} />
                                    </form>
                                );
                            }}
                        </Formik>
                    </Col>
                    <Col md={4}>
                        Articles
                    </Col>
                </Row>

            </Modal.Body>
        </Modal >
    );
};

export default CreateTicket;
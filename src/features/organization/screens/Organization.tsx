// Purpose: Organization  Details Configuration Management
// Created by: Harish
// Updated Date: 25-05-2026

import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, CardBody, Nav, Tab, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { University, Building2, Settings, Edit, Check, Globe2, Phone, MapPin, KeySquare, ShieldCheck, Mail } from "lucide-react";
import Textfield from "../../../common/components/ui/TextField/TextInput";
import SelectField from "../../../common/components/ui/SelectBox/SelectField";
import PageHeaeder from "../../../common/components/common/PageHeaeder";
import Module from "../../onboarding/components/Module";
import LicenceDtl from "../../onboarding/components/LicenceDtl";
// import Module from "../../../app/pages/onboarding/module/Module";
// import LicenceDtl from "../../../app/pages/administrator/bank/licenseDtl/LicenceDtl";



// Placeholder/Mock components for your environment setup
const DocumentCard = (props: any) => null;
const dummyLogo = "";

// Sidebar Configuration Items
const navItems = [
    {
        key: "bankDetails",
        title: "Organization  Details",
        desc: "API credentials & profile core info",
        icon: <University size={20} strokeWidth={2.5} />
    },
    // {
    //     key: "headOffice",
    //     title: "Head Office",
    //     desc: "Branch location and contact configurations",
    //     icon: <Building2 size={20} strokeWidth={2.5} />
    // },
    {
        key: "moduleSetup",
        title: "Module Setup",
        desc: "Toggle core integrations and services",
        icon: <Settings size={20} strokeWidth={2.5} />
    },
    {
        key: "licenses",
        title: "Licenses",
        desc: "Manage license details",
        icon: <ShieldCheck size={20} strokeWidth={2.5} />
    },
];


const stateOptions = [

    {
        label: 'Rajasthan',
        value: 'rajasthan',
    },
    {
        label: 'Gujarat',
        value: 'gujarat',
    },
];

const Organization = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tab Index Auto Manage
    let currentTabIndex = 1;
    const getNextTabIndex = () => currentTabIndex++;

    // Hnadle Edit model 
    const handleEditDtl = () => {
        setIsEditMode(!isEditMode);
    };

    // Consolidated Comprehensive Formik Validation Schema
    const validationSchema = Yup.object({
        // Step 1: Organization  Details Validation
        bankName: Yup.string().required('Organization  is required'),
        bankCode: Yup.string().required('Organization Code is required'),
        productKey: Yup.string().required('Product Key is required'),
        secretKey: Yup.string().required('Secret Key is required'),
        adminDomain: Yup.string().required('Admin Domain URL is required'),
        clientDomain: Yup.string().required('Client Domain URL is required'),

        // Step 2: Head Office Validation
        branchName: Yup.string().required('Branch Name is required'),
        branchCode: Yup.string().required('Branch Code is required'),
        contactNo: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile No must be exactly 10 digits')
            .required('Mobile No is required'),

        emailId: Yup.string()
            .email('Enter a valid email address')
            .required('Email is required'),

        addressLine1: Yup.string().required('Address Line 1 is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().nullable().required('State selection is required'),
        pinCode: Yup.string()
            .matches(/^[0-9]{6}$/, 'Pin code must be exactly 6 digits')
            .required('Pin code is required'),
        country: Yup.string().required('Country is required'),
    });

    return (
        <Formik
            initialValues={{
                // STEP 1 - Organization  Details
                bankName: '',
                bankCode: '',
                productKey: '',
                secretKey: '',
                adminDomain: '',
                clientDomain: '',
                logo: null,

                // STEP 2 - HEAD OFFICE
                branchName: '',
                branchCode: '',
                contactNo: '',
                emailId: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: null,
                pinCode: '',
                country: '',

                // STEP 3 - MODULE SETUP
                ticketAdminPanel: true,
                ticketClientPanel: false,
                ticketIntegService: true,
                serviceModule: false,
                mailModule: false,
                whatsappInteg: true,
                smsInteg: false,
                ivrInteg: true,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Saved Configuration Values: ", values);
                setIsEditMode(false);
            }}
        >
            {({ values, handleBlur, setFieldValue, handleSubmit, handleChange }) => (
                <>
                    <PageHeaeder
                        Icon={University}
                        title={"Organization  Details"}
                        description={
                            "Manage organization credentials, head office addresses, and application module service parameters configuration toggles."
                        }
                    />
                    <Container fluid className="py-4 bg-light ">
                        <Tab.Container defaultActiveKey="bankDetails">
                            <Row className="g-4">
                                {/* Sidebar Navigation Panel */}
                                <Col sm={12} md={4} lg={3}>
                                    <Card className="border-0 shadow-sm rounded-2 h-100">
                                        <CardBody className="d-flex flex-column justify-content-between">
                                            <Nav variant="pills" className="flex-column customeTab user">
                                                {navItems.map((item) => (
                                                    <Nav.Item key={item.key}>
                                                        <Nav.Link eventKey={item.key} className="d-flex align-items-center mb-2 rounded-3">
                                                            <div className="icon-box me-2">
                                                                {item.icon}
                                                            </div>
                                                            <div className="text-box">
                                                                <div className="item-title fw-semibold">
                                                                    {item.title}
                                                                </div>
                                                                <div className="item-desc small text-muted">
                                                                    {item.desc}
                                                                </div>
                                                            </div>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>

                                            {/* Action Submit Control Mechanism */}
                                            <div className="mt-4 pt-3 border-top">
                                                {!isEditMode ? (
                                                    <Button variant="outline-primary" className="w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleEditDtl}>
                                                        <Edit size={16} /> Edit Details
                                                    </Button>
                                                ) : (
                                                    <Button variant="success" className="w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => handleSubmit()}>
                                                        <Check size={16} /> Save Changes
                                                    </Button>
                                                )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* System Config Content Forms Container */}
                                <Col sm={12} md={8} lg={9}>
                                    <Card className="border-0 shadow-sm rounded-2 h-100">
                                        <Card.Body className="p-4">
                                            <Tab.Content>
                                                {/* STEP 1: Organization  Details */}
                                                <Tab.Pane eventKey="bankDetails">
                                                    <fieldset className="border rounded-2 mt-2 p-3 bg-white mb-3">
                                                        <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                                                            Organization <span className="text-primary">Details</span>
                                                        </legend>
                                                        <Row className="g-3">
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Organization "
                                                                    name="bankName"
                                                                    placeholder="Enter Organization name"
                                                                    value={values.bankName}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={University}
                                                                    onChange={(e: any) => setFieldValue('bankName', e.target.value)}
                                                                />
                                                                <ErrorMessage name="bankName" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="NPCI Code"
                                                                    name="bankCode"
                                                                    placeholder="e.g. HDFC, BARB"
                                                                    value={values.bankCode}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    IconProp={Building2}
                                                                    type="text"
                                                                    onChange={(e: any) =>
                                                                        setFieldValue('bankCode', e.target.value)}
                                                                />
                                                                <ErrorMessage name="bankCode" component="div" className="ErrorMessage" />
                                                            </Col>


                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Admin Domain
                                                                " name="adminDomain"
                                                                    placeholder="https://admin.bank.com"
                                                                    value={values.adminDomain}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={Globe2}
                                                                    onChange={(e: any) =>
                                                                        setFieldValue('adminDomain', e.target.value)}
                                                                />
                                                                <ErrorMessage name="adminDomain" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Client Domain"
                                                                    name="clientDomain"
                                                                    placeholder="https://client.bank.com"
                                                                    value={values.clientDomain}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={Globe2}
                                                                    onChange={(e: any) =>
                                                                        setFieldValue('clientDomain', e.target.value)}
                                                                />
                                                                <ErrorMessage name="clientDomain" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={6}>
                                                                <DocumentCard
                                                                    title={"Bank Custom Logo"}
                                                                    imageBase64={values.logo || dummyLogo}
                                                                    isRequired
                                                                    isDisabled={!isEditMode}
                                                                    fileInputRef={fileInputRef}
                                                                    fileErrorName="logo" descTitle='No corporate logo loaded'
                                                                    subdescTitle='Click here to update logo configuration asset'
                                                                    maxSize={500}
                                                                    onUploadClick={() => fileInputRef.current?.click()}
                                                                    onFileChange={async (e: any) => setFieldValue("logo", e?.base64 || null)}
                                                                    onFileBlur={handleBlur}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </fieldset>
                                                    {/* Address Office */}
                                                    <fieldset className="border rounded-2 mt-2 p-3 bg-white ">
                                                        <legend className="float-none w-auto px-2 mb-0 text-sm fw-semibold">
                                                            Head  <span className="text-primary">Office</span>
                                                        </legend>
                                                        <Row className="g-3">
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Branch Name"
                                                                    name="branchName"
                                                                    placeholder="Main HQ Branch Name"
                                                                    value={values.branchName}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    IconProp={Building2}
                                                                    type="text"
                                                                    onChange={(e: any) => setFieldValue('branchName', e.target.value)}
                                                                />
                                                                <ErrorMessage name="branchName" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Branch Code"
                                                                    name="branchCode"
                                                                    placeholder="HQBR001"
                                                                    value={values.branchCode}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    IconProp={KeySquare}
                                                                    type="text"
                                                                    onChange={(e: any) => setFieldValue('branchCode', e.target.value)}
                                                                />
                                                                <ErrorMessage name="branchCode" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={3}>
                                                                <Textfield
                                                                    label="Mobile No"
                                                                    name="contactNo"
                                                                    maxLength={10}
                                                                    placeholder="Enter 10 digit landline/mobile contact"
                                                                    value={values.contactNo}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={Phone}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (/^[0-9]*$/.test(e.target.value)) setFieldValue("contactNo", e.target.value); }}
                                                                />
                                                                <ErrorMessage name="contactNo" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={3}>
                                                                <Textfield
                                                                    label="Email ID"
                                                                    name="emailId"
                                                                    maxLength={50}
                                                                    required
                                                                    placeholder="Enter email id"
                                                                    value={values.emailId}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={Mail}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (/^[0-9]*$/.test(e.target.value)) setFieldValue("contactNo", e.target.value); }}
                                                                />
                                                                <ErrorMessage name="emailId" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={6}>
                                                                <Textfield
                                                                    label="Country"
                                                                    name="country"
                                                                    placeholder="e.g. India"
                                                                    value={values.country}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={Globe2}
                                                                    onChange={(e: any) => setFieldValue('country', e.target.value)}
                                                                />
                                                                <ErrorMessage name="country" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={12}>
                                                                <Textfield
                                                                    label="Address Line 1"
                                                                    name="addressLine1" placeholder="Building/Street Info"
                                                                    value={values.addressLine1}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    IconProp={MapPin}
                                                                    type="text"
                                                                    onChange={(e: any) => setFieldValue('addressLine1', e.target.value)}
                                                                />
                                                                <ErrorMessage name="addressLine1" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={12}>
                                                                <Textfield
                                                                    label="Address Line 2"
                                                                    name="addressLine2"
                                                                    placeholder="Locality/Area info (Optional)"
                                                                    value={values.addressLine2}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    IconProp={MapPin}
                                                                    onChange={(e: any) => setFieldValue('addressLine2', e.target.value)}
                                                                />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Textfield
                                                                    label="City"
                                                                    name="city"
                                                                    placeholder="e.g. Mumbai"
                                                                    value={values.city}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    onChange={(e: any) => setFieldValue('city', e.target.value)}
                                                                />
                                                                <ErrorMessage name="city" component="div" className="ErrorMessage" />
                                                            </Col>
                                                            <Col md={4}>
                                                                <SelectField
                                                                    label="State"
                                                                    placeholder="Select state"
                                                                    required
                                                                    isDisabled={!isEditMode}
                                                                    options={stateOptions}
                                                                    tabIndex={getNextTabIndex()}
                                                                    value={values.state}
                                                                    onChange={(selected: any) => { setFieldValue('state', selected); }}
                                                                />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Textfield
                                                                    label="Pin Code"
                                                                    name="pinCode"
                                                                    maxLength={6}
                                                                    type="text"
                                                                    placeholder="6-digit Zip/Postal code"
                                                                    value={values.pinCode}
                                                                    disabled={!isEditMode}
                                                                    tabIndex={getNextTabIndex()}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        if (/^[0-9]*$/.test(e.target.value))
                                                                            setFieldValue("pinCode", e.target.value);
                                                                    }}
                                                                />
                                                                <ErrorMessage name="pinCode" component="div" className="ErrorMessage" />
                                                            </Col>
                                                        </Row>
                                                    </fieldset>

                                                </Tab.Pane>

                                                {/* STEP 2: HEAD OFFICE PANELS */}
                                                <Tab.Pane eventKey="headOffice">
                                                    <Row className="g-3">
                                                        <Col md={6}>
                                                            <Textfield
                                                                label="Branch Name"
                                                                name="branchName"
                                                                placeholder="Main HQ Branch Name"
                                                                value={values.branchName}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                IconProp={Building2}
                                                                type="text"
                                                                onChange={(e: any) => setFieldValue('branchName', e.target.value)}
                                                            />
                                                            <ErrorMessage name="branchName" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={6}>
                                                            <Textfield
                                                                label="Branch Code"
                                                                name="branchCode"
                                                                placeholder="HQBR001"
                                                                value={values.branchCode}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                IconProp={KeySquare}
                                                                type="text"
                                                                onChange={(e: any) => setFieldValue('branchCode', e.target.value)}
                                                            />
                                                            <ErrorMessage name="branchCode" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={3}>
                                                            <Textfield
                                                                label="Mobile No"
                                                                name="contactNo"
                                                                maxLength={10}
                                                                placeholder="Enter 10 digit landline/mobile contact"
                                                                value={values.contactNo}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                IconProp={Phone}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (/^[0-9]*$/.test(e.target.value)) setFieldValue("contactNo", e.target.value); }}
                                                            />
                                                            <ErrorMessage name="contactNo" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={3}>
                                                            <Textfield
                                                                label="Email ID"
                                                                name="emailId"
                                                                maxLength={50}
                                                                required
                                                                placeholder="Enter email id"
                                                                value={values.emailId}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                IconProp={Mail}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (/^[0-9]*$/.test(e.target.value)) setFieldValue("contactNo", e.target.value); }}
                                                            />
                                                            <ErrorMessage name="emailId" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={6}>
                                                            <Textfield
                                                                label="Country"
                                                                name="country"
                                                                placeholder="e.g. India"
                                                                value={values.country}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                IconProp={Globe2}
                                                                onChange={(e: any) => setFieldValue('country', e.target.value)}
                                                            />
                                                            <ErrorMessage name="country" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={12}>
                                                            <Textfield
                                                                label="Address Line 1"
                                                                name="addressLine1" placeholder="Building/Street Info"
                                                                value={values.addressLine1}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                IconProp={MapPin}
                                                                type="text"
                                                                onChange={(e: any) => setFieldValue('addressLine1', e.target.value)}
                                                            />
                                                            <ErrorMessage name="addressLine1" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={12}>
                                                            <Textfield
                                                                label="Address Line 2"
                                                                name="addressLine2"
                                                                placeholder="Locality/Area info (Optional)"
                                                                value={values.addressLine2}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                IconProp={MapPin}
                                                                onChange={(e: any) => setFieldValue('addressLine2', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Textfield
                                                                label="City"
                                                                name="city"
                                                                placeholder="e.g. Mumbai"
                                                                value={values.city}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                onChange={(e: any) => setFieldValue('city', e.target.value)}
                                                            />
                                                            <ErrorMessage name="city" component="div" className="ErrorMessage" />
                                                        </Col>
                                                        <Col md={4}>
                                                            <SelectField
                                                                label="State"
                                                                placeholder="Select state"
                                                                required
                                                                isDisabled={!isEditMode}
                                                                options={stateOptions}
                                                                tabIndex={getNextTabIndex()}
                                                                value={values.state}
                                                                onChange={(selected: any) => { setFieldValue('state', selected); }}
                                                            />
                                                        </Col>
                                                        <Col md={4}>
                                                            <Textfield
                                                                label="Pin Code"
                                                                name="pinCode"
                                                                maxLength={6}
                                                                type="text"
                                                                placeholder="6-digit Zip/Postal code"
                                                                value={values.pinCode}
                                                                disabled={!isEditMode}
                                                                tabIndex={getNextTabIndex()}
                                                                onBlur={handleBlur}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    if (/^[0-9]*$/.test(e.target.value))
                                                                        setFieldValue("pinCode", e.target.value);
                                                                }}
                                                            />
                                                            <ErrorMessage name="pinCode" component="div" className="ErrorMessage" />
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>

                                                {/* STEP 3: MODULE SETUP TIMELINES */}
                                                <Tab.Pane eventKey="moduleSetup">
                                                    <Module
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="licenses">
                                                    <LicenceDtl  />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </Tab.Container>
                    </Container>
                </>
            )}
        </Formik>
    );
};

export default Organization;